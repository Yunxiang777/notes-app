import dotenv from "dotenv";

dotenv.config();

export const env = {
    JWT_SECRET: process.env.JWT_SECRET ?? "secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
    DATABASE_URL: process.env.DATABASE_URL ?? "mysql://localhost/notes",
} as const;

// 類型推斷
export type EnvConfig = typeof env;
