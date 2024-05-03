import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import EventQrCodes from './QrCodeViewer';
import {UseTokenUser} from '../../service/UseTokenUser';



export default function MyEvent() {
    const [events, setEvents] = useState([]);
    const [displayModal, setDisplayModal] = useState(false); // State to handle modal visibility
    const [selectedQrCodeId, setSelectedQrCodeId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 767);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await UseTokenUser.getEventsForUser(); // Using the imported service function
                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);

    const eventTemplate = (event) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={`${process.env.REACT_APP_BASE_URL}/assets/${event.event.image}`} alt={event.event.eventName} className="w-6 shadow-2" style={{ height: '13rem' }}/>
                </div>
                <div>
                    <h4 className="mb-1">{event.event.eventName}</h4>
                    <p><i className="pi pi-calendar" style={{marginRight: '0.5em'}}></i>{event.event.eventDate}</p>
                    <p><i className="pi pi-map-marker" style={{marginRight: '0.5em'}}></i>{event.event.location}</p> {/* Corrected location access */}
                    {event.accompagnantNames.length > 0 && (
                        <div className="mt-2">
                            <i className="pi pi-users" style={{marginRight: '0.5em'}}></i>
                            <span><strong>{event.accompagnantNames.join(', ')}</strong> vous accompagne à cet évènement.</span>
                        </div>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button label="My QR Code" icon="pi pi-search" className="p-button-rounded"
                                onClick={() => {
                                    setSelectedQrCodeId(event.qrCodeId);
                                    setDisplayModal(true);
                                }} />
                    </div>
                </div>
            </div>
        );
    };

    const onHide = () => {
        setDisplayModal(false);
    };

    return (
        <div className="card my-event-component" style={{ padding: '3rem' }}>
            <h2 className="text-center">My Events</h2>
            <Carousel value={events} numScroll={1} numVisible={isMobile ? 1 : 3} orientation={isMobile ? "vertical" : "horizontal"} verticalViewPortHeight="400px" itemTemplate={eventTemplate} />
            <Dialog header="QR Code Details" visible={displayModal} style={{width: '50vw'}} modal onHide={onHide}>
                <EventQrCodes qrCodeId={selectedQrCodeId} /> {/* Pass qrCodeId prop */}
            </Dialog>
        </div>
    );
}

