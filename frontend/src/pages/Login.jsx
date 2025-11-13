import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css"; // 👈 匯入樣式

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("登入失敗");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>系統登入</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="使用者名稱"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密碼"
        />
        <button type="submit">登入</button>
      </form>
    </div>
  );
}
