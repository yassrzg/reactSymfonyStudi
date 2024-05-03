
import axiosInstance from '../Components/Axios/AxiosInstance';

export const EventService = {
    getEvents: async () => {
        try {
            const response = await axiosInstance.get('/api/getEvent');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch events:', error);
            return [];
        }
    },

    deleteEventById: async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/admin/deleteEvent/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to delete event with ID ${id}:`, error);
            throw error;  // Re-throw the error to handle it in the component
        }
    },
    createEvent(formData) {
        return axiosInstance.post('/api/admin/setEvent', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    updateEvent(id, formData) {
        return axiosInstance.post(`/api/admin/updateEvent/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    getCategories: async () => {
        try {
            const response = await axiosInstance.get('/api/getCategories');
            return response.data.map(cat => ({ label: cat.name, value: cat.id }));
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error; // Re-throw the error to handle it in the component
        }
    },
    getEventByCategories: async() => {
        try {
            const response = await axiosInstance.get('/api/getEvent/byCategories');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch events by categories:', error);
            return [];
        }
    }
};

