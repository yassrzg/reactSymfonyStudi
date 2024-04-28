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
    }
};
