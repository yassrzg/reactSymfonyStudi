import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'primereact/button';
import {ToastContext} from "../../../Context/ToastContext";


function RegisterDoubleAuth() {
    const { token } = useParams();
    const [verified, setVerified] = useState(false);

    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const verifyAccount = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            };
            const response = await axios.patch(`https://127.0.0.1:8000/api/register/${token}`, {}, config);
            showToast('success', 'Account Verified', 'Thank you for verifying your account.', 3000);
            setVerified(true);

            setTimeout(() => navigate('/login'), 2000); // Delayed navigation
        } catch (error) {
            showToast('error', 'Verification Failed', error.response?.data?.message || 'An unexpected error occurred', 5000);
        }
    };

    return (
        <div>
            <h1>Register Double Authentication</h1>
            {!verified && (
                <Button label="Click here to verify" onClick={verifyAccount}
                        className="p-button-raised p-button-rounded"/>
            )}
        </div>
    );
}

export default RegisterDoubleAuth;