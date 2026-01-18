type RegistrationLog = {
    timestamp: number;
    processingTime: number;
    success: boolean;
    errorType?: string;
    errorCode?: string;
    category?: string;
    ipAddress?: string;
};

// Simple in-memory metrics storage
const metrics = {
    totalRegistrations: 0,
    successfulRegistrations: 0,
    failedRegistrations: 0,
    errors: {} as Record<string, number>,
    categories: {} as Record<string, number>,
    processingTimes: [] as number[],
};

/**
 * Placeholder for analytics logging.
 * In a real application, connect this to PostHog, Mixpanel, or Google Analytics.
 */
export function logRegistration(log: RegistrationLog) {
    metrics.totalRegistrations++;
    if (log.success) {
        metrics.successfulRegistrations++;
        if (log.category) {
            metrics.categories[log.category] = (metrics.categories[log.category] || 0) + 1;
        }
    } else {
        metrics.failedRegistrations++;
        if (log.errorType) {
            metrics.errors[log.errorType] = (metrics.errors[log.errorType] || 0) + 1;
        }
    }

    if (log.processingTime) {
        metrics.processingTimes.push(log.processingTime);
        // Keep only last 100 for memory safety
        if (metrics.processingTimes.length > 100) {
            metrics.processingTimes.shift();
        }
    }

    if (process.env.NODE_ENV === 'development') {
        console.debug('[Analytics] Event:', JSON.stringify(log, null, 2));
    }
}

export function getSystemMetrics() {
    return {
        total: metrics.totalRegistrations,
        success: metrics.successfulRegistrations,
        failed: metrics.failedRegistrations,
        uptime: process.uptime(),
    };
}

export function getErrorBreakdown() {
    return metrics.errors;
}

export function getCategoryBreakdown() {
    return metrics.categories;
}

export function getPerformanceMetrics() {
    const avgTime = metrics.processingTimes.length > 0
        ? metrics.processingTimes.reduce((a, b) => a + b, 0) / metrics.processingTimes.length
        : 0;

    return {
        averageProcessingTime: avgTime,
        lastRequests: metrics.processingTimes.slice(-5),
    };
}
