import dotenv from "dotenv";
import { StringValue } from "ms";
dotenv.config();

export const env = {
  JWT_SECRET: process.env.JWT_SECRET ?? "secret",
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRE as StringValue) ?? "7d",
  DATABASE_URL: process.env.DATABASE_URL ?? "mysql://localhost/notes",
  NODE_ENV: process.env.NODE_ENV === "production",
} as const;

// 類型推斷
export type EnvConfig = typeof env;
