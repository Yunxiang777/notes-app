// import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.routes";
// import notesRoutes from "./routes/notes.routes";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // routes
// app.use("/api/auth", authRoutes);
// app.use("/api/notes", notesRoutes);

// // simple health
// app.get("/health", (req: Request, res: Response) => res.json({ ok: true }));

// // error handler
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.error(err);
//     const status = err.status || 500;
//     const message = err.message || "Internal Server Error";
//     res.status(status).json({ error: message });
// });

// export default app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
// import { errorHandler } from './middlewares/error-handler.middleware';

dotenv.config();

const app = express();

// 基礎 middleware
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/auth', authRoutes);

// 錯誤處理 middleware (必須放在最後)
// app.use(errorHandler);

export default app;




