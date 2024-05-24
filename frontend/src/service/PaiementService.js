import axiosInstance from '../Components/Axios/AxiosInstance';



export const PaiementService = {
    async fetchClientSecret() {
        try {
            const response = await axiosInstance.get('/api/payment');
            return response.data.clientSecret;
        } catch (error) {
            console.error('Error fetching client secret:', error);
            throw error;
        }
    },

    async confirmPayment(stripe, clientSecret, cardElement) {
        try {
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            return paymentResult;
        } catch (error) {
            console.error('Error confirming payment:', error);
            throw error;
        }
    }
};
