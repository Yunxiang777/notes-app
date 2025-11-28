// src/types/auth.ts

import { Request } from "express";

// JWT 內部資料結構
export interface JWTPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}

// 身份驗證後的使用者資訊
export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}
