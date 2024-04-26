import React, {useContext, useEffect, useRef, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'primereact/button';
import { UserContext } from "../../../Context/context";
import { ToastContext } from "../../../Context/ToastContext";

function LoginDoubleAuth() {
    const { token } = useParams();
    const [message, setMessage] = useState('Please click the button to verify your account.');
    const [verified, setVerified] = useState(false);
    const toast = useRef(null);

    const { setUser } = useContext(UserContext);
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
            const response = await axios.patch(`https://127.0.0.1:8000/api/login/${token}`, {}, config);
            setVerified(true);
            showToast('success', 'Account Verified', 'Your account has been successfully verified!', 3000);
            const storedToken = response.data.token;
            sessionStorage.setItem('tokenStudiJo', storedToken);
            // const storedToken = sessionStorage.getItem('tokenStudiJo');
            const userResponse = await axios.get('https://127.0.0.1:8000/api/getUser', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });

            setUser(userResponse.data);
            setTimeout(() => navigate('/account'), 2000); // Delayed navigation
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            showToast('error', 'Verification Failed', errorMessage, 5000);
        }
    };

    return (
        <div>
            <h1>Login Double Authentication</h1>
            {!verified && (
                <Button label="Click here to verify" onClick={verifyAccount}
                        className="p-button-raised p-button-rounded p-button-success"/>
            )}
        </div>
    );
}

export default LoginDoubleAuth;
