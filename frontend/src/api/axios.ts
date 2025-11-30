import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true, // 允許 cookie 傳遞
});

instance.interceptors.request.use((config) => {
    return config;
});

export default instance;
