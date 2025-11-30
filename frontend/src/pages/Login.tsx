import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setError("");

        try {
            await api.post("/auth/login", { email, password });
            navigate("/");
        } catch (err) {
            setError("登入失敗，請檢查帳密！");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "360px", borderRadius: "18px" }}>
                <h3 className="text-center mb-4">登入</h3>

                {error && (
                    <div className="alert alert-danger py-2 text-center">{error}</div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="電子郵件"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="密碼"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-primary w-100" type="submit">
                        登入
                    </button>
                </form>

                <p
                    className="text-center mt-3 text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                >
                    沒有帳號？註冊
                </p>
            </div>
        </div>
    );
}

export default Login;