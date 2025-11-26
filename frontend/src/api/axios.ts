import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4000/api", // backend 完成後即可串接
    withCredentials: false
});

// 自動附帶 token
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
