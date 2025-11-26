import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.DATABASE_HOST || "localhost";
const port = Number(process.env.DATABASE_PORT || 3306);
const user = process.env.DATABASE_USER || "app";
const password = process.env.DATABASE_PASSWORD || "apppassword";
const database = process.env.DATABASE_NAME || "notes_app";

export const pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    connectionLimit: 10,
    timezone: "+08:00"
});
