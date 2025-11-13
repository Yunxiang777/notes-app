import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../users.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
const SECRET_KEY = "mysecretkey";

// 登入
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);

  const user = users.find((u) => u.username === username);
  console.log(user);

  const hash = bcrypt.hashSync("123456", 10);
  console.log(hash);

  if (!user) return res.status(401).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// 受保護路由
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
});

export default router;
