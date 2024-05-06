import React, { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { ToastContext } from "../../Context/ToastContext";
import { UseTokenUser } from "../../service/UseTokenUser";

export default function PasswordChangeModal() {
    const [visible, setVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { showToast } = useContext(ToastContext);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    // Asynchronous function to handle password change
    const handlePasswordChange = async () => {  // Added async keyword
        if (newPassword !== confirmPassword) {
            showToast('error', 'Passwords Do Not Match', 'New passwords do not match!');
            return;
        }
        try {
            // Assuming `changePassword` is expecting an object {newPassword, oldPassword}
            const response = await UseTokenUser.changePassword({ newPassword, oldPassword });
            showToast('success', 'Password Changed', 'Password successfully changed!');
            console.log("Password change response:", response);
            hideDialog();
        } catch (error) {
            console.error('Error changing password:', error);
            showToast('error', 'Password Change Failed', error.message || 'Failed to change password.');
        }
    };

    return (
        <div>
            <Button label="Change Password" icon="pi pi-external-link" onClick={showDialog} />

            <Dialog header="Change Password" visible={visible} style={{ width: '50vw' }} modal onHide={hideDialog}>
                <div>
                    <h5>Old Password</h5>
                    <Password value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} feedback={false} />

                    <h5>New Password</h5>
                    <Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} feedback={false} />

                    <h5>Confirm New Password</h5>
                    <Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} feedback={false} />

                    <Button label="Submit" icon="pi pi-check" onClick={handlePasswordChange} className="p-mt-2" />
                </div>
            </Dialog>
        </div>
    );
}
