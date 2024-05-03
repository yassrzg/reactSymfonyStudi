import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { UserContext } from "../../../Context/context";
import { ToastContext } from "../../../Context/ToastContext";
import { UserService } from '../../../service/UserService';
import Cookies from 'js-cookie';


function LoginDoubleAuth() {
    const { token } = useParams();
    const [message, setMessage] = useState('Please click the button to verify your account.');
    const [verified, setVerified] = useState(false);

    const { setUser, setToken } = useContext(UserContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const verifyAccount = async () => {
        try {
            const data = await UserService.verifyAccount(token);
            setVerified(true);
            showToast('success', 'Account Verified', 'Your account has been successfully verified!', 3000);
            const tokenUser = data.token;
            Cookies.set('tokenStudiJo', tokenUser, { expires: 1, path: '/' });
            const userResponse = await UserService.getUserDetails(tokenUser);
            setUser(userResponse);
            setTimeout(() => navigate('/'), 1500); // Delayed navigation
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            showToast('error', 'Verification Failed', errorMessage, 5000);
        }
    };

    return (
        <div className='double-log'>
            <h1 className='text-center'>Login Double Authentication</h1>
            {!verified && (
                <Button label="Click here to verify" onClick={verifyAccount}
                        className="p-button-raised p-button-rounded p-button-success"/>
            )}
        </div>
    );
}

export default LoginDoubleAuth;
