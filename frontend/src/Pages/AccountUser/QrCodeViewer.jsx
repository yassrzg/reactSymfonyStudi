import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import Cookies from 'js-cookie';
import QRCode from 'qrcode.react';
import { Tag } from 'primereact/tag'; // Make sure to import Tag

export default function EventQrCodes({ qrCodeId }) {
    const [qrItems, setQrItems] = useState([]);
    const [selectedQrItemDetails, setSelectedQrItemDetails] = useState(null);
    const [showDialog, setShowDialog] = useState(false);


    const isExpired = (eventDate) => {
        const today = new Date();
        const event = new Date(eventDate);
        return event < today;
    };
    const getSeverity = (qrItem) => {
        if (isExpired(qrItem.eventDate)) {
            return 'danger'; // Red for expired
        } else {
            return qrItem.isUsed ? 'danger' : 'success'; // Red for used, green for not used
        }
    };

    useEffect(() => {
        const fetchQrCodesForEvent = async () => {
            const token = Cookies.get('tokenStudiJo');
            try {
                const response = await axios.get(`https://127.0.0.1:8000/api/get-qrcode/${qrCodeId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = response.data;
                const baseUrl = "http://localhost:3000";

                const mainUserData = {
                    name: data.userFirstName,
                    lastname: data.userLastName,
                    qrValue: data.isUsed ? 'ALREADY USED' : `${baseUrl}/event/${encodeURIComponent(data.eventName)}/${encodeURIComponent(data.tokenUrl)}`,
                    isUsed: data.isUsed
                };

                const qrItemsUpdated = [mainUserData];

                data.accompagnants.forEach(acc => {
                    qrItemsUpdated.push({
                        name: acc.name,
                        lastname: acc.lastname,
                        qrValue: acc.isUsed ? 'ALREADY USED' : `${baseUrl}/event/${encodeURIComponent(data.eventName)}/${encodeURIComponent(acc.tokenUrl)}`,
                        isUsed: acc.isUsed
                    });
                });
                setQrItems(qrItemsUpdated);
            } catch (error) {
                console.error('Error fetching QR codes for event:', error);
            }
        };

        fetchQrCodesForEvent();
    }, [qrCodeId]);

    const qrCodeTemplate = (qrItem) => {
        const displayStatus = isExpired(qrItem.eventDate) ? 'EXPIRED' : (qrItem.isUsed ? 'ALREADY USED' : 'NOT USED');
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <QRCode value={qrItem.isUsed ? 'NO URL FOR USED QR' : qrItem.qrValue} size={200} />
                </div>
                <div>
                    <h4 className="mb-1">{qrItem.name}  {qrItem.lastname}</h4>
                    <Tag value={displayStatus} severity={getSeverity(qrItem)}></Tag>
                </div>
            </div>
        );
    };

    const renderQrItemDetailsDialog = () => {
        if (!selectedQrItemDetails) return null;

        return (
            <Dialog header="QR Code Details" visible={showDialog} onHide={() => setShowDialog(false)} style={{ width: 'auto' }}>
                <h3>QR Code URL</h3>
                <p>URL: {selectedQrItemDetails.isUsed ? 'This QR Code has already been used and cannot display a URL.' : selectedQrItemDetails.qrValue}</p>
            </Dialog>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <Carousel value={qrItems} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="360px"
                      itemTemplate={qrCodeTemplate} />
            {renderQrItemDetailsDialog()}
        </div>
    );
}
