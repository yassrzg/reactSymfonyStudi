import axiosInstance from '../Components/Axios/AxiosInstance';

export const UseTokenUser = {
    getEventsForUser: async () => {
        try {
            const response = await axiosInstance.get('/api/user/event');
            const sortedEvents = response.data.sort((a, b) => new Date(a.event.eventDate) - new Date(b.event.eventDate));
            return sortedEvents;
        } catch (error) {
            throw error;
        }
    },
    getEventsPastForUser: async () => {
        try {
            const response = await axiosInstance.get('/api/user/eventPast');
            const sortedEvents = response.data.sort((a, b) => new Date(a.event.eventDate) - new Date(b.event.eventDate));
            return sortedEvents;
        } catch (error) {
            throw error;
        }
    },

    getQrCodesForEvent: async (qrCodeId) => {
        try {
            const response = await axiosInstance.get(`/api/get-qrcode/${qrCodeId}`); // Utilisation des backticks
            const data = response.data;
            const baseLocalUrl = "http://localhost:3000";

            const mainUserData = {
                name: data.userFirstName,
                lastname: data.userLastName,
                qrValue: data.isUsed ? 'ALREADY USED' : `${baseLocalUrl}/event/${encodeURIComponent(data.eventName)}/${encodeURIComponent(data.tokenUrl)}`,
                isUsed: data.isUsed
            };

            const qrItemsUpdated = [mainUserData];
            data.accompagnants.forEach(acc => {
                qrItemsUpdated.push({
                    name: acc.name,
                    lastname: acc.lastname,
                    qrValue: acc.isUsed ? 'ALREADY USED' : `${baseLocalUrl}/event/${encodeURIComponent(data.eventName)}/${encodeURIComponent(acc.tokenUrl)}`,
                    isUsed: acc.isUsed
                });
            });

            return qrItemsUpdated;
        } catch (error) {
            console.error('Error fetching QR codes for event:', error);
            throw error;
        }
    },
    getUserAccompagnant: async () => {
        try {
            const response = await axiosInstance.get('/api/getUserCompagnon'); // No need to pass config, headers are already included
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get('/api/admin/getAllUsers');
            if (response.status === 200) {
                // Sorting users by name, modify as needed
                return response.data.sort((a, b) => a.name.localeCompare(b.name));
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;  // Propagate error up to caller
        }
    },
    deleteUser: async (userId) => {
        try {
            // Send a DELETE request to the server
            const response = await axiosInstance.delete(`/api/admin/deleteUser/${userId}`);
            return response.data; // Assuming the backend sends back some data about the deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;  // Re-throw the error to be handled by the caller
        }
    }
};
