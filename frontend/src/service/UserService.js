import axiosInstance from '../Components/Axios/AxiosInstance';

export const UserService = {
    async logout(userEmail) {
        try {
            const response = await axiosInstance.post('/api/logout', { email: userEmail });
            return response.data; // Assuming the backend sends some data on logout
        } catch (error) {
            console.error('Error during logout:', error);
            throw error; // Rethrow to handle it in the component
        }
    },
    async login(email, password) {
        try {
            const response = await axiosInstance.post('/api/login', { email, password });
            return response.data; // This might include the token and other user data
        } catch (error) {
            throw error; // Rethrow to handle it in the component
        }
    },
    async verifyAccount(token) {
        try {
            const response = await axiosInstance.patch(`/api/login/${token}`, {}); // No need to pass config, headers are already included
            return response.data; // Returns token and potentially other user data
        } catch (error) {
            throw error;
        }
    },
    async getUserDetails(token) {
        try {
            const response = await axiosInstance.get('/api/getUser');
            return response.data; // Returns the user details
        } catch (error) {
            throw error;
        }
    },
    async register(userData) {
        try {
            const response = await axiosInstance.post('/api/register', userData); // No need to pass config, headers are already included
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    // Additional methods like login, register, etc., can be added here
};
