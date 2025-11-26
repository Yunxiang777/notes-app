/**
 * 錯誤處理 Middleware
 * 統一處理所有錯誤
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error('Error:', err);

    // 獲取狀態碼（默認 500）
    const statusCode = err.status || 500;

    // 獲取錯誤訊息
    const message = err.message || 'Internal Server Error';

    // 返回錯誤響應
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
}