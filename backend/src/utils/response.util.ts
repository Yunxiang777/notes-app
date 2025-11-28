import { Response } from "express";
import { env } from "../config/env";

export function setAuthCookie(res: Response, token: string) {
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: env.NODE_ENV,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function sendSuccess(
  res: Response,
  status: number,
  user: unknown,
  message: string
) {
  res.status(status).json({
    success: true,
    data: { user },
    message,
  });
}
