import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // 只允許你的 React 開發伺服器
    methods: ["GET", "POST"], // 限制可用 HTTP 方法
    credentials: true, // 若要傳 cookie / token
  })
);
app.use(express.json());

// 路由
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("✅ Server running on port 5000"));
