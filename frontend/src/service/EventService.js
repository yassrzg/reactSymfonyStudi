import axios from 'axios';

export const EventService = {
    getEvents: async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/getEvent');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch events:', error);
            return [];
        }
    },

    deleteEventById: async (id) => {
        try {
            const response = await axios.delete(`https://127.0.0.1:8000/api/deleteEvent/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to delete event with ID ${id}:`, error);
            throw error;  // Re-throw the error to handle it in the component
        }
    },
    createEvent(formData) {
        return axios.post('https://127.0.0.1:8000/api/setEvent', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    updateEvent(id, formData) {
        return axios.post(`https://127.0.0.1:8000/api/updateEvent/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    getCategories: async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/getCategories');
            return response.data.map(cat => ({ label: cat.name, value: cat.id }));
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error; // Re-throw the error to handle it in the component
        }
    }
};

