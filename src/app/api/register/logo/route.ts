import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { rateLimit, getClientIP } from "@/lib/rateLimiter";
import { logger } from "@/lib/logger";

const MAX_REQUESTS = 10;
const WINDOW_MS = 5 * 60 * 1000;

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

export async function PATCH(request: NextRequest) {
  const clientIP = getClientIP(request);
  const rateLimitResult = rateLimit(`${clientIP}:logo`, MAX_REQUESTS, WINDOW_MS);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = (await request.json()) as {
      registrationId?: string;
      email?: string;
      teamLogoUrl?: string;
    };

    const registrationId = body.registrationId?.trim();
    const email = body.email?.toLowerCase().trim();
    const teamLogoUrl = body.teamLogoUrl?.trim();

    if (!registrationId || !email || !teamLogoUrl) {
      return NextResponse.json(
        { success: false, error: "Missing registration details." },
        { status: 400 }
      );
    }

    if (!isValidTeamLogoUrl(teamLogoUrl)) {
      return NextResponse.json(
        { success: false, error: "Invalid team logo URL." },
        { status: 400 }
      );
    }

    const { data: existing, error: fetchError } = await supabaseServer
      .from("registrations")
      .select("id, email")
      .eq("id", registrationId)
      .eq("email", email)
      .maybeSingle();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, error: "Registration not found." },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabaseServer
      .from("registrations")
      .update({ team_logo_url: teamLogoUrl, updated_at: new Date().toISOString() })
      .eq("id", registrationId)
      .eq("email", email);

    if (updateError) {
      logger.error("Logo attach error", updateError);
      return NextResponse.json(
        { success: false, error: "Could not save team logo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Team logo saved." });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }
}
