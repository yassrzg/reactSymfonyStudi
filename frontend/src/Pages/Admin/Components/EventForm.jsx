import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { ToastContext } from "../../../Context/ToastContext";
import { EventService } from '../../../service/EventService';
import { Panel } from 'primereact/panel';
import UploadFiles from './UploadFiles';
import CreateCategory from "./CreateCategory";

function EventForm({ event: initialEvent = null, onSuccess, onHide }) {
    const isNew = !initialEvent;  // Determines create or edit mode
    const [event, setEvent] = useState({
        id: initialEvent?.id || null,
        name: initialEvent?.name || '',
        description: initialEvent?.description || '',
        date: initialEvent?.date ? parseDateString(initialEvent.date) : new Date(),
        price: initialEvent?.price || null,
        price_famille: initialEvent?.PriceOffertFamille || null,
        price_duo: initialEvent?.PriceOffertDuo || null,
        location: initialEvent?.location || '',
        image: initialEvent?.image || null,
        category: initialEvent?.category.id || null,
        stock: initialEvent?.stockage || null
    });
    const [categories, setCategories] = useState([]);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const { showToast } = useContext(ToastContext);


    function parseDateString(dateStr) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
        return new Date(); // return current date if parsing fails
    }


    useEffect(() => {
        fetchCategories();
    }, []);


    const fetchCategories = async () => {
        try {
            const categoriesData = await EventService.getCategories();
            setCategories(categoriesData);
        } catch (error) {
            showToast('error', 'Error', 'Failed to fetch categories');
        }
    };



// Update your onInputChange to handle the date as a Date object
    const onInputChange = (e, name) => {
        if (name === 'date' && e.value) {
            // Directly use the Date object, do not convert to string here
            setEvent(prev => ({ ...prev, [name]: e.value }));
        } else {
            const val = e.target ? e.target.value : e.value;
            setEvent(prev => ({ ...prev, [name]: val }));
        }
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
                if (key === 'date' && value instanceof Date) {
                    formData.append(key, value.toISOString()); // Convert Date to ISO string
                } else {
                    formData.append(key, value);
                }
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

    const onCreateCategorySuccess = (newCategory) => {
        setCategories(prevCategories => [...prevCategories, { label: newCategory.name, value: newCategory.id }]);
        fetchCategories();
    };


    return (
        <div>

            <Dialog visible={isDialogVisible} onHide={() => setIsDialogVisible(false)} header="Create Category" modal>
                <CreateCategory onSuccess={onCreateCategorySuccess} />
            </Dialog>
            <Panel header={`${isNew ? 'Create' : 'Edit'} Event`} >
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
                    <div className={'input-create-event-price mb1'}>
                        <div className="p-field div-target-created">
                            <label htmlFor="price">Price Single</label>
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
                        <div className="p-field">
                            <label htmlFor="price_duo">Price Formule DUO</label>
                            <InputNumber id="price_duo" value={event.price_duo}
                                         onValueChange={(e) => onInputNumberChange(e, 'price_duo')} mode="currency"
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
                            <UploadFiles onFileChange={(e) => setEvent({...event, image: e.files[0]})} />
                        </div>
                        <div className="p-field div-target-created">
                            <InputNumber id="stock" value={event.stock}
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

export default EventForm;
