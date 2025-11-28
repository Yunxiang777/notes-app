// src/middleware/auth.middleware.ts
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth";
import { env } from "../config/env";
import { isJWTPayload } from "../utils/jwt.utils";
import { unauthorized } from "../utils/http";

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // cookie取得token
  const token = req.cookies?.authToken;
  if (!token) return unauthorized(res);

  try {
    // 驗證token
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!isJWTPayload(decoded)) return unauthorized(res);

    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    return next();
  } catch {
    return unauthorized(res);
  }
}
