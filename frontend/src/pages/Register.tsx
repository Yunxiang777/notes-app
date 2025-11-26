import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            await api.post("/auth/register", { email, password });
            navigate("/login");
        } catch (err) {
            setError("註冊失敗！");
        }
    }

    return (
        <div style={{ padding: 30 }}>
            <h2>註冊</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleRegister}>
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

                <button type="submit">註冊</button>
            </form>
        </div>
    );
}

export default Register;
