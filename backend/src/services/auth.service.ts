import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db";
import { IRegisterRequest, IRegisterResponse, ILoginRequest, ILoginResponse } from "../interfaces/auth.interface";
import { ResultSetHeader } from "mysql2";
import type { UserRow, ExistingUserRow } from "../types/db/user";
import { StringValue } from "ms";

dotenv.config();

// JWT 設定
const JWT_SECRET = process.env.JWT_SECRET ?? "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRE as StringValue ?? "30d";

// ------------------------------
// 註冊
// ------------------------------
export async function register(dto: IRegisterRequest): Promise<IRegisterResponse> {
    const { email, password } = dto;
    const conn = await pool.getConnection();

    try {
        // 1. email 是否已存在
        const [existing] = await conn.query<ExistingUserRow[]>(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            throw { status: 409, message: "Email already in use" };
        }

        // 2. hash 密碼
        const passwordHash = await bcrypt.hash(password, 10);

        // 3. 寫入資料庫
        const [result] = await conn.query<ResultSetHeader>(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            [email, passwordHash]
        );

        const userId = result.insertId;

        // 4. 發 Token
        const token = jwt.sign({ userId, email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        return {
            user: { id: userId, email },
            token,
        };
    } finally {
        conn.release();
    }
}

// ------------------------------
// 登入
// ------------------------------
export async function login(dto: ILoginRequest): Promise<ILoginResponse> {
    const { email, password } = dto;
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.query<UserRow[]>(
            "SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1",
            [email]
        );

        if (rows.length === 0) {
            throw { status: 401, message: "Invalid email or password" };
        }

        const user = rows[0];

        // 密碼比對
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw { status: 401, message: "Invalid email or password" };
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return {
            user: { id: user.id, email: user.email },
            token,
        };
    } finally {
        conn.release();
    }
}
