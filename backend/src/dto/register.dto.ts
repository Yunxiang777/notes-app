import { z } from 'zod';

// DTO - 用戶註冊驗證規則
export const RegisterDtoSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format')
        .min(5, 'Email must be at least 5 characters')
        .max(255, 'Email must not exceed 255 characters')
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(128, 'Password must not exceed 128 characters'),
});

// RegisterDto
export type RegisterDto = z.infer<typeof RegisterDtoSchema>;