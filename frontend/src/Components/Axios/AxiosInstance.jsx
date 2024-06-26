import axios from 'axios';
import Cookies from 'js-cookie';


const baseURL = process.env.REACT_APP_BASE_URL;


const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json'},
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('tokenStudiJo');
        if (token) {

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
    async (error) => {
        if (error.response && error.response.status === 401) {
            Cookies.remove('tokenStudiJo');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
