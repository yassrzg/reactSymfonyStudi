import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ToastContext } from "../../../Context/ToastContext";
import { UserService } from '../../../service/UserService';
import { UserContext } from "../../../Context/context";
import Cookies from "js-cookie";

function RegisterDoubleAuth() {
    const { token } = useParams();
    const [verified, setVerified] = useState(false);
    const { setUser, setToken } = useContext(UserContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const verifyAccount = async () => {
        try {
            const response = await UserService.registerDoubleAuth(token);
            showToast('success', 'Account Verified', 'Thank you for verifying your account.', 3000);
            setVerified(true);
            Cookies.set('tokenStudiJo', response.token, { expires: 1, path: '/' });

            const userResponse = await UserService.getUserDetails(response.token);
            setUser(userResponse);

            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            showToast('error', 'Verification Failed', errorMessage, 5000);
        }
    };

    return (
        <div className='double-log'>
            <h1 className='text-center'>Register Double Authentication</h1>
            {!verified && (
                <Button label="Click here to verify" onClick={verifyAccount}
                        className="p-button-raised p-button-rounded p-button-success"/>
            )}
        </div>
    );
}

export default RegisterDoubleAuth;
