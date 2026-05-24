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
  teamMembersDetails?: { name: string; phoneNumber: string }[];
  termsAccepted: boolean;
  teamLogoUrl?: string;
  projectIdea?: string;
  githubLink?: string;
  techStack?: string;
  problemStatement?: string;
  teamRoles?: string;
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

  if (data.university && data.university.trim() && !/^[a-zA-Z\s&.,'-]+$/.test(data.university.trim())) {
    errors.push("University name should only contain letters, spaces, and common punctuation");
  }

  if (!data.mainCategory) {
    errors.push("Main category is required");
  }

  const categoriesWithSubCategories = ["E-Sports", "Hackathon", "Play To Win"];
  if (categoriesWithSubCategories.includes(data.mainCategory || "") && !data.subCategory) {
    errors.push("Sub-category is required for this category");
  }

  const teamESportsGames = ["PUBG", "Free Fire", "Counter-Strike 2", "Valorant"];
  const isHackathonTeam =
    data.mainCategory === "Hackathon" &&
    (!!data.teamName?.trim() ||
      (!!data.teamMembersDetails && data.teamMembersDetails.some((m) => m.name?.trim())));

  const isTeamEvent =
    isHackathonTeam ||
    data.mainCategory === "Spectrum Startup Arena" ||
    (data.mainCategory === "E-Sports" && teamESportsGames.includes(data.subCategory || ""));

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

function isValidTeamLogoUrl(url: string): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return false;

  try {
    const parsed = new URL(url);
    const base = new URL(supabaseUrl);
    return (
      parsed.origin === base.origin &&
      parsed.pathname.includes("/storage/v1/object/public/team_logos/")
    );
  } catch {
    return false;
  }
}

async function parseRegistrationBody(request: NextRequest): Promise<RegistrationRequest | null> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const json = (await request.json()) as Partial<RegistrationRequest>;
    return {
      fullName: String(json.fullName || ""),
      email: String(json.email || ""),
      phoneNumber: String(json.phoneNumber || ""),
      university: String(json.university || ""),
      department: json.department ? String(json.department) : undefined,
      rollNumber: json.rollNumber ? String(json.rollNumber) : undefined,
      mainCategory: String(json.mainCategory || ""),
      subCategory: json.subCategory ? String(json.subCategory) : undefined,
      teamName: json.teamName ? String(json.teamName) : undefined,
      teamMembersDetails: Array.isArray(json.teamMembersDetails) ? json.teamMembersDetails : [],
      termsAccepted: Boolean(json.termsAccepted),
      teamLogoUrl: json.teamLogoUrl ? String(json.teamLogoUrl) : undefined,
      projectIdea: json.projectIdea ? String(json.projectIdea) : undefined,
      githubLink: json.githubLink ? String(json.githubLink) : undefined,
      techStack: json.techStack ? String(json.techStack) : undefined,
      problemStatement: json.problemStatement ? String(json.problemStatement) : undefined,
      teamRoles: json.teamRoles ? String(json.teamRoles) : undefined,
    };
  }

  // Legacy FormData support (without file upload)
  const formData = await request.formData();
  const teamMembersDetailsStr = formData.get("teamMembersDetails") as string;

  return {
    fullName: String(formData.get("fullName") || ""),
    email: String(formData.get("email") || ""),
    phoneNumber: String(formData.get("phoneNumber") || ""),
    university: String(formData.get("university") || ""),
    department: (formData.get("department") as string) || undefined,
    rollNumber: (formData.get("rollNumber") as string) || undefined,
    mainCategory: String(formData.get("mainCategory") || ""),
    subCategory: (formData.get("subCategory") as string) || undefined,
    teamName: (formData.get("teamName") as string) || undefined,
    teamMembersDetails: teamMembersDetailsStr ? JSON.parse(teamMembersDetailsStr) : [],
    termsAccepted: formData.get("termsAccepted") === "true",
    teamLogoUrl: (formData.get("teamLogoUrl") as string) || undefined,
    projectIdea: (formData.get("projectIdea") as string) || undefined,
    githubLink: (formData.get("githubLink") as string) || undefined,
    techStack: (formData.get("techStack") as string) || undefined,
    problemStatement: (formData.get("problemStatement") as string) || undefined,
    teamRoles: (formData.get("teamRoles") as string) || undefined,
  };
}

function buildTeamMembersText(body: RegistrationRequest): string | null {
  let teamMembersText: string | null = null;

  if (body.teamMembersDetails && body.teamMembersDetails.length > 0) {
    teamMembersText = body.teamMembersDetails
      .filter((m) => m.name && m.name.trim().length > 0)
      .map((m) => `${m.name.trim()} (${m.phoneNumber.trim()})`)
      .join(" | ");
  }

  if (body.mainCategory === "Hackathon") {
    const parts: string[] = [];
    if (teamMembersText) parts.push(teamMembersText);

    if (body.projectIdea?.trim()) parts.push(`IDEA: ${body.projectIdea.trim()}`);
    if (body.githubLink?.trim()) parts.push(`GITHUB: ${body.githubLink.trim()}`);
    if (body.techStack?.trim()) parts.push(`TECH: ${body.techStack.trim()}`);
    if (body.problemStatement?.trim()) parts.push(`PROBLEM: ${body.problemStatement.trim()}`);
    if (body.teamRoles?.trim() && body.subCategory !== "Competitive Programming") {
      parts.push(`ROLES: ${body.teamRoles.trim()}`);
    }

    if (parts.length > 0) {
      teamMembersText = parts.join(" || ");
    }
  }

  return teamMembersText;
}

export const maxDuration = 15;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let clientIP = "unknown";
  let category = "unknown";

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      logger.error("Missing Supabase server credentials");
      return NextResponse.json(
        { success: false, error: "Registration service is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    clientIP = getClientIP(request);

    logger.info("Registration request received", {
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

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

    let body: RegistrationRequest;
    try {
      const parsed = await parseRegistrationBody(request);
      if (!parsed) {
        return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
      }
      body = parsed;
    } catch {
      return NextResponse.json({ success: false, error: "Invalid form data" }, { status: 400 });
    }

    category = body.mainCategory || "unknown";

    const validation = validateRegistration(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    let teamLogoUrl: string | null = null;
    if (body.teamLogoUrl?.trim()) {
      if (!isValidTeamLogoUrl(body.teamLogoUrl.trim())) {
        return NextResponse.json(
          { success: false, error: "Invalid team logo URL." },
          { status: 400 }
        );
      }
      teamLogoUrl = body.teamLogoUrl.trim();
    }

    const teamMembersText = buildTeamMembersText(body);

    const normalizedEmail = body.email.toLowerCase().trim();
    const subCategory = body.subCategory || "General";

    const { data: existingRegistration } = await supabaseServer
      .from("registrations")
      .select("id")
      .eq("email", normalizedEmail)
      .eq("main_category", body.mainCategory)
      .eq("sub_category", subCategory)
      .maybeSingle();

    if (existingRegistration) {
      return NextResponse.json(
        {
          success: false,
          error: `You are already registered for ${body.mainCategory} — ${subCategory}. You don't need to sign up again for this event.`,
          alreadyRegistered: true,
        },
        { status: 409 }
      );
    }

    const { data: regData, error: regError } = await supabaseServer
      .from("registrations")
      .insert({
        full_name: body.fullName.trim(),
        email: normalizedEmail,
        phone_number: body.phoneNumber.trim(),
        university: body.university?.trim() || null,
        department: body.department?.trim() || null,
        roll_number: body.rollNumber?.trim() || null,
        main_category: body.mainCategory,
        sub_category: subCategory,
        team_name: body.teamName?.trim() || null,
        team_logo_url: teamLogoUrl,
        team_members: teamMembersText,
        terms_accepted: body.termsAccepted,
      })
      .select("id")
      .single();

    if (regError) {
      logger.error("Registration insert error", {
        message: regError.message,
        code: regError.code,
        details: regError.details,
        hint: regError.hint,
        ip: clientIP,
        category,
      });

      if (regError.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            error: `You are already registered for ${body.mainCategory} — ${subCategory}. You don't need to sign up again for this event.`,
            alreadyRegistered: true,
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { success: false, error: "Registration failed. Please try again or contact support." },
        { status: 500 }
      );
    }

    const processingTime = Date.now() - startTime;
    logger.info("Registration successful", { ip: clientIP, category, processingTime });

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
    logger.error("Unexpected error in registration API", error);
    return NextResponse.json({ success: false, error: "An unexpected error occurred." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Registration API is operational" }, { status: 200 });
}
