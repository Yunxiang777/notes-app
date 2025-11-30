import notesRoutes from "./routes/notes.routes";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import cookieParser from "cookie-parser";
import { NotFound } from "./utils/http";

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173", // fronted URL domain
    credentials: true, // 啟用 Cookie
  })
);
app.use(cookieParser());
app.use(express.json());

// 路由
app.use("/api/auth", authRoutes); // 登入
app.use("/api/notes", notesRoutes); // 記事本

// 404 — 未匹配任何路由
app.use((req, res, next) => {
  next(NotFound("route_not_found"));
});

// 錯誤處理
app.use(errorHandler);

export default app;
