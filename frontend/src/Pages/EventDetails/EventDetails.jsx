import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import {useNavigate, useParams} from 'react-router-dom';
import { EventService } from "../../service/EventService";

export default function FullPageEventDetail() {
    const [event, setEvent] = useState(null);
    const [error, setError] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const [selectedOffer, setSelectedOffer] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const allEvents = await EventService.getEvents();
                const eventId = id.toString(); // Ensuring type consistency
                const foundEvent = allEvents.find(event => event.id.toString() === eventId);
                if (foundEvent) {
                    setEvent(foundEvent);
                } else {
                    setError('Event not found');
                }
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Failed to fetch event details');
            }
        };

        fetchEvent();
    }, [id]); // Dependency array ensures the effect runs only when id changes

    const redirectToPurchase = (offerType) => {
        setSelectedOffer(offerType);
        // Redirect to the purchase form page with the selected offer
        navigate(`/event/${id}/purchase?offer=${offerType}`);
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!event) {
        return <p>Loading event details...</p>;
    }

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(date);
        } catch {
            return 'Invalid date';
        }
    };

    const header = (
        <Image
            alt={event.name}
            src={`/assets/${event.image}`}
            onError={(e) => e.target.src='https://via.placeholder.com/400'}
            style={{ width: '5rem', height: '5rem' }}  // Set image width and height to 5rem
            preview
        />
    );

    // Prices for offers
    const priceDuo = event.price ? (event.price * 2).toFixed(2) : 'N/A';
    const priceFamily = event.price ? (event.price * 4).toFixed(2) : 'N/A';

    return (
        <Panel header={header} style={{width: '40vw', height: '70vh', overflow: 'auto'}} id={"container-fullDetails"}>
            <h2>{event.name}</h2>
            <p><strong><i className="pi pi-calendar" style={{marginRight: '0.5em'}}></i>{formatDate(event.date)}
            </strong></p>
            <div className="p-d-flex align-items-center" style={{display:'flex', alignItems:'center', alignContent:'center'}}>
                <i className="pi pi-info-circle" style={{marginRight: '0.5em', fontSize: '1.2em'}}></i>
                <p style={{whiteSpace: 'pre-wrap'}}>{event.description}</p>
            </div>

            <div><i className="pi pi-map-marker" style={{marginRight: '0.5em'}}></i>{event.location}</div>
            <div><strong>Price:</strong> {event.price ? event.price.toFixed(2) : 'N/A'} €</div>
            <div className="p-d-flex p-jc-between p-ai-center" style={{display:'flex', justifyContent:'center', gridGap:'2rem'}}>
                <Button label={`Offer Duo (2) - ${priceDuo}€`} icon="pi pi-users" className="p-button-info" style={{display:'flex', justifyContent:'center', gridGap:'2rem', flexDirection:'column'}} onClick={() => redirectToPurchase('duo')}/>
                <Button label={`Offer Familiales (4) - ${priceFamily}€`} icon="pi pi-users" className="p-button-warning" style={{display:'flex', justifyContent:'center', gridGap:'2rem', flexDirection:'column'}} onClick={() => redirectToPurchase('familiales')}/>
            </div>
        </Panel>
    );
}
