/* eslint-disable @typescript-eslint/no-explicit-any */
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
    private log(level: LogLevel, message: string, meta?: any, error?: Error) {
        const timestamp = new Date().toISOString();
        const logData = {
            timestamp,
            level,
            message,
            ...meta,
            ...(error && { error: error.message, stack: error.stack }),
        };

        // In production, consider using pino or winston
        if (level === 'error') {
            console.error(JSON.stringify(logData));
        } else if (level === 'warn') {
            console.warn(JSON.stringify(logData));
        } else {
            console.log(JSON.stringify(logData));
        }
    }

    debug(message: string, meta?: any) {
        if (process.env.NODE_ENV === 'development') {
            this.log('debug', message, meta);
        }
    }

    info(message: string, meta?: any) {
        this.log('info', message, meta);
    }

    warn(message: string, meta?: any) {
        this.log('warn', message, meta);
    }

    error(message: string, meta?: any, error?: Error) {
        this.log('error', message, meta, error);
    }
}

export const logger = new Logger();
