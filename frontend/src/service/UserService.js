import axiosInstance from '../Components/Axios/AxiosInstance';

export const UserService = {
    async logout(userEmail) {
        try {
            const response = await axiosInstance.post('/api/logout', { email: userEmail });
            return response.data;
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    },
    async login(email, password) {
        try {
            const response = await axiosInstance.post('/api/login', { email, password });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async verifyAccount(token) {
        try {
            const response = await axiosInstance.patch(`/api/login/${token}`, {});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getUserDetails(token) {
        try {
            const response = await axiosInstance.get('/api/getUser');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async register(userData) {
        try {
            const response = await axiosInstance.post('/api/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async registerDoubleAuth(token) {
        try {
            const response = await axiosInstance.patch(`/api/register/${token}`, {});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async resetPassword(email) {
        try {
            const response = await axiosInstance.post('/api/reset-password', { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async resetPasswordToken(token, password) {
        try {
            const response = await axiosInstance.post(`/api/reset-password/${token}`, { password });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};
