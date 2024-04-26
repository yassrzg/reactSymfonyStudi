import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Panel } from 'primereact/panel';
import { ToastContext } from "../../../Context/ToastContext";
import UploadFiles from './UploadFiles';

function EditEvent({ event }) {
    const initialEventState = {
        name: event.name,
        description: event.description,
        date: event.date,
        price: event.price,
        price_famille: event.PriceOffertFamille,
        location: event.location,
        image: event.image,
        category: event.categoriesEvents[0]?.id, // Safely access the ID
        stock: event.stockage
    };

    const [categories, setCategories] = useState([]);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [editedEvent, setEditedEvent] = useState(initialEventState);
    const { showToast } = useContext(ToastContext);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/getCategories');
            setCategories(response.data.map(cat => ({ label: cat.name, value: cat.id })));
        } catch (error) {
            showToast('error', 'Error', 'Failed to fetch categories');
        }
    }, [showToast]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        setEditedEvent(initialEventState);
    }, [event]);

    const onInputChange = (e, name) => {
        const value = e.value || e.target.value;
        setEditedEvent(prevState => ({ ...prevState, [name]: value }));
    };

    const onInputNumberChange = (e, name) => {
        setEditedEvent(prevState => ({ ...prevState, [name]: e.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(editedEvent).forEach(key => {
            // Append only if edited
            if (editedEvent[key] !== event[key]) {
                formData.append(key, editedEvent[key]);
            }
        });

        try {
            const response = await axios.post(`https://127.0.0.1:8000/api/updateEvent/${event.id}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            if (response.status === 200) {
                showToast('success', 'Success', 'Event updated successfully');
                setIsSubmitted(true);
            }
        } catch (error) {
            showToast('error', 'Error', 'Failed to update event');
        }
    };

    const onReset = () => {
        setEditedEvent(initialEventState);  // Reset to initial values
    };


    return (
        <div>
            <Dialog visible={isSubmitted} style={{ width: '450px' }} header="Confirmation" modal onHide={() => setIsSubmitted(false)}>
                <p>The event "{event.name}" has been updated successfully!</p>
            </Dialog>
            <Panel header="Edit Event" style={{ marginBottom: '2em' }}>
                <form className="p-fluid" onSubmit={onSubmit}>
                    <div className={'input-create-event mb1'}>
                        <div className="p-field div-target-created">
                            <InputText placeholder="Event name" id="name" value={editedEvent.name}
                                       onChange={(e) => onInputChange(e, 'name')}/>
                        </div>
                        <div className="p-field div-target-created">
                            <Calendar id="date" value={editedEvent.date} onChange={(e) => onInputChange(e, 'date')}
                                      showIcon
                                      minDate={new Date()} dateFormat="dd/mm/yy"/>
                        </div>
                    </div>
                    <div className="p-field mb1">
                        <InputTextarea placeholder="Description of event" id="description" value={editedEvent.description}
                                       onChange={(e) => onInputChange(e, 'description')} rows={5}/>
                    </div>
                    <div className={'input-create-event mb1'}>
                        <div className="p-field div-target-created">
                            <label htmlFor="price">Price Formule DUO</label>
                            <InputNumber id="price" value={editedEvent.price}
                                         onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency"
                                         currency="EUR" locale="fr-FR" placeholder="0 €"/>
                        </div>
                        <div className="p-field div-target-created">
                            <label htmlFor="price_famille">Price Formule Famille</label>
                            <InputNumber id="price_famille" value={editedEvent.price_famille}
                                         onValueChange={(e) => onInputNumberChange(e, 'PriceOffertFamille')} mode="currency"
                                         currency="EUR" locale="fr-FR" placeholder="0 €"/>
                        </div>
                    </div>
                    <div className={'input-create-event mb1'}>
                        <div className="p-field div-target-created">
                            <InputText id="location" value={editedEvent.location}
                                       onChange={(e) => onInputChange(e, 'location')}
                                       placeholder="Enter the Location of event"/>
                        </div>
                        <div className="p-field input-select-category-admin div-target-created">
                            <Dropdown inputId="category" value={editedEvent.category} options={categories}
                                      onChange={(e) => onInputChange(e, 'category')}
                                      placeholder="Select a Category"/>
                            <Button type="button" label="+"
                                    className="p-button-rounded p-button-success p-ml-2 btn-created-event"
                                    onClick={() => setIsDialogVisible(true)}/>
                        </div>
                    </div>
                    <div className={'input-create-event mb1 input-up-img-created'}>
                        <div className="p-field image-upload-created">
                            <UploadFiles onFileChange={(e) => setEditedEvent({ ...editedEvent, image: e.files[0] })}/>
                        </div>
                        <div className="p-field div-target-created">
                            <InputNumber id="stock" value={editedEvent.stock}
                                         onValueChange={(e) => onInputNumberChange(e, 'stock')}
                                         placeholder="Enter stock quantity"/>
                        </div>
                    </div>
                    <Button type="submit" label="Submit" icon="pi pi-check" className="p-mt-2 btn-sub-created-event"/>
                </form>
            </Panel>
        </div>
    );
}

export default EditEvent;
