import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export async function register(email: string, password: string) {
    if (!email || !password) throw { status: 400, message: "Email and password required" };

    const conn = await pool.getConnection();
    try {
        const [rows]: any = await conn.query("SELECT id FROM users WHERE username = ?", [email]);
        if (rows.length > 0) throw { status: 400, message: "Email already in use" };

        const hash = await bcrypt.hash(password, 10);
        const [result]: any = await conn.query("INSERT INTO users (username, password_hash) VALUES (?, ?)", [email, hash]);
        const insertedId = result.insertId;
        return { id: insertedId, email };
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

        const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return token;
    } finally {
        conn.release();
    }
}
