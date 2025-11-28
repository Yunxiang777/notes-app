import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http";

// 錯誤處理，統一處理所有錯誤
// next: NextFunction 必要參數，確保 express 抓取到錯誤處理格式
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
    });
  }

  // 返回錯誤響應
  res.status(500).json({
    success: false,
    error: "internal_error",
  });
}
