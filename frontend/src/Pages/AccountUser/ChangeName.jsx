import React, { useState, useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ToastContext } from "../../Context/ToastContext";
import { UseTokenUser } from "../../service/UseTokenUser";
import {UserContext} from "../../Context/context";

export default function ChangeNameModal() {
    const { user, setUser } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const [newName, setNewName] = useState(user ? user.name :'');
    const { showToast } = useContext(ToastContext);


    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleChangeName = async () => {
        if (!newName.trim()) {
            showToast('error', 'Invalid Name', 'Name cannot be empty');
            return;
        }
        if(newName === user.name){
            showToast('info', 'No Change', 'The new name is the same as the current one.');
            return;
        }
        try {
            await UseTokenUser.changeName(newName);
            showToast('success', 'Name Changed', 'Your name has been updated successfully!');
            setUser(prev => ({ ...prev, name: newName }));
            hideDialog();
        } catch (error) {
            showToast('error', 'Change Failed', 'Failed to update name');
        }
    };

    return (
        <div>
            <Button label="Change Name" icon="pi pi-user-edit" onClick={showDialog} />
            <Dialog header="Change Your Name" visible={visible} style={{ width: '30vw' }} modal onHide={hideDialog} className='dialog-edit-name-surname'>
                <div className='container-edit-name-surname'>
                    <InputText placeholder='New Name' value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus className="p-inputtext-lg p-d-block" />
                    <Button label="Submit" icon="pi pi-check" onClick={handleChangeName} className="p-mt-2" />
                </div>
            </Dialog>
        </div>
    );
}
