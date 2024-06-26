import React, {useState, useContext, useEffect} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {ToastContext} from "../../../Context/ToastContext";
import logo from '../../../logo/defaultlogo.jpg';
import { Link} from 'react-router-dom';
import { UserService } from '../../../service/UserService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const { showToast } = useContext(ToastContext);


    useEffect(() => {
        setIsDisabled(email.trim() === '' || password.trim() === '' || !isEmailValid);
    }, [email, password, isEmailValid]);

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(regex.test(value));
    };
    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email, password };

        try {
            const data = await UserService.login(email, password);
            if (data.isActive === true) {
                showToast('success', 'Check your mail!', 'You will receive mail for double authentication.', 5000);
                resetForm();
            } else {
                showToast('error', 'Inactive Account', 'Please activate your account.', 5000);
            }
        } catch (error) {
            showToast('error', 'Login Error', error.response?.data?.message || 'Login failed', 5000);
        }
    };

    return (
        <div className="flex align-items-center justify-content-center register-login-container" style={{marginTop:'4rem'}}>
            <div className="surface-card container-connect-component shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src={logo} alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                    <Link to="/register" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</Link>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="p-field">
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <InputText id="email" type="text" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value)
                        }} placeholder="Email address" className="w-full mb-3"/>
                    </div>

                    <div className="p-field">
                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                        <InputText id="password" type="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                                   className="w-full mb-3"/>
                    </div>

                    <Button type="submit" label="Sign In" icon="pi pi-user" className="w-full mt-2"
                            disabled={isDisabled}/>

                    <div className='p-field text-center mt-6'>
                        <Link to="/forgot-password" className="text-blue-500 cursor-pointer mb-3">Forgot
                            Password?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
