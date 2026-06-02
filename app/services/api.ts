import axios from "axios";
import Cookies from "js-cookie"
import { ApiError } from "../types/api/api-error";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: BASE_URL
});


api.interceptors.request.use(

    (config) => {
        const token = Cookies.get("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                console.log("login expirado!")
                Cookies.remove("token")
                window.location.href = '/login'
            }
            
            const apiError = error.response.data as ApiError;
            if (apiError && apiError.message) {
                error.message = apiError.message.split(":").pop()?.trim() || error.message;
            }
        }

        return Promise.reject(error)
    }
)


export default api;