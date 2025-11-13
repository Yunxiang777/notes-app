import { useEffect, useState } from "react";
import { getProfile } from "../api/auth";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    getProfile(token)
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Token 無效或過期"));
  }, []);

  return <h2>{message}</h2>;
}
