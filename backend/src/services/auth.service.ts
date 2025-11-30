import { pool } from "../config/db";
import {
  IRegisterRequest,
  IRegisterResponse,
  ILoginRequest,
  ILoginResponse,
} from "../types/api/auth";
import { ResultSetHeader } from "mysql2";
import type { UserRow, ExistingUserRow } from "../types/db/user";
import {
  generateToken,
  hashPassword,
  comparePassword,
} from "../utils/jwt.utils";
import { BadRequest } from "../utils/http";

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
      throw BadRequest("Email already in use");
    }

    // hash 密碼
    const passwordHash = await hashPassword(password);

    // 寫入資料庫
    const [result] = await conn.query<ResultSetHeader>(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, passwordHash]
    );

    const userId = result.insertId;

    // 發 Token
    const token = generateToken({ userId, email });

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
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      throw { status: 401, message: "Invalid email or password" };
    }

    // token
    const token = generateToken({ userId: user.id, email: user.email });

    return {
      user: { id: user.id, email: user.email },
      token,
    };
  } finally {
    conn.release();
  }
}
