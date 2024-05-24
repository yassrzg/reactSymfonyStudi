import axiosInstance from '../Components/Axios/AxiosInstance';


export const StatService = {
    async getStatsEvent() {
        try {
            const response = await axiosInstance.get('/api/admin/stats/qrcodes');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getStatsUser() {
        try {
            const response = await axiosInstance.get('/api/admin/stats/userlogins');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
