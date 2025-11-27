// src/dtos/register.dto.ts
import { z } from 'zod';

// DTO - 用戶註冊驗證規則
export const RegisterDtoSchema = z.object({
    email: z
        .string()
        .nonempty('Email is required')
        .email('Invalid email format')
        .max(255, 'Email must not exceed 255 characters')
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .nonempty('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(128, 'Password must not exceed 128 characters'),
});

// RegisterDto
export type RegisterDto = z.infer<typeof RegisterDtoSchema>;