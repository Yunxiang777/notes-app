import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const login = (username, password) =>
  axios.post(`${API}/login`, { username, password });

export const getProfile = (token) =>
  axios.get(`${API}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
