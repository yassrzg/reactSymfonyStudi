import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import {useParams} from 'react-router-dom';

export default function DataQrCode() {
    const [qrData, setQrData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {tokenUrl} = useParams();

    useEffect(() => {
        const fetchQrData = async () => {// Assuming the token is a query parameter

            if (!tokenUrl) {
                console.error("No token provided!");
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://127.0.0.1:8000/api/get-data-qr-code/${tokenUrl}`);
                setQrData(response.data);
            } catch (error) {
                console.error("Failed to fetch QR data:", error);
            }
            setIsLoading(false);
        };

        fetchQrData();
    }, [tokenUrl]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!qrData) {
        return <div>No QR Code data available.</div>;
    }

    const { name, surname, eventLocation, eventDate, isUsed, eventName } = qrData;
    const eventDateFormatted = new Date(eventDate).toLocaleDateString('en-GB');
    const currentDate = new Date();
    const isExpired = new Date(eventDate) < currentDate;


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
            </Card>
        </div>
    );
}
