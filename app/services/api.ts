import axios from "axios";
import Cookies from "js-cookie"

const BASE_URL = "http://localhost:8080"

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
            if(error.response.status === 401 || error.response.status === 403) {
                console.log("login expirado!")
                Cookies.remove("token")
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)


export default api;