import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import {UseTokenUser} from '../../service/UseTokenUser';
import {Tag} from "primereact/tag";



export default function MyEventPast() {
    const [events, setEvents] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 767);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await UseTokenUser.getEventsPastForUser();
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
        <div className="card my-event-component" style={{ padding: '3rem' }}>
            <h2 className="text-center">My Events Past</h2>
            <Carousel value={events} numScroll={1}  numVisible={isMobile ? 1 : 3} orientation={isMobile ? "vertical" : "horizontal"} verticalViewPortHeight="400px" itemTemplate={eventTemplate} />
        </div>
    );
}
