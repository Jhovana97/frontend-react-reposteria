import axios, { type InternalAxiosRequestConfig } from "axios";

// 👉 crea instancia personalizada
const API = axios.create({
    baseURL: "http://localhost:3000", // cambia a tu URL de producción
    headers: {
        "Content-Type": "application/json",
    },
});

// 👉 interceptor para agregar token automáticamente
API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;