import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { UserService } from '../../../service/UserService';
import { ToastContext } from "../../../Context/ToastContext";
import logo from '../../../logo/defaultlogo.jpg';

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [consent, setConsent] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);

    const { showToast } = useContext(ToastContext);

    useEffect(() => {
        setIsDisabled(
            email.trim() === '' ||
            name.trim() === '' ||
            lastname.trim() === '' ||
            password.trim() === '' ||
            confirmPassword.trim() === '' ||
            !consent ||
            !isEmailValid
        );
    }, [email, name, lastname, password, confirmPassword, consent, isEmailValid]);

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(value);
        setIsEmailValid(isValid);
        setEmailInvalid(!isValid);
        return isValid;
    };

    const resetForm = () => {
        setEmail('');
        setName('');
        setLastname('');
        setPassword('');
        setConfirmPassword('');
        setConsent(false);
        setEmailInvalid(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!consent) {
            showToast('warn', 'Consent Required', 'Please agree to the Terms and Conditions to proceed', 5000);
            return;
        }
        if (!validateEmail(email)) {
            showToast('error', 'Invalid Email', 'Please enter a valid email address', 5000);
            return;
        }
        if (password !== confirmPassword) {
            showToast('error', 'Password Mismatch', 'Passwords do not match', 5000);
            return;
        }

        const userData = { email, name, lastname, password, consent };

        try {
            const response = await UserService.register(userData);
            showToast('success', 'Registered', 'Registration successful. You will receive an email to complete the double authentication process.', 6000);
            resetForm();
        } catch (error) {
            showToast('error', 'Registration Failed', error.response?.data?.message || error.message, 5000);
        }
    };

    return (
        <div className="flex align-items-center justify-content-center" style={{marginTop:'4rem'}}>
            <div className="surface-card shadow-2 border-round w-full lg:w-6 container-connect-component">
                <div className="text-center mb-5">
                    <img src={logo} alt="hyper" height={50} className="mb-3 img-connect-component" />
                    <h2 className="text-900 text-3xl font-medium mb-3">Sign Up</h2>
                    <span className="text-600 font-medium line-height-3">Already have an account?</span>
                    <Link to="/login" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Log in</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-field">
                        <label htmlFor="firstName" className="block text-900 font-medium mb-2">First Name</label>
                        <InputText id="firstName" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" className="w-full mb-3" required />
                    </div>

                    <div className="p-field">
                        <label htmlFor="lastName" className="block text-900 font-medium mb-2">Last Name</label>
                        <InputText id="lastName" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last name" className="w-full mb-3" required />
                    </div>

                    <div className="p-field">
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <InputText id="email" type="text" value={email} onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value) }} placeholder="Email address" className={`w-full mb-3 ${emailInvalid ? 'p-invalid' : ''}`} required />
                    </div>

                    <div className="p-field">
                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                        <Password id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-3" toggleMask required />
                    </div>

                    <div className="p-field">
                        <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">Confirm Password</label>
                        <Password id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full mb-3" toggleMask required />
                    </div>

                    <div className="p-field-checkbox">
                        <Checkbox inputId="consent" checked={consent} onChange={(e) => setConsent(e.checked)} />
                        <label htmlFor="consent" className="p-checkbox-label">I agree to the Terms and Conditions</label>
                    </div>

                    <Button type="submit" label="Sign Up" icon="pi pi-user" className="w-full btn-connect" disabled={isDisabled} />
                </form>
            </div>
        </div>
    );
}
