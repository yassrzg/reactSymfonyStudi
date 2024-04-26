import axios from 'axios';
import { BASE_URI } from './URI';

const axiosInstance = axios.create({
    baseURL: BASE_URI,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            // config.headers.Authorization = `Bearer ${token}`;
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Request error', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
