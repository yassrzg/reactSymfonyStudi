import React, { useState, useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ToastContext } from "../../Context/ToastContext";
import { UseTokenUser } from "../../service/UseTokenUser";
import { UserContext } from "../../Context/context";

export default function ChangeSurname() {
    const { user, setUser } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const [newSurname, setNewSurname] = useState(user.surname);
    const { showToast } = useContext(ToastContext);


    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleChangeSurname = async () => {
        if (!newSurname.trim()) {
            showToast('error', 'Invalid Surname', 'Surname cannot be empty');
            return;
        }
        try {
            const result = await UseTokenUser.changeSurname(newSurname);
            showToast('success', 'Surname Changed', 'Your surname has been updated successfully!');
            setUser()
            hideDialog();
        } catch (error) {
            showToast('error', 'Change Failed', 'Failed to update surname');
            console.error('Error updating surname:', error);
        }
    };

    return (
        <div>
            <Button label="Change Surname" icon="pi pi-user-edit" onClick={showDialog} />
            <Dialog header="Change Your Surname" visible={visible} style={{ width: '30vw' }} modal onHide={hideDialog} draggable={false}>
                <div>
                    <h5>New Surname</h5>
                    <InputText value={newSurname} onChange={(e) => setNewSurname(e.target.value)} autoFocus className="p-inputtext-lg p-d-block" />
                    <Button label="Submit" icon="pi pi-check" onClick={handleChangeSurname} className="p-button-success p-mt-2" />
                </div>
            </Dialog>
        </div>
    );
}
