import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from "../dto/login.dto";

// 用戶註冊
export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const dto: RegisterDto = req.body;
        const result = await authService.register(dto);

        // 成功
        res.status(201).json({
            success: true,
            data: result,
            message: 'User registered successfully',
        });
    } catch (err: any) {
        // 失敗
        next(err);
    }
}

// 用戶登入
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const dto: LoginDto = req.body;
        const { email, password } = dto;
        const result = await authService.login(email, password);

        res.json({
            success: true,
            user: result.user,
            token: result.token,
        });
    } catch (err) {
        next(err);
    }
}