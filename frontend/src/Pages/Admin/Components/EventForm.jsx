import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { ToastContext } from "../../../Context/ToastContext";
import { EventService } from '../../../service/EventService';
import UploadFiles from './UploadFiles';

function EventForm({ event: initialEvent = null, onSuccess }) {
    const isNew = !initialEvent;  // Determines create or edit mode
    const [event, setEvent] = useState({
        name: initialEvent?.name || '',
        description: initialEvent?.description || '',
        date: initialEvent?.date || null,
        price: initialEvent?.price || null,
        price_famille: initialEvent?.price_famille || null,
        location: initialEvent?.location || '',
        image: initialEvent?.image || null,
        category: initialEvent?.category || null,
        stock: initialEvent?.stock || null
    });
    const [categories, setCategories] = useState([]);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const { showToast } = useContext(ToastContext);

    useEffect(() => {
        axios.get('https://127.0.0.1:8000/api/getCategories').then(response => {
            setCategories(response.data.map(cat => ({ label: cat.name, value: cat.id })));
        }).catch(error => {
            showToast('error', 'Error', 'Failed to fetch categories');
        });
    }, []);

    const closeDialog = () => setIsDialogVisible(false);  // This function closes the dialog

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || e.value;
        setEvent(prev => ({ ...prev, [name]: val }));
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || null;
        setEvent(prev => ({ ...prev, [name]: val }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(event).forEach(([key, value]) => {
            if (key === 'image' && value instanceof File) {
                formData.append(key, value, value.name);
            } else {
                formData.append(key, value);
            }
        });

        try {
            const response = isNew
                ? await EventService.createEvent(formData)
                : await EventService.updateEvent(event.id, formData);
            showToast('success', 'Success', `Event ${isNew ? 'created' : 'updated'} successfully`);
            onSuccess && onSuccess();  // Trigger any callback or closing action
        } catch (error) {
            showToast('error', 'Error', `Failed to ${isNew ? 'create' : 'update'} event`);
        }
    };

    return (
        <Dialog header={`${isNew ? 'Create' : 'Edit'} Event`} visible onHide={closeDialog}>
            <form className="p-fluid" onSubmit={onSubmit}>
                <div className={'input-create-event mb1'}>
                    <div className="p-field div-target-created">
                        <InputText placeholder="Event name" id="name" value={event.name}
                                   onChange={(e) => onInputChange(e, 'name')}/>
                    </div>
                    <div className="p-field div-target-created">
                        <Calendar id="date" value={event.date} onChange={(e) => onInputChange(e, 'date')}
                                  showIcon
                                  minDate={new Date()} dateFormat="dd/mm/yy"/>
                    </div>
                </div>
                <div className="p-field mb1">

                    <InputTextarea placeholder="Description of event" id="description" value={event.description}
                                   onChange={(e) => onInputChange(e, 'description')} rows={5}/>
                </div>
                <div className={'input-create-event mb1'}>
                    <div className="p-field div-target-created">
                        <label htmlFor="price">Price Formule DUO</label>
                        <InputNumber id="price" value={event.price}
                                     onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency"
                                     currency="EUR" locale="fr-FR" placeholder="0 €"/>
                    </div>

                    <div className="p-field div-target-created">
                        <label htmlFor="price_famille">Price Formule Famille</label>
                        <InputNumber id="price_famille" value={event.price_famille}
                                     onValueChange={(e) => onInputNumberChange(e, 'price_famille')} mode="currency"
                                     currency="EUR" locale="fr-FR" placeholder="0 €"/>
                    </div>
                </div>
                <div className={'input-create-event mb1'}>
                    <div className="p-field div-target-created">
                        <InputText id="location" value={event.location}
                                   onChange={(e) => onInputChange(e, 'location')}
                                   placeholder="Enter the Location of event"/>
                    </div>
                    <div className="p-field input-select-category-admin div-target-created">
                        <Dropdown inputId="category" value={event.category} options={categories}
                                  onChange={(e) => onInputChange(e, 'category')}
                                  placeholder="Select a Category"/>
                        <Button type="button" label="+"
                                className="p-button-rounded p-button-success p-ml-2 btn-created-event"
                                onClick={() => setIsDialogVisible(true)}/>
                    </div>
                </div>
                <div className={'input-create-event mb1 input-up-img-created'}>
                    <div className="p-field image-upload-created">
                        <UploadFiles onFileChange={(e) => setEvent({...event, image: e.files[0]})}/>
                    </div>
                    <div className="p-field div-target-created">
                        <InputNumber id="stock" value={event.stock}
                                     onValueChange={(e) => onInputNumberChange(e, 'stock')}
                                     placeholder="Enter stock quantity"/>
                    </div>
                </div>
                <Button type="submit" label="Submit" icon="pi pi-check" className="p-mt-2 btn-sub-created-event"/>
            </form>
        </Dialog>
    );
}

export default EventForm;
