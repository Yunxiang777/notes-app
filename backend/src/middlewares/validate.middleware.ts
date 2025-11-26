import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

// 驗證請求(註冊)
export function validateDto(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = schema.parse(req.body);
            req.body = validated;
            next();
        } catch (error) {
            // 如果驗證失敗
            if (error instanceof ZodError) {
                // 格式化錯誤訊息
                const errors = error.errors.map(err => ({
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

            // 其他未預期的錯誤
            next(error);
        }
    };
}