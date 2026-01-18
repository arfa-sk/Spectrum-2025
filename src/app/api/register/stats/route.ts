import { NextResponse } from "next/server";
import { getSystemMetrics, getErrorBreakdown, getCategoryBreakdown, getPerformanceMetrics } from "@/lib/analytics";
import { logger } from "@/lib/logger";

/**
 * GET /api/register/stats - Get registration statistics and metrics
 * Protected endpoint - should add authentication in production
 */
export async function GET() {
  try {
    logger.debug("Stats request received");

    const systemMetrics = getSystemMetrics();
    const errorBreakdown = getErrorBreakdown();
    const categoryBreakdown = getCategoryBreakdown();
    const performanceMetrics = getPerformanceMetrics();

    return NextResponse.json(
      {
        success: true,
        data: {
          system: systemMetrics,
          errors: errorBreakdown,
          categories: categoryBreakdown,
          performance: performanceMetrics,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error("Error fetching stats", {}, error instanceof Error ? error : new Error(String(error)));

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch statistics",
      },
      { status: 500 }
    );
  }
}




