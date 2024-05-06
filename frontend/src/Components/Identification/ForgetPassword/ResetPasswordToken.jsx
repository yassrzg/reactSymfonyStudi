import React, {useContext, useState} from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useParams, useNavigate } from 'react-router-dom';
import { UserService } from "../../../service/UserService";
import {ToastContext} from "../../../Context/ToastContext";

const PasswordResetForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { token } = useParams();
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!password) {
            newErrors.password = 'Password is required';
        }
        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            try {
                const response = await UserService.resetPasswordToken(token, password);  // Use resetPasswordToken method
                console.log(response);  // Log or handle the response appropriately
                setPassword('');
                setConfirmPassword('');
                setErrors({});
                showToast('success', 'Password updated', 'Your password has been updated successfully!', 5000);
                setTimeout(() => navigate('/login'), 1500);
            } catch (error) {
                showToast('error', 'Login Error', error.response?.data?.message || 'Login failed', 5000);
            }
        }
    };

    return (
        <div className="flex align-items-center justify-content-center" style={{marginTop: '2rem'}}>
            <form onSubmit={handleSubmit} className="surface-card p-4 shadow-2 border-round form-reset-password">
                <div className="field">
                    <label htmlFor="password" className="block text-900 font-medium mb-2">New Password</label>
                    <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" className="w-full" />
                    {errors.password && <small className="p-error">{errors.password}</small>}
                </div>

                <div className="field">
                    <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">Confirm Password</label>
                    <InputText id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full" />
                    {errors.confirmPassword && <small className="p-error">{errors.confirmPassword}</small>}
                </div>

                <Button type="submit" label="Reset Password" icon="pi pi-check" className="w-full mt-3" />
            </form>
        </div>
    );
};

export default PasswordResetForm;
