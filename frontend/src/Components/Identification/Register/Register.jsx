import React, {useState, useRef, useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';

import {ToastContext} from "../../../Context/ToastContext";
import './Singin.css'; // Corrected from 'Singin.css' to 'Signup.css'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [consent, setConsent] = useState(false);

    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();


    const resetForm = () => {
        setEmail('');
        setName('');
        setLastname('');
        setPassword('');
        setConfirmPassword('');
        setConsent(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showToast('error', 'Error', 'Passwords do not match', 3000);
            return;
        }
        const data = { email, password, name, lastname, consent };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        try {
            const response = await axios.post('https://127.0.0.1:8000/api/register', data, config);
            if (response.status === 200) { // Check if registration was successful
                showToast('success', 'Registered', 'Registration successful. You will receive an email to complete the double authentication process.', 5000);
                resetForm();
                setTimeout(() => navigate('/login'), 5000);
            } else {
                throw new Error('Registration was successful but response status is not 200');
            }
        } catch (error) {
            showToast('error', 'Registration Failed', 'Error occurred during registration: ' + error.message, 5000);
        }
    };

    return (
        <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <span className="p-float-label signin">
                    <InputText id="firstName" value={name} onChange={e => setName(e.target.value)} required/>
                    <label htmlFor="firstName">First Name</label>
                </span>

                <span className="p-float-label signin">
                    <InputText id="lastName" value={lastname} onChange={e => setLastname(e.target.value)} required/>
                    <label htmlFor="lastName">Last Name</label>
                </span>

                <span className="p-float-label signin">
                    <InputText id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    <label htmlFor="email">Email</label>
                </span>

                <span className="p-float-label signin">
                    <Password id="password" value={password} onChange={e => setPassword(e.target.value)} toggleMask required/>
                    <label htmlFor="password">Password</label>
                </span>

                <span className="p-float-label signin">
                    <Password id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} toggleMask required/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </span>

                <div className="p-field-checkbox ">
                    <Checkbox inputId="consent" checked={consent} onChange={e => setConsent(e.checked)}/>
                    <label htmlFor="consent">I agree to the Terms and Conditions</label>
                </div>

                <Button label="Sign Up" className="p-button-rounded p-button-success"/>

                <div className="login">
                    <Link to="/login">Already registered? Log in.</Link>
                </div>
            </form>
        </div>
    );
}
