import axios from 'axios';
import axiosInstance from '../Components/Axios/AxiosInstance';

export const CategoryService = {
    createCategory: async (categoryName) => {
        try {
            const response = await axiosInstance.post('https://127.0.0.1:8000/api/setCategories', { name: categoryName });
            return response.data; // Return the created category data
        } catch (error) {
            throw error; // Re-throw the error to handle it in the component
        }
    }
};