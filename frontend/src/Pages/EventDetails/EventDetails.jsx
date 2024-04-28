import React, {useState, useEffect, useContext} from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import {useNavigate, useParams} from 'react-router-dom';
import { EventService } from "../../service/EventService";
import { ToastContext } from "../../Context/ToastContext";
import { useLocation } from 'react-router-dom';

export default function FullPageEventDetail() {
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const [selectedOffer, setSelectedOffer] = useState('');
    const { showToast } = useContext(ToastContext);
    const location = useLocation();
    const { state: { productId } = {} } = location;


    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const allEvents = await EventService.getEvents();
                const eventId = productId.toString(); // Ensuring type consistency
                const foundEvent = allEvents.find(event => event.id.toString() === eventId);
                if (foundEvent) {
                    setEvent(foundEvent);
                } else {
                    showToast('error', 'Event Not Found', 'No event disponible'); // Show error toast
                }
            } catch (err) {
                console.error('Error fetching events:', err);
                showToast('error', 'Fetch Error', 'Failed to fetch event details.'); // Show error toast
            }
        };

        fetchEvent();
    }, [id, showToast]); // Dependency array ensures the effect runs only when id changes

    const redirectToPurchase = (offerType) => {
        setSelectedOffer(offerType);
        // Redirect to the purchase form page with the selected offer and event id in state
        navigate('/event/form', { state:
                { offerType,
                    eventId: productId,
                    stock: event.stockage,
                    location: event.location,
                    price: event.price,
                    PriceOffertDuo: event.PriceOffertDuo,
                    PriceOffertFamille: event.PriceOffertFamille,
                    date: formatDate(event.date),
                    EventName: event.name
                } });
    };


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

    const disableDuo = event.stockage < 2;
    const disableFamille = event.stockage < 4;
    const disableAllOffers = event.stockage === 0;

    const header = (
        <Image
            alt={event.name}
            src={`/assets/${event.image}`}
            onError={(e) => e.target.src='https://via.placeholder.com/400'}
            style={{ width: '5rem', height: '5rem' }}  // Set image width and height to 5rem
            preview
        />
    );

    return (
        <Panel header={header} style={{width: '40vw', height: '70vh', overflow: 'auto'}} id={"container-fullDetails"}>
            <h2 className="text-2xl font-bold text-gray-800">{event.name}</h2>
            <p className="text-sm text-gray-500"><i className="pi pi-calendar mr-2"></i>{formatDate(event.date)}</p>
            <p className="text-sm text-gray-500 mt-2"><i className="pi pi-map-marker mr-2"></i>{event.location}</p>
            <p className="mt-4 text-gray-700">{event.description}</p>
            <div className="p-d-flex p-jc-between p-ai-center"
                 style={{display: 'flex', justifyContent: 'center', gridGap: '2rem'}}>
                <Button label={`Single - ${event.price}€`} icon="pi pi-user"
                        onClick={() => redirectToPurchase('single')} disabled={disableAllOffers}/>
                <Button label={`Duo (2) - ${event.PriceOffertDuo}€`} icon="pi pi-users"
                        onClick={() => redirectToPurchase('duo')} disabled={disableDuo || disableAllOffers}/>
                <Button label={`Familiales (4) - ${event.PriceOffertFamille}€`} icon="pi pi-users"
                        onClick={() => redirectToPurchase('familiales')} disabled={disableFamille || disableAllOffers}/>
            </div>
        </Panel>
    );
}
