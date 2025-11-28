import { Response } from "express";

export function unauthorized(res: Response) {
  return res.status(401).json({
    success: false,
    error: "unauthorized",
  });
}

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const NotFound = (msg: string) => new HttpError(404, msg);
export const BadRequest = (msg: string) => new HttpError(400, msg);
export const Forbidden = (msg: string) => new HttpError(403, msg);
