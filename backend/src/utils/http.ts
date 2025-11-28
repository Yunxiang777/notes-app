import { Response } from "express";

export function unauthorized(res: Response) {
  return res.status(401).json({
    success: false,
    error: "unauthorized",
  });
}
