import React, { useState, useEffect, useContext } from 'react';
import { Panel } from 'primereact/panel';
import { useNavigate, useLocation } from 'react-router-dom';
import { EventService } from "../../service/EventService";
import { ToastContext } from "../../Context/ToastContext";
import { UserContext } from "../../Context/context";
import { format, parse, isFuture } from 'date-fns';
import {Button} from "primereact/button";
import {Card} from "primereact/card";

const parseCustomDate = (dateString) => {
    return parse(dateString, 'dd/MM/yyyy HH:mm', new Date());
};

export default function SameEventCategories() {
    const [eventsByCategory, setEventsByCategory] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();
    const { showToast } = useContext(ToastContext);
    const location = useLocation();
    const { state: { productId, productCategory } = {} } = location;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const categoryWithEvents = await EventService.getEventByCategoriesId(productCategory);
                if (categoryWithEvents && categoryWithEvents.events.length > 0) {
                    setCategoryName(categoryWithEvents.name);
                    const futureEvents = categoryWithEvents.events.filter(event =>
                        isFuture(parseCustomDate(event.date))
                    );
                    const sortedEvents = futureEvents.sort((a, b) => parseCustomDate(a.date) - parseCustomDate(b.date));
                    const filteredEvents = sortedEvents.filter(event => event.id !== productId);
                    setEventsByCategory(filteredEvents);
                } else {
                    setEventsByCategory([]); // Set to empty array if no events
                    setCategoryName(categoryWithEvents.name || 'Unknown Category');
                }
            } catch (err) {
                console.error('Error fetching events:', err);
                showToast('error', 'Fetch Error', 'Failed to fetch event details.');
                setEventsByCategory([]);
                setCategoryName('Error Loading Category');
            }
        };

        if (productCategory) {
            fetchEvents();
        } else {
            showToast('warn', 'Missing Data', 'No category provided for fetching events.');
            navigate('/');
        }
    }, [productCategory, productId, navigate, showToast]);

    if (eventsByCategory.length === 0) {
        return;
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

    const handleViewMore = (event) => {
        const urlTitle = event.name.replace(/[\s\/]+/g, '-').toLowerCase(); // Converts spaces to dashes, makes lowercase
        navigate(`/event/${urlTitle}`, { state: { productId: event.id, productCategory: productCategory }});
    };
    const getInventoryStatus = (stock) => {
        if (stock > 40) {
            return 'Disponible';
        } else if (stock <= 40 && stock > 0) {
            return `Encore ${stock} places`;
        } else {
            return 'Complet';
        }
    };
    const renderHeader = (event) => {
        return (
            <div className='container-header-event-detail'>
                {event.name}
                <span className="p-tag p-tag-rounded"
                      style={{
                          marginLeft: '10px',
                          backgroundColor: event.stockage > 40 ? '#34A853' : event.stockage > 0 ? '#FFC107' : '#FF4842'
                      }}>
                    {getInventoryStatus(event.stockage)}
                </span>
            </div>
        );
    };

    return (
        <Card style={{height: 'fit-content'}}>
            <span className="block text-4xl font-bold mb-1">Vous êtes fans de <strong>{categoryName}</strong> ?</span>
            <div className="text-4xl text-primary font-bold mb-3">Vous aimeriez également :</div>
            <div className='container-event-category-page'>
                {eventsByCategory.map(event => (
                    <Panel key={event.id} header={renderHeader(event)}>
                        <div>
                            <img
                                className="w-9 sm:w-16rem xl:w-20rem shadow-2 block xl:block mx-auto border-round img-homepage-responsive"
                                src={`${process.env.REACT_APP_BASE_URL}/assets/${event.image}`}
                                alt={event.name}
                                style={{height: '12rem'}}
                            />
                        </div>
                        <div
                            className="flex flex-column align-items-center sm:align-items-start gap-3 container-date-location-fullPage"
                            style={{height: '100%'}}>
                            <div className="text-md" style={{height: '33%', display: 'flex'}}>
                                <i className="pi pi-calendar mr-1"></i>
                                {formatDate(event.date)}
                            </div>
                            <div>
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-map-marker"></i>
                                    <span className="font-semibold">{event.location}</span>
                                </span>
                            </div>
                        </div>
                        <div className='container-btn-detail-form-fullPage'>
                            <Button icon="pi pi-shopping-cart btn-detail-form-fullPage"
                                    className="p-button-rounded p-button-info"
                                    onClick={() => handleViewMore(event)} disabled={event.stockage === 0}/>
                        </div>
                    </Panel>
                ))}
            </div>
        </Card>
    );
}
