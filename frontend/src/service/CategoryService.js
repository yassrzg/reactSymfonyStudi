import axios from 'axios';
import axiosInstance from '../Components/Axios/AxiosInstance';

export const CategoryService = {
    createCategory: async (categoryName) => {
        try {
            const response = await axiosInstance.post('/api/admin/setCategories', { name: categoryName });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};