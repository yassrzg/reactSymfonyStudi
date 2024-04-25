import React, {useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import CreateCategory from './CreateCategory'; // Ensure this component calls the onSuccess prop after successful category creation
import { ToastContext } from "../../../Context/ToastContext";
import { Panel } from 'primereact/panel';
import UploadFiles from './UploadFiles';

import '../css/createEvent.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function CreateEvent() {
    const initialEventState = {
        name: '',
        description: '',
        date: null,
        price: null,
        price_famille: null,
        location: '',
        image: null,
        category: null
    };

    const [event, setEvent] = useState(initialEventState);
    const [categories, setCategories] = useState([]);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const { showToast } = useContext(ToastContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/getCategories');
            setCategories(response.data.map(cat => ({ label: cat.name, value: cat.id })));
        } catch (error) {
            showToast('error', 'Error', 'Failed to fetch categories');
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || e.value;
        setEvent({ ...event, [name]: val });
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || null;
        setEvent({ ...event, [name]: val });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        if (!event.name || !event.description || !event.date || !event.price || !event.location || !event.image) {
            showToast('error', 'Error Message', 'All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('name', event.name);
        formData.append('description', event.description);
        formData.append('date', event.date.toISOString());
        formData.append('price', event.price);
        formData.append('location', event.location);
        formData.append('image', event.image);
        formData.append('category', event.category);
        formData.append('price_famille', event.price_famille);

        try {
            await axios.post('https://127.0.0.1:8000/api/setEvent', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            showToast('success', 'Success', 'Event created successfully');
            setSubmitted(true);
            onReset();
        } catch (error) {
            showToast('error', 'Error', 'Failed to create event');
        }
    };

    const onReset = () => {
        setEvent(initialEventState);
        setSubmitted(false);
    };

    const onHide = () => setSubmitted(false);

    const onCreateCategorySuccess = (newCategory) => {
        // Update the categories array with the new category
        setCategories(prevCategories => [...prevCategories, { label: newCategory.name, value: newCategory.id }]);
        fetchCategories(); // Optionally refetch categories list or just append new one
    };

    return (
        <div>
            <Dialog visible={submitted} style={{ width: '450px' }} header="Confirmation" modal onHide={onHide}>
                <p>The event "{event.name}" has been created successfully!</p>
            </Dialog>
            <Dialog visible={isDialogVisible} onHide={() => setIsDialogVisible(false)} header="Create Category" modal>
                <CreateCategory onSuccess={onCreateCategorySuccess} />
            </Dialog>
            <Panel header="Create New Event" style={{ marginBottom: '2em' }}> {/* Use Panel to wrap the form */}
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
                            <label htmlFor="price">Price Formule Famille</label>
                            <InputNumber id="price" value={event.price}
                                         onValueChange={(e) => onInputNumberChange(e, 'price_famille')} mode="currency"
                                         currency="EUR" locale="fr-FR" placeholder="0 €"/>
                        </div>
                    </div>
                    <div className="p-field mb1 image-upload-created">
                        <UploadFiles onFileChange={(e) => setEvent({...event, image: e.files[0]})}/>
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
                    <Button type="submit" label="Submit" icon="pi pi-check" className="p-mt-2"/>
                </form>
            </Panel>
        </div>
    );
}

export default CreateEvent;
