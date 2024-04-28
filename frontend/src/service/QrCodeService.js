import axiosInstance from '../Components/Axios/AxiosInstance';


export const QrCodeService = {
    createQrCode(formData) {
        return axiosInstance.post('/api/create-qrcode', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    fetchQrData(tokenUrl) {
        return axiosInstance.get(`/api/get-data-qr-code/${tokenUrl}`);
    }
};
