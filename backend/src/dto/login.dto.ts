// src/dtos/login.dto.ts
import { z } from 'zod';

export const LoginDtoSchema = z.object({
    email: z
        .string()
        .nonempty('Email is required')
        .email('Invalid email format'),

    password: z
        .string()
        .nonempty('Password is required'),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;
