import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { RegisterDto } from '../dto/register.dto';

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
        // 傳遞錯誤處理給 middleware
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (err) {
        next(err);
    }
}
