import React, { useState, useContext, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios'; // Import axios library for making HTTP requests
import { ToastContext } from '../../Context/ToastContext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { QrCodeService } from '../../service/QrCodeService';
import {UserContext} from "../../Context/context";
import {useLocation, useNavigate} from "react-router-dom";

function Paiement() {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null); // State to store the client secret

    const { user } = useContext(UserContext);
    const { showToast } = useContext(ToastContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await axios.get('https://127.0.0.1:8000/api/payment');
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
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
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (!result.error) {
                const { eventId, companions } = location.state;
                await createQRCode(user.user, eventId, companions ); // Call createQRCode function on successful payment
            } else {
                showToast('error', 'Payment Error', result.error.message);
                setError(result.error.message);
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
        }
    };

    const createQRCode = async (userEmail, eventId, companions) => {
        try {
            // Make a request to your QrCodeService to create a QR code
            const response = await QrCodeService.createQrCode({
                userEmail,
                eventId,
                companions
            });

            showToast('success', 'QR Code Created', 'Your QR code has been successfully created.');
            navigate('/account/my-events');
        } catch (error) {
            console.error('Error creating QR code:', error);
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
