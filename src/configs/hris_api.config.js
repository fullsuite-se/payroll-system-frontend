import axios from "axios";
import env from "./env.config";

const hris_api = axios.create({
    baseURL: env.VITE_HRIS_BACKEND_URL,
    withCredentials: false,
});

hris_api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default hris_api;