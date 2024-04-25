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
    }
};

