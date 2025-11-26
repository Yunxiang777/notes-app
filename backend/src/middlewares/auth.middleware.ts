import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface AuthRequest extends Request {
    user?: { id: number; email?: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "No token provided" });
    const parts = auth.split(" ");
    if (parts.length !== 2) return res.status(401).json({ error: "Token error" });

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "Token malformatted" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.user = { id: decoded.userId, email: decoded.email };
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalid" });
    }
}
