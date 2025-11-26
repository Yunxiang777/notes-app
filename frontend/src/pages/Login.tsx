import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err: any) {
            setError("登入失敗，請檢查帳密！");
        }
    }

    return (
        <div style={{ padding: 30 }}>
            <h2>登入</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="電子郵件"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />

                <input
                    type="password"
                    placeholder="密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />

                <button type="submit">登入</button>
            </form>

            <p onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
                沒有帳號？註冊
            </p>
        </div>
    );
}

export default Login;
