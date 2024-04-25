import React, {useState, useEffect, useRef, useContext} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { EventService } from '../../service/EventService';
import CreateEvent from './Components/CreateEvent';
import {ToastContext} from "../../Context/ToastContext";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function Admin() {
    const [events, setEvents] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [displayCreateEventDialog, setDisplayCreateEventDialog] = useState(false);
    const {showToast} = useContext(ToastContext);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await EventService.getEvents();
            setEvents(data.map(event => ({
                ...event,
                date: new Date(event.date).toLocaleDateString('en-GB')
            })));
        };
        fetchEvents();
    }, []);

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
    };

    const handleCreateEventClick = () => {
        setDisplayCreateEventDialog(true);
    };

    const onHideCreateEventDialog = () => {
        setDisplayCreateEventDialog(false);
    };

    const deleteEvent = async (rowData) => {
        try {
            await EventService.deleteEventById(rowData.id);
            setEvents(prevEvents => prevEvents.filter(event => event.id !== rowData.id));
            showToast('success', 'Success', 'Event deleted successfully', 3000);
        } catch (error) {
            console.error('Failed to delete event:', error);
            showToast('error', 'Error', 'Failed to delete event', 3000);
        }
    };

    const confirmDeleteEvent = (rowData) => {
        console.log('Attempting to open confirm dialog for:', rowData);
        confirmDialog({
            message: `Are you sure you want to delete the event "${rowData.name}"?`,
            header: 'Confirmation Required',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteEvent(rowData),
            reject: () => {
                showToast('warn', 'Operation Cancelled', 'No changes were made.', 3000);
            },
        });
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <img src={`/assets/${rowData.image}`} alt={rowData.name} style={{ width: '50px', height: '50px' }} />
        );
    };

    const dateBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <i className="pi pi-calendar mr-1"></i>
                <span>{rowData.date}</span>
            </React.Fragment>
        );
    };

    const locationBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <i className="pi pi-map-marker mr-1"></i>
                <span>{rowData.location}</span>
            </React.Fragment>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span>{rowData.price} €</span>
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData) => (
        <React.Fragment>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-1" onClick={() => console.log('Editing event', rowData)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteEvent(rowData)} />
        </React.Fragment>
    );


    return (
        <div style={{width:'80%', boxShadow:'0px 0px 10px rgba(0,0,0,0.2)'}} id="admin-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start', padding:'1rem 5rem', gridGap:'3rem'}}>
                <div className="p-inputgroup">
                    <InputText placeholder="Search by name" value={globalFilter} onChange={onGlobalFilterChange}/>
                </div>
                <Button label="ADD EVENT" icon="pi pi-plus" onClick={handleCreateEventClick} className="p-button-success" />
            </div>
            <DataTable value={events} paginator rows={15} globalFilter={globalFilter} header="Liste des évènements" style={{textAlign:'center', fontSize:'1.5rem'}}>
                <Column field="image" header="Image" body={imageBodyTemplate} style={{paddingLeft:'4rem'}}/>
                <Column field="name" header="Name" sortable filter />
                <Column field="date" header="Date" sortable filter body={dateBodyTemplate} />
                <Column field="location" header="Location" sortable filter body={locationBodyTemplate} />
                <Column field="price" header="Price" sortable filter body={priceBodyTemplate} />
                <Column body={actionBodyTemplate} header="Actions" />
            </DataTable>
            <ConfirmDialog/>
            <Dialog visible={displayCreateEventDialog} onHide={onHideCreateEventDialog} header="Create Event" modal style={{width:'50%'}}>
                <CreateEvent />
            </Dialog>
        </div>
    );
}
