import axios from 'axios';

export const QrCodeService = {
    createQrCode (formData) {
        return axios.post('https://127.0.0.1:8000/api/create-qrcode', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};

