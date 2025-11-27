// src/middleware/authMiddleware.ts
import { Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest, JWTPayload } from "../types/auth"; //型別
import { AUTH_SCHEME, ERROR_MESSAGES } from "../config/constants"; //常數

dotenv.config();

// JWT SECRET，嚴重錯誤檢查
const JWT_SECRET = process.env.JWT_SECRET || "secret";
if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET environment variable is not defined.");
}

// 型別守衛
function isJWTPayload(decoded: any): decoded is JWTPayload {
    return (
        typeof decoded === 'object' &&
        decoded !== null &&
        typeof decoded.userId === 'number' &&
        typeof decoded.email === 'string'
    );
}

// token 驗證中間件
export function requireAuth(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    // 檢查授權頭
    if (!authHeader) {
        return res.status(401).json({ error: ERROR_MESSAGES.MISSING_HEADER });
    }

    const [scheme, token] = authHeader.split(" ");

    // 檢查格式是否為 Bearer
    if (scheme !== AUTH_SCHEME || !token) {
        return res.status(401).json({ error: ERROR_MESSAGES.INVALID_FORMAT });
    }

    // 安全檢查：秘密遺失，返回伺服器錯誤
    if (!JWT_SECRET) {
        console.error("Auth middleware error: JWT_SECRET is missing during runtime.");
        return res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_ERROR });
    }

    try {
        // 驗證 Token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 驗證 Payload 結構
        if (!isJWTPayload(decoded)) {
            return res.status(401).json({ error: ERROR_MESSAGES.INVALID_PAYLOAD });
        }

        // 成功
        const payload = decoded as JWTPayload;

        req.user = {
            id: payload.userId,
            email: payload.email,
        };

        next();

    } catch (err) {
        // 過期或無效簽名
        if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
            return res.status(401).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
        }

        next(err);
    }
}