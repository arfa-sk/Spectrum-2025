import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { rateLimit, getClientIP } from "@/lib/rateLimiter";
import { logRegistration } from "@/lib/analytics";
import { logger } from "@/lib/logger";

// Rate limit: 5 registrations per 5 minutes per IP
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
  teamMembers?: string;
  termsAccepted: boolean;
}

/**
 * Validate registration data
 */
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

  const teamBasedCategories = ["DevPlay", "Hackathon", "Spectrum Startup Arena"];
  if (teamBasedCategories.includes(data.mainCategory || "")) {
    if (!data.teamName || !data.teamName.trim()) {
      errors.push("Team name is required");
    }
    if (!data.teamMembers || !data.teamMembers.trim()) {
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

/**
 * Check for duplicate email
 */
async function checkDuplicateEmail(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabaseServer
      .from("registrations")
      .select("email")
      .eq("email", email.toLowerCase().trim())
      .limit(1);

    if (error) {
      console.error("Duplicate check error:", error);
      return false; // Allow submission if check fails (DB constraint will catch)
    }

    return (data && data.length > 0) || false;
  } catch (error) {
    console.error("Duplicate check exception:", error);
    return false;
  }
}

/**
 * POST /api/register - Register a new participant
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let clientIP = "unknown";
  let category = "unknown";

  try {
    // Get client IP for rate limiting
    clientIP = getClientIP(request);

    logger.info("Registration request received", {
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    // Apply rate limiting
    const rateLimitResult = rateLimit(clientIP, MAX_REQUESTS, WINDOW_MS);

    if (!rateLimitResult.success) {
      logger.warn("Rate limit exceeded", {
        ip: clientIP,
        retryAfter: rateLimitResult.retryAfter,
      });

      logRegistration({
        timestamp: Date.now(),
        processingTime: Date.now() - startTime,
        success: false,
        errorType: "rate_limit",
        ipAddress: clientIP,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Too many registration attempts. Please try again later.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": MAX_REQUESTS.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
            "Retry-After": rateLimitResult.retryAfter?.toString() || "300",
          },
        }
      );
    }

    // Parse and validate request body
    let body: Partial<RegistrationRequest>;
    try {
      body = await request.json();
    } catch (error) {
      logger.error("Invalid JSON in request body", { ip: clientIP }, error as Error);

      logRegistration({
        timestamp: Date.now(),
        processingTime: Date.now() - startTime,
        success: false,
        errorType: "invalid_json",
        ipAddress: clientIP,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    category = body.mainCategory || "unknown";

    // Validate registration data
    const validation = validateRegistration(body);
    if (!validation.valid) {
      logger.warn("Validation failed", {
        ip: clientIP,
        category,
        errors: validation.errors,
      });

      logRegistration({
        timestamp: Date.now(),
        processingTime: Date.now() - startTime,
        success: false,
        errorType: "validation_error",
        category,
        ipAddress: clientIP,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: validation.errors,
        },
        {
          status: 400,
          headers: {
            "X-RateLimit-Limit": MAX_REQUESTS.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    // Check for duplicate email
    const isDuplicate = await checkDuplicateEmail(body.email!);
    if (isDuplicate) {
      logger.warn("Duplicate email attempt", {
        ip: clientIP,
        email: body.email,
        category,
      });

      logRegistration({
        timestamp: Date.now(),
        processingTime: Date.now() - startTime,
        success: false,
        errorType: "duplicate_email",
        category,
        ipAddress: clientIP,
      });

      return NextResponse.json(
        {
          success: false,
          error: "This email is already registered. Please use a different email address.",
        },
        {
          status: 409, // Conflict
          headers: {
            "X-RateLimit-Limit": MAX_REQUESTS.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    // Insert registration into database
    const { data: registrationData, error: dbError } = await supabaseServer
      .from("registrations")
      .insert([
        {
          full_name: body.fullName!.trim(),
          email: body.email!.toLowerCase().trim(),
          phone_number: body.phoneNumber!.trim(),
          university: body.university!.trim(),
          department: body.department?.trim() || null,
          roll_number: body.rollNumber?.trim() || null,
          main_category: body.mainCategory!,
          sub_category: body.subCategory || null,
          team_name: body.teamName?.trim() || null,
          team_members: body.teamMembers?.trim() || null,
          terms_accepted: body.termsAccepted!,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (dbError) {
      // Handle specific database errors
      const errorCode = dbError.code || "";
      const errorMessage = dbError.message || "";

      let status = 500;
      let userMessage = "Registration failed. Please try again.";

      // Duplicate key error (race condition)
      if (errorCode === "23505" || errorMessage.includes("duplicate") || errorMessage.includes("unique constraint")) {
        status = 409;
        userMessage = "This email is already registered. Please use a different email address.";
      }
      // RLS policy error
      else if (errorCode === "42501" || errorMessage.includes("row-level security") || errorMessage.includes("RLS")) {
        status = 503;
        userMessage = "Registration is currently unavailable. Please contact support.";
      }
      // Constraint violation
      else if (errorMessage.includes("violates check constraint") || errorMessage.includes("constraint")) {
        status = 400;
        userMessage = "Invalid data provided. Please check your information.";
      }

      logger.error("Database error", {
        ip: clientIP,
        category,
        code: errorCode,
        message: errorMessage,
        details: dbError.details,
        hint: dbError.hint,
      }, dbError as Error);

      logRegistration({
        timestamp: Date.now(),
        processingTime: Date.now() - startTime,
        success: false,
        errorType: "database_error",
        errorCode,
        category,
        ipAddress: clientIP,
      });

      return NextResponse.json(
        {
          success: false,
          error: userMessage,
          code: errorCode,
        },
        {
          status,
          headers: {
            "X-RateLimit-Limit": MAX_REQUESTS.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    // Success
    const processingTime = Date.now() - startTime;

    logger.info("Registration successful", {
      ip: clientIP,
      category,
      processingTime: `${processingTime}ms`,
      email: body.email,
    });

    logRegistration({
      timestamp: Date.now(),
      processingTime,
      success: true,
      category,
      ipAddress: clientIP,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! We'll contact you soon.",
        data: {
          id: registrationData?.id,
          email: registrationData?.email,
        },
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Limit": MAX_REQUESTS.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          "X-Processing-Time": processingTime.toString(),
        },
      }
    );
  } catch (err: unknown) {
    // Handle unexpected errors
    const error = err instanceof Error ? err : new Error(String(err));
    const processingTime = Date.now() - startTime;

    logger.error("Unexpected error in registration API", {
      ip: clientIP,
      category,
      processingTime: `${processingTime}ms`,
    }, error);

    logRegistration({
      timestamp: Date.now(),
      processingTime,
      success: false,
      errorType: "unexpected_error",
      category,
      ipAddress: clientIP,
    });

    const errorMessage = error.message;

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/register - Health check (optional)
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      message: "Registration API is operational",
      rateLimit: {
        maxRequests: MAX_REQUESTS,
        windowMs: WINDOW_MS,
      },
    },
    { status: 200 }
  );
}

