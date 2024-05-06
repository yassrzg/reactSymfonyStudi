import React, {useContext, useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { UserService} from "../../../service/UserService";
import {ToastContext} from "../../../Context/ToastContext";

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

    const { showToast } = useContext(ToastContext);
    const handleEmailChange = (e) => {
        const emailInput = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(emailInput));
        setEmail(emailInput);
    };
    const resetForm = () => {
        setEmail('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!emailValid) {
            alert("Please enter a valid email address.");
            return;
        }
        try {
            const data = await UserService.resetPassword(email);
            showToast('success', 'Check your mail!', 'You will receive mail for reset password.', 5000);
            resetForm();

        } catch (error) {
            showToast('error', 'Login Error', error.response?.data?.message || 'Login failed', 5000);
        }
    };

    return (
        <div className="flex align-items-center justify-content-center" style={{marginTop: '2rem'}}>
            <form onSubmit={handleSubmit} className="surface-card shadow-2 border-round form-reset-password" >
                <div className="field">
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Email Address</label>
                    <InputText id="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" className="w-full" />
                </div>
                <Button type="submit" label="Send Reset Link" icon="pi pi-envelope" className="w-full mt-3" disabled={!emailValid} />
            </form>
        </div>
    );
};

export default PasswordReset;
