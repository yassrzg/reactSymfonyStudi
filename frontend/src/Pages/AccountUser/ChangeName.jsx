import React, { useState, useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ToastContext } from "../../Context/ToastContext";
import { UseTokenUser } from "../../service/UseTokenUser";
import {UserContext} from "../../Context/context";

export default function ChangeNameModal() {
    const { user } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const [newName, setNewName] = useState(user.name);
    const { showToast } = useContext(ToastContext);


    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleChangeName = async () => {
        if (!newName.trim()) {
            showToast('error', 'Invalid Name', 'Name cannot be empty');
            return;
        }
        try {
            await UseTokenUser.changeName(newName);
            showToast('success', 'Name Changed', 'Your name has been updated successfully!');
            hideDialog();
        } catch (error) {
            showToast('error', 'Change Failed', 'Failed to update name');
        }
    };

    return (
        <div>
            <Button label="Change Name" onClick={showDialog} />
            <Dialog header="Change Your Name" visible={visible} modal onHide={hideDialog}>
                <div>
                    <h5>New Name</h5>
                    <InputText value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
                    <Button label="Submit" onClick={handleChangeName} className="p-mt-2" />
                </div>
            </Dialog>
        </div>
    );
}
