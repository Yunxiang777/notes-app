import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

// 驗證請求
export function validateDto(schema: ZodSchema, source: "body" | "params" | "query" = "body") {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = schema.parse(req[source]);
            req[source] = validated;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Validation failed',
                        details: errors,
                    },
                });
            }
            next(error);
        }
    };
}
