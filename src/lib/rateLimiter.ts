import { NextRequest } from "next/server";

interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
}

const ipMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Basic in-memory rate limiter.
 * Note: In a serverless/distributed environment (like Vercel), this memory is not shared across lambda instances.
 * For production, use Redis or a database (e.g. Upstash Rate Limit).
 */
export function rateLimit(ip: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const record = ipMap.get(ip);

    // Clean up old entries occasionally (simple check)
    if (ipMap.size > 10000) {
        ipMap.clear();
    }

    if (!record || now > record.resetTime) {
        ipMap.set(ip, { count: 1, resetTime: now + windowMs });
        return {
            success: true,
            remaining: limit - 1,
            resetTime: now + windowMs,
        };
    }

    if (record.count >= limit) {
        const retryAfter = Math.ceil((record.resetTime - now) / 1000);
        return {
            success: false,
            remaining: 0,
            resetTime: record.resetTime,
            retryAfter,
        };
    }

    record.count += 1;
    return {
        success: true,
        remaining: limit - record.count,
        resetTime: record.resetTime,
    };
}

export function getClientIP(request: NextRequest): string {
    // Check headers for real IP if behind proxy
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }

    const realIp = request.headers.get("x-real-ip");
    if (realIp) {
        return realIp.trim();
    }

    return "127.0.0.1";
}
