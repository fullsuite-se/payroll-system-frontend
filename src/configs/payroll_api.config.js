import axios from "axios";
import env from "./env.config";

const payroll_api = axios.create({
    baseURL: env.VITE_PAYROLL_BACKEND_URL,
    withCredentials: false,
});

payroll_api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default payroll_api;