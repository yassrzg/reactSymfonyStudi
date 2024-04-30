import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import {useParams} from 'react-router-dom';
import { QrCodeService } from '../../service/QrCodeService';
import { ToastContext } from '../../Context/ToastContext';

export default function DataQrCode() {
    const [qrData, setQrData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {tokenUrl} = useParams();
    const { showToast } = useContext(ToastContext);

    useEffect(() => {
        const fetchQrData = async () => {
            if (!tokenUrl) {
                setIsLoading(false);
                return;
            }
            try {
                const response = await QrCodeService.fetchQrData(tokenUrl);
                const data = response.data;
                const currentDate = new Date();
                const eventDate = new Date(data.eventDate);
                const isExpired = eventDate < currentDate;

                setQrData(data);
                if (isExpired) {
                    showToast('error', 'Ticket Status', 'Your billet is expired');
                } else {
                    // Calculate days left before the event
                    const daysLeft = Math.ceil((eventDate - currentDate) / (1000 * 60 * 60 * 24));
                    const daysText = daysLeft === 1 ? 'day' : 'days';
                    showToast('info', 'Event Countdown', `You have ${daysLeft} ${daysText} left until the event.`);
                }
            } catch (error) {
                showToast('error', 'Error', 'Failed to fetch QR data');
            } finally {
                setIsLoading(false); // Ensuring isLoading is set to false regardless of success or error
            }
        };

        fetchQrData();
    }, [tokenUrl, showToast]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!qrData) {
        return <div>No QR Code data available.</div>;
    }

    const { name, surname, eventLocation, eventDate, times, isUsed, eventName, mainUser, type } = qrData;
    const eventDateFormatted = new Date(eventDate).toLocaleDateString('en-GB');
    const currentDate = new Date();
    const isExpired = new Date(eventDate) < currentDate;
    const purchaseDate = new Date(times);
    const purchaseDateFormatted = purchaseDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const purchaseTimeFormatted = purchaseDate.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });


    return (
        <div>
            <Card title={eventName} style={{width: '25em', marginBottom: '2em'}}>
                <h3><i className="pi pi-user" style={{'marginRight': '4px'}}></i> {name} {surname}</h3>
                <p><i className="pi pi-map-marker" style={{
                    'verticalAlign': 'middle',
                    'marginRight': '4px'
                }}></i><strong>Location:</strong> {eventLocation}</p>
                <p><i className="pi pi-calendar" style={{
                    'verticalAlign': 'middle',
                    'marginRight': '4px'
                }}></i><strong>Date:</strong> {eventDateFormatted}</p>
                <p><strong>Status:</strong> {isExpired ?
                    <span style={{color: 'red'}}>EXPIRED</span> :
                    <Tag value={isUsed ? 'USED' : 'NOT USED'} severity={isUsed ? 'danger' : 'success'}
                         icon={isUsed ? 'pi pi-times' : 'pi pi-check'}/>}
                </p>
                <p><strong>Acheté le:</strong> {purchaseDateFormatted} à {purchaseTimeFormatted}</p>
                {mainUser && (
                    <p><strong>Titulaire de l'achat: </strong>{mainUser}</p>
                )}
                <h3>Catégorie: {type}</h3>
            </Card>
        </div>
    );
}
