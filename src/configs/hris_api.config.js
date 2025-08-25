import axios from "axios";
import env from "./env.config";

const hris_api = axios.create({
    baseURL: "http://localhost:3000",
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