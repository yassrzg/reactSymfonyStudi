import React, {useState, useEffect, useContext} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { EventService } from '../../../service/EventService';
import {ToastContext} from "../../../Context/ToastContext";
import { Tag } from 'primereact/tag';
import EventForm from './EventForm';
import { isPast, parseISO, format, parse } from 'date-fns';
import { MultiSelect } from 'primereact/multiselect';


export default function AdminEvent() {
    const [events, setEvents] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [displayCreateEventDialog, setDisplayCreateEventDialog] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [displayEditEventDialog, setDisplayEditEventDialog] = useState(false);
    const {showToast} = useContext(ToastContext);


    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await EventService.getEvents();
            setEvents(data.map(event => ({
                ...event,
                date: format(parse(event.date, 'dd/MM/yyyy HH:mm', new Date()), 'dd/MM/yy \'à\' HH:mm'),
                status: event.stockage === 0 || event.stockage === null ? 'OUTOFSTOCK' :
                    event.stockage < 15 ? 'LowStock' : 'InStock'
            })));
        } catch (error) {
            showToast('error', 'Error', 'Failed to load events');
        }
    };

    const handleSuccess = () => {
        fetchEvents(); // Refresh the list of events
        setDisplayCreateEventDialog(false); // Close the create dialog if it was open
        setDisplayEditEventDialog(false); // Close the edit dialog if it was open
        showToast('success', 'Success', 'Operation successful'); // Show success toast
    };


    const openEditDialog = (event) => {
        setEditingEvent(event);  // Schedule to update the editing event
        // No need to setDisplayEditEventDialog here; let useEffect handle it
        setDisplayEditEventDialog(true);
    };

    const onHideEditEventDialog = () => {
        setDisplayEditEventDialog(false);
    };

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
            <img src={`${process.env.REACT_APP_BASE_URL}/assets/${rowData.image}`} alt={rowData.name} style={{ width: '50px', height: '50px' }} />
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

    const priceOffertDuoBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span>{rowData.PriceOffertDuo} €</span>
            </React.Fragment>
        );
    };

    const priceOffertFamilleBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span>{rowData.PriceOffertFamille} €</span>
            </React.Fragment>
        );
    };

    const statusBodyTemplate = (rowData) => {
        let badgeClass;
        switch (rowData.status) {
            case 'LowStock':
                badgeClass = 'warning';
                break;
            case 'OUTOFSTOCK':
                badgeClass = 'danger';
                break;
            case 'INSTOCK':
            default:
                badgeClass = 'success';
                break;
        }

        return <Tag value={rowData.status} severity={badgeClass}></Tag>;
    };


    const categoriesBodyTemplate = (rowData) => {
        // Ensure rowData.category exists and is an object with a name property
        if (rowData.category && typeof rowData.category === 'object' && rowData.category.name) {
            return rowData.category.name;
        }
        return 'No category';
    };


    const actionBodyTemplate = (rowData) => (
        <React.Fragment>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-1 datePast btn-edit-admin" onClick={() => openEditDialog(rowData)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger datePast btn-delete-admin" onClick={() => confirmDeleteEvent(rowData)} />
        </React.Fragment>
    );

    const eventStatusIconTemplate = (rowData) => {
        const eventDateParts = rowData.date.split('/');
        const eventDate = new Date(eventDateParts[2], eventDateParts[1] - 1, eventDateParts[0]);

        const isEventPast = isPast(eventDate);

        return (
            <React.Fragment>
                {isEventPast ? (
                    <i className="pi pi-lock datePast" style={{color: 'red', fontSize:'1.8rem'}} title="Past Event"></i>
                ) : (
                    <i className="pi pi-calendar-plus datePast" style={{color: 'green', fontSize:'1.8rem'}} title="Upcoming Event"></i>
                )}
            </React.Fragment>
        );
    };

    const toggleColumnVisibility = (field) => {
        setColumns(cols => cols.map(col => {
            if (col.field === field) {
                return { ...col, visible: !col.visible };
            }
            return col;
        }));
    };

    const [columns, setColumns] = useState([
        { field: 'image', header: 'Image', bodyTemplate: imageBodyTemplate, visible: true },
        { field: 'name', header: 'Name', filter: true, sortable: true, visible: true },
        { field: 'date', header: 'Date', bodyTemplate: dateBodyTemplate, filter: true, sortable: true, visible: true },
        { field: 'location', header: 'Location', bodyTemplate: locationBodyTemplate, filter: true, sortable: true, visible: true },
        { field: 'Single Offre', header: 'Single Offre', bodyTemplate: priceBodyTemplate, filter: true, sortable: true, visible: true },
        { field: 'Offre Duo', header: 'Offre Duo', bodyTemplate: priceOffertDuoBodyTemplate, filter: true, sortable: true, visible: true },
        { field: 'Offre Familly', header: 'Offre Familly', bodyTemplate: priceOffertFamilleBodyTemplate, filter: true, sortable: true, visible: true },
        { field: 'categoriesEvents', header: 'Categories', bodyTemplate: categoriesBodyTemplate, visible: true },
        { field: 'status', header: 'Status', bodyTemplate: statusBodyTemplate, visible: true },
        { field: 'actions', header: 'Actions', bodyTemplate: actionBodyTemplate, visible: true }
    ]);

    const [selectedColumns, setSelectedColumns] = useState(columns.filter(col => col.visible).map(col => col.field));
    const columnOptions = columns.map(col => ({ label: col.header, value: col.field }));

    const handleColumnToggle = (e) => {
        setSelectedColumns(e.value);
        setColumns(cols => cols.map(col => ({
            ...col,
            visible: e.value.includes(col.field)
        })));
    };

    const panelHeaderTemplate = () => {
        return (
            <div className="p-text-center p-py-2 p-px-3" style={{fontWeight: 'bold'}}>Ajouter des colonnes</div>
        );
    };

    return (
        <div style={{width: '100%', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)'}} id="admin-panel">
            <div style={{display: 'flex', alignItems: 'self-end', padding: '1rem 5rem', justifyContent:'space-between'}} className='search-bar-admin-container'>
                <div className="" style={{display:'flex', flexDirection:'column', gridGap:'1rem', width:'100%'}}>
                    <InputText placeholder="Search event by name" value={globalFilter} onChange={onGlobalFilterChange}/>
                    <MultiSelect panelHeaderTemplate={panelHeaderTemplate} value={selectedColumns} options={columnOptions} onChange={handleColumnToggle}
                                 optionLabel="label" placeholder="Ajouter des collumns" display="chip"/>
                </div>
                <div>
                <Button label="ADD EVENT" icon="pi pi-plus" onClick={handleCreateEventClick}
                        className="p-button-success"/>
                </div>
            </div>
            <DataTable value={events} paginator rows={15} globalFilter={globalFilter} header="Liste des évènements">
                {columns.filter(col => col.visible).map(col => (
                    <Column key={col.field} field={col.field} header={col.header} body={col.bodyTemplate} sortable={col.sortable} filter={col.filter} />
                ))}
            </DataTable>
            <ConfirmDialog/>
            <Dialog visible={displayCreateEventDialog} onHide={onHideCreateEventDialog} header="Create Event" modal
                    style={{width: '50%'}}>
                <EventForm onSuccess={handleSuccess}/>
            </Dialog>
            <Dialog visible={displayEditEventDialog} onHide={onHideEditEventDialog} header="Edit Event" modal
                    style={{width: '50%'}}>
                <EventForm event={editingEvent} onSuccess={handleSuccess}/>
            </Dialog>
        </div>
    );
}
