import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { email, password });
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("註冊失敗，請稍後再試！");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "360px", borderRadius: "18px" }}
      >
        <h3 className="text-center mb-4">註冊帳號</h3>

        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        <form onSubmit={handleRegister}>
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

          <button className="btn btn-success w-100" type="submit">
            註冊
          </button>
        </form>

        <p
          className="text-center mt-3 text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          已經有帳號？登入
        </p>
      </div>
    </div>
  );
}

export default Register;
