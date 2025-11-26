import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';
import { IRegisterRequest, IRegisterResponse } from '../interfaces/auth.interface';
import { RowDataPacket, ResultSetHeader } from "mysql2";
import type { StringValue } from "ms";

dotenv.config();

// JWT 配置常數
const JWT_SECRET = process.env.JWT_SECRET ?? "secret";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRE as StringValue) || "30d";

interface ExistingUserRow extends RowDataPacket {
    id: number;
}

// 用戶註冊
export async function register(dto: IRegisterRequest): Promise<IRegisterResponse> {
    const { email, password } = dto;
    const conn = await pool.getConnection();

    try {
        // 1. 檢查 email 是否已經存在
        const [existingUsers] = await conn.query<ExistingUserRow[]>(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            throw {
                status: 409,
                message: 'Email already in use',
            };
        }

        // 2. 加密密碼
        const passwordHash = await bcrypt.hash(password, 10);

        // 3. 插入新用戶
        const [result] = await conn.query<ResultSetHeader>(
            'INSERT INTO users (email, password_hash) VALUES (?, ?)',
            [email, passwordHash]
        );

        const userId = result.insertId;

        const token = jwt.sign(
            {
                userId: userId.toString(),  // 改成 string
                email
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN,
            }
        );

        // 5. 返回用戶資料和 token
        return {
            user: {
                id: userId,
                email,
            },
            token,
        };

    } finally {
        conn.release();
    }
}

export async function login(email: string, password: string) {
    const conn = await pool.getConnection();
    try {
        const [rows]: any = await conn.query("SELECT id, password_hash FROM users WHERE username = ?", [email]);
        if (rows.length === 0) throw { status: 401, message: "Invalid credentials" };
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) throw { status: 401, message: "Invalid credentials" };

        const token = jwt.sign({ userId: user.id, email }, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN as string });
        return token;
    } finally {
        conn.release();
    }
}
