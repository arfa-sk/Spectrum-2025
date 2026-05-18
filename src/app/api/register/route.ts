import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { rateLimit, getClientIP } from "@/lib/rateLimiter";
import { logger } from "@/lib/logger";

const MAX_REQUESTS = 5;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

interface RegistrationRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  university: string;
  department?: string;
  rollNumber?: string;
  mainCategory: string;
  subCategory?: string;
  teamName?: string;
  teamMembersDetails?: any[];
  termsAccepted: boolean;
  teamLogo?: File | null;
}

function validateRegistration(data: Partial<RegistrationRequest>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.fullName || !data.fullName.trim()) {
    errors.push("Full name is required");
  }

  if (!data.email || !data.email.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.phoneNumber || !data.phoneNumber.trim()) {
    errors.push("Phone number is required");
  } else if (!/^(\+92)?[0-9]{10,11}$/.test(data.phoneNumber.replace(/\s/g, ""))) {
    errors.push("Invalid phone number format");
  }

  if (!data.university || !data.university.trim()) {
    errors.push("University is required");
  }

  if (!data.mainCategory) {
    errors.push("Main category is required");
  }

  const categoriesWithSubCategories = ["DevPlay", "Hackathon", "Play To Win"];
  if (categoriesWithSubCategories.includes(data.mainCategory || "") && !data.subCategory) {
    errors.push("Sub-category is required for this category");
  }

  const teamBasedCategories = ["Hackathon", "Spectrum Startup Arena"];
  const teamDevPlayGames = ["PUBG", "Free Fire", "Counter-Strike 2", "Valorant"];
  const isTeamEvent = 
    (data.mainCategory === "Hackathon" && data.subCategory !== "Speed Programming Challenge") ||
    data.mainCategory === "Spectrum Startup Arena" ||
    (data.mainCategory === "DevPlay" && teamDevPlayGames.includes(data.subCategory || ""));

  if (isTeamEvent) {
    if (!data.teamName || !data.teamName.trim()) {
      errors.push("Team name is required");
    }
    if (!data.teamMembersDetails || data.teamMembersDetails.length === 0) {
      errors.push("Team members are required");
    }
  }

  if (!data.termsAccepted) {
    errors.push("Terms and conditions must be accepted");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let clientIP = "unknown";
  let category = "unknown";

  try {
    clientIP = getClientIP(request);

    logger.info("Registration request received (Flat Row API)", {
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    // Rate Limiting
    const rateLimitResult = rateLimit(clientIP, MAX_REQUESTS, WINDOW_MS);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many registration attempts. Please try again later.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: { "Retry-After": rateLimitResult.retryAfter?.toString() || "300" },
        }
      );
    }

    // Parse FormData
    let body: Partial<RegistrationRequest> = {};
    let teamLogoFile: File | null = null;
    let rawFormData: any = null;
    
    try {
      const formData = await request.formData();
      rawFormData = formData;
      body = {
        fullName: formData.get("fullName") as string,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        university: formData.get("university") as string,
        department: (formData.get("department") as string) || undefined,
        rollNumber: (formData.get("rollNumber") as string) || undefined,
        mainCategory: formData.get("mainCategory") as string,
        subCategory: (formData.get("subCategory") as string) || undefined,
        teamName: (formData.get("teamName") as string) || undefined,
        termsAccepted: formData.get("termsAccepted") === "true",
      };

      const teamMembersDetailsStr = formData.get("teamMembersDetails") as string;
      if (teamMembersDetailsStr) {
        body.teamMembersDetails = JSON.parse(teamMembersDetailsStr);
      }
      
      const logo = formData.get("teamLogo");
      if (logo && typeof logo !== "string") {
        teamLogoFile = logo as File;
      }
    } catch (error) {
      return NextResponse.json({ success: false, error: "Invalid form data" }, { status: 400 });
    }

    category = body.mainCategory || "unknown";

    // Validate
    const validation = validateRegistration(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    // 1. Upload Team Logo if provided
    let teamLogoUrl = null;
    if (teamLogoFile) {
      const fileExt = teamLogoFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabaseServer
        .storage
        .from('team_logos')
        .upload(fileName, teamLogoFile);
        
      if (uploadError) {
        logger.error("Logo Upload Error", uploadError);
      } else if (uploadData) {
        const { data: publicUrlData } = supabaseServer
          .storage
          .from('team_logos')
          .getPublicUrl(fileName);
        teamLogoUrl = publicUrlData.publicUrl;
      }
    }

    // 2. Format Team Members into a clean text string and serialize Hackathon Innovation fields
    let teamMembersText = null;
    if (body.teamMembersDetails && body.teamMembersDetails.length > 0) {
      teamMembersText = body.teamMembersDetails
        .filter(m => m.name && m.name.trim().length > 0)
        .map(m => `${m.name.trim()} (${m.phoneNumber.trim()})`)
        .join(" | ");
    }

    if (body.mainCategory === "Hackathon" && rawFormData) {
      const parts: string[] = [];
      if (teamMembersText) {
        parts.push(teamMembersText);
      }
      
      const projectIdea = rawFormData.get("projectIdea") as string;
      const githubLink = rawFormData.get("githubLink") as string;
      const techStack = rawFormData.get("techStack") as string;
      const problemStatement = rawFormData.get("problemStatement") as string;
      const teamRoles = rawFormData.get("teamRoles") as string;

      if (projectIdea && projectIdea.trim()) parts.push(`IDEA: ${projectIdea.trim()}`);
      if (githubLink && githubLink.trim()) parts.push(`GITHUB: ${githubLink.trim()}`);
      if (techStack && techStack.trim()) parts.push(`TECH: ${techStack.trim()}`);
      if (problemStatement && problemStatement.trim()) parts.push(`PROBLEM: ${problemStatement.trim()}`);
      if (teamRoles && teamRoles.trim() && body.subCategory !== "Speed Programming Challenge") parts.push(`ROLES: ${teamRoles.trim()}`);

      if (parts.length > 0) {
        teamMembersText = parts.join(" || ");
      }
    }

    // 3. Perform a SINGLE flat insert directly into registrations table!
    const { data: regData, error: regError } = await supabaseServer
      .from("registrations")
      .insert({
        full_name: body.fullName!.trim(),
        email: body.email!.toLowerCase().trim(),
        phone_number: body.phoneNumber!.trim(),
        university: body.university!.trim(),
        department: body.department?.trim() || null,
        roll_number: body.rollNumber?.trim() || null,
        main_category: body.mainCategory!,
        sub_category: body.subCategory || "General",
        team_name: body.teamName?.trim() || null,
        team_logo_url: teamLogoUrl,
        team_members: teamMembersText,
        terms_accepted: body.termsAccepted!
      })
      .select("id")
      .single();

    if (regError) {
      if (regError.code === "23505") {
        return NextResponse.json({ success: false, error: "You are already registered for this specific event." }, { status: 409 });
      }
      logger.error("Flat Registration Insert Error", regError);
      return NextResponse.json({ success: false, error: "Registration failed." }, { status: 500 });
    }

    const processingTime = Date.now() - startTime;
    logger.info("Flat registration successful", { ip: clientIP, category, processingTime });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! We'll contact you soon.",
        data: { id: regData.id, email: body.email },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    logger.error("Unexpected error in flat registration API", error);
    return NextResponse.json({ success: false, error: "An unexpected error occurred." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Flat Registration API is operational" }, { status: 200 });
}
