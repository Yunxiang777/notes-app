import notesRoutes from "./routes/notes.routes";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// 路由
app.use("/api/auth", authRoutes); // 登入
app.use("/api/notes", notesRoutes); // 記事本

// 錯誤處理
app.use(errorHandler);

export default app;
