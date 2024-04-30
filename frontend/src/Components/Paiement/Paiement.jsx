import React, { useState, useContext, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios'; // Import axios library for making HTTP requests
import { ToastContext } from '../../Context/ToastContext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { QrCodeService } from '../../service/QrCodeService';
import {UserContext} from "../../Context/context";
import {useLocation, useNavigate} from "react-router-dom";
import { PaiementService } from '../../service/PaiementService';
import { v4 as uuidv4 } from 'uuid';




function Paiement() {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null); // State to store the client secret

    const { user } = useContext(UserContext);
    const { showToast } = useContext(ToastContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { eventId, companions } = location.state || { eventId: null, companions: 0};


    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (!eventId) {
            navigate('/');
        }
    }, [eventId, navigate, user]);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const secret = await PaiementService.fetchClientSecret();
                setClientSecret(secret);
            } catch (error) {
                showToast('error', 'Error', 'Failed to fetch payment details.');
            }
        };

        fetchClientSecret();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!clientSecret) {
            showToast('error', 'Stripe Not Loaded', 'Please check your network connection and try again.');
            return;
        }

        try {
            const cardElement = elements.getElement(CardElement);
            const result = await PaiementService.confirmPayment(stripe, clientSecret, cardElement);

            if (result.error) {
                showToast('error', 'Payment Error', 'Veuillez raffraichir la page et réessayer.');
                setError(result.error.message);
            } else {
                   const token = uuidv4();
                await createQRCode(user.user, eventId, companions, token);
            }
        } catch (error) {
            showToast('error', 'Payment Error', 'Failed to process payment.');
        }
    };

    const createQRCode = async (userEmail, eventId, companions, token) => {
        try {
            // Make a request to your QrCodeService to create a QR code
            const response = await QrCodeService.createQrCode({
                userEmail,
                eventId,
                companions,
                token
            });

            showToast('success', 'QR Code Created', 'Your QR code has been successfully created.');
            navigate('/account');
        } catch (error) {
            showToast('error', 'QR Code Creation Error', 'An error occurred while creating the QR code.');
        }
    };

    return (
        <div className="p-fluid" id={'card-paiement-form'}>
            <Card title="Payment Details">
                <form onSubmit={handleSubmit}>
                    <div className="p-grid">
                        <div className="p-col">
                            <label htmlFor="card-element">Card details</label>
                            <CardElement id="card-element" options={{ style: { base: { fontSize: '16px' } } }} />
                        </div>
                    </div>
                    {error && <small className="p-error">{error}</small>}
                    <Button type="submit" label="Pay" icon="pi pi-check" disabled={!stripe} className="p-mt-2" />
                </form>
            </Card>
        </div>
    );
}

export default Paiement;
