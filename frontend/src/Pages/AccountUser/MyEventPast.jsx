import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Cookies from 'js-cookie';
import EventQrCodes from './QrCodeViewer'; // Import the EventQrCodes component
import {UseTokenUser} from '../../service/UseTokenUser';
import {Tag} from "primereact/tag";



export default function MyEventPast() {
    const [events, setEvents] = useState([]);

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await UseTokenUser.getEventsPastForUser(); // Using the imported service function
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
                    <img src={`/assets/${event.event.image}`} alt={event.event.eventName} className="w-6 shadow-2" style={{ height: '13rem' }}/>
                </div>
                <div>
                    <h4 className="mb-1">{event.event.eventName}</h4>
                    <p><i className="pi pi-calendar" style={{marginRight: '0.5em'}}></i>{event.event.eventDate}</p>
                    <p><i className="pi pi-map-marker" style={{marginRight: '0.5em'}}></i>{event.event.location}</p> {/* Corrected location access */}
                    {event.accompagnantNames.length > 0 && (
                        <div className="mt-2">
                            <i className="pi pi-users" style={{marginRight: '0.5em'}}></i>
                            <span><strong>{event.accompagnantNames.join(', ')}</strong> été avec vous à cet évènement.</span>
                        </div>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Tag value={'NON DISPONIBKE'} severity="danger"  />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card" style={{ padding: '3rem' }}>
            <h2 className="text-center">My Events Past</h2>
            <Carousel value={events} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={eventTemplate} />
        </div>
    );
}
