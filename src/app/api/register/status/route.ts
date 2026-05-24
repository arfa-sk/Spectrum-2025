import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { rateLimit, getClientIP } from "@/lib/rateLimiter";

const MAX_REQUESTS = 15;
const WINDOW_MS = 5 * 60 * 1000;

export async function GET(request: NextRequest) {
  const clientIP = getClientIP(request);
  const rateLimitResult = rateLimit(`${clientIP}:status`, MAX_REQUESTS, WINDOW_MS);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, error: "Too many checks. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.toLowerCase().trim();
  const mainCategory = searchParams.get("mainCategory")?.trim();
  const subCategory = searchParams.get("subCategory")?.trim() || "General";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!mainCategory) {
    return NextResponse.json(
      { success: false, error: "Please select an event category." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseServer
    .from("registrations")
    .select("id")
    .eq("email", email)
    .eq("main_category", mainCategory)
    .eq("sub_category", subCategory)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { success: false, error: "Could not check registration status. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    registered: Boolean(data),
    event: `${mainCategory} — ${subCategory}`,
  });
}
