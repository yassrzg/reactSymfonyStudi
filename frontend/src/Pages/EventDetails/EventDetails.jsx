import React, { useState, useEffect, useContext } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { EventService } from "../../service/EventService";
import { ToastContext } from "../../Context/ToastContext";
import { UserContext } from "../../Context/context";
import { format, parse } from 'date-fns';

const parseCustomDate = (dateString) => {
    return parse(dateString, 'dd/MM/yyyy HH:mm', new Date());
};

export default function FullPageEventDetail() {
    const [event, setEvent] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedOffer, setSelectedOffer] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { showToast } = useContext(ToastContext);
    const { user } = useContext(UserContext);
    const location = useLocation();
    const { state: { productId, productCategory } = {} } = location;

    useEffect(() => {
        if (!user) {
            showToast('warn', 'Non connecté', "Attention, vous devez vous connecter pour continuer l'achat du billet");
        }

        const fetchEvent = async () => {
            try {
                const allEvents = await EventService.getEvents();
                const eventId = productId.toString();
                const foundEvent = allEvents.find(event => event.id.toString() === eventId);
                if (foundEvent) {
                    setEvent(foundEvent);
                } else {
                    showToast('error', 'Event Not Found', 'No event disponible');
                }
            } catch (err) {
                console.error('Error fetching events:', err);
                showToast('error', 'Fetch Error', 'Failed to fetch event details.');
            }
        };

        fetchEvent();
    }, [productId, showToast]);

    const redirectToPurchase = (offerType) => {
        if (user) {
            setSelectedOffer(offerType);
            navigate('/event/form', {
                state: {
                    offerType, eventId: productId, stock: event.stockage, location: event.location,
                    price: event.price, PriceOffertDuo: event.PriceOffertDuo, PriceOffertFamille: event.PriceOffertFamille,
                    date: formatDate(event.date), EventName: event.name
                }
            });
        } else {
            setShowLoginModal(true);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    if (!event) {
        return <p>Loading event details...</p>;
    }

    const formatDate = (dateString) => {
        try {
            const date = parseCustomDate(dateString);
            return format(date, 'dd/MM/yy \'à\' HH\'h\'mm');
        } catch (error) {
            console.error("Failed to format date:", error);
            return 'Invalid date';
        }
    };

    const disableDuo = event.stockage < 2;
    const disableFamille = event.stockage < 4;
    const disableAllOffers = event.stockage === 0;

    const header = (
        <Image
            alt={event.name}
            src={`${process.env.REACT_APP_BASE_URL}/assets/${event.image}`}
            style={{ width: '5rem', height: '5rem' }}
            preview
        />
    );

    return (
        <Panel header={header} id={"container-fullDetails"}>
            <h2 className="text-2xl font-bold text-gray-800">{event.name}</h2>
            <p className="text-sm text-gray-500"><i className="pi pi-calendar mr-2"></i>{formatDate(event.date)}</p>
            <p className="text-sm text-gray-500 mt-2"><i className="pi pi-map-marker mr-2"></i>{event.location}</p>
            <p className="mt-4 text-gray-700">{event.description}</p>
            <div className="p-d-flex p-jc-between p-ai-center container-fullDetails-btn"
                 style={{ display: 'flex', justifyContent: 'center', gridGap: '2rem' }}>
                <Button label={`Single - ${event.price}€`} icon="pi pi-user"
                        onClick={() => redirectToPurchase('single')} disabled={disableAllOffers} />
                <Button label={`Duo (2) - ${event.PriceOffertDuo}€`} icon="pi pi-users"
                        onClick={() => redirectToPurchase('duo')} disabled={disableDuo || disableAllOffers} />
                <Button label={`Familiales (4) - ${event.PriceOffertFamille}€`} icon="pi pi-users"
                        onClick={() => redirectToPurchase('familiales')} disabled={disableFamille || disableAllOffers} />
            </div>

            <Dialog header="Connectez-vous ou inscrivez-vous" visible={showLoginModal} onHide={() => setShowLoginModal(false)}>
                <p>Veuillez vous connecter ou vous inscrire pour continuer.</p>
                <div className="p-d-flex p-jc-between p-ai-center" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button label="Se connecter" onClick={handleLoginRedirect} />
                    <Button label="S'inscrire" onClick={handleRegisterRedirect} />
                </div>
            </Dialog>
        </Panel>
    );
}
