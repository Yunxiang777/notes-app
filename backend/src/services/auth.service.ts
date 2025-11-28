import { env } from "../config/env";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db";
import {
  IRegisterRequest,
  IRegisterResponse,
  ILoginRequest,
  ILoginResponse,
} from "../types/api/auth";
import { ResultSetHeader } from "mysql2";
import type { UserRow, ExistingUserRow } from "../types/db/user";

// 註冊
export async function register(
  dto: IRegisterRequest
): Promise<IRegisterResponse> {
  const { email, password } = dto;
  const conn = await pool.getConnection();

  try {
    // email 是否已存在
    const [existing] = await conn.query<ExistingUserRow[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      throw { status: 409, message: "Email already in use" };
    }

    // hash 密碼
    const passwordHash = await bcrypt.hash(password, 10);

    // 寫入資料庫
    const [result] = await conn.query<ResultSetHeader>(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, passwordHash]
    );

    const userId = result.insertId;

    // 發 Token
    const token = jwt.sign({ userId, email }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    return {
      user: { id: userId, email },
      token,
    };
  } finally {
    conn.release();
  }
}

// 登入
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
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN,
      }
    );

    return {
      user: { id: user.id, email: user.email },
      token,
    };
  } finally {
    conn.release();
  }
}
