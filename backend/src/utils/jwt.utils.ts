import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/env";

export const generateToken = (payload: object): string =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

export const hashPassword = (password: string, rounds = 10): Promise<string> =>
  bcrypt.hash(password, rounds);

export const comparePassword = (
  password: string,
  hash: string
): Promise<boolean> => bcrypt.compare(password, hash);
