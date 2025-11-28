import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { setAuthCookie, sendSuccess } from "../utils/response.util";

// 用戶註冊
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dto: RegisterDto = req.body;
    const result = await authService.register(dto);

    // set token
    setAuthCookie(res, result.token);
    // 註冊成功
    sendSuccess(res, 201, result.user, "User registered successfully");
  } catch (err: any) {
    // 失敗
    next(err);
  }
}

// 用戶登入
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const dto: LoginDto = req.body;
    const result = await authService.login(dto);

    // set token
    setAuthCookie(res, result.token);
    // 登入成功
    sendSuccess(res, 200, result.user, "User logged in successfully");
  } catch (err) {
    next(err);
  }
}
