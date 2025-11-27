// src/types/auth.ts

import { Request } from "express";

/**
 * @interface JWTPayload
 * 定義 JWT 內部的資料結構 (Payload)
 */
export interface JWTPayload {
    userId: number;
    email: string;
    iat?: number;
    exp?: number;
}

/**
 * @interface AuthRequest
 * 擴充 Express Request，增加經身份驗證後的使用者資訊
 */
export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}