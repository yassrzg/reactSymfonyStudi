import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import QRCode from 'qrcode.react';
import { Tag } from 'primereact/tag';
import { UseTokenUser } from '../../service/UseTokenUser';

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
            return 'danger';
        } else {
            return qrItem.isUsed ? 'danger' : 'success';
        }
    };

    useEffect(() => {
        const fetchQrCodes = async () => {
            if (!qrCodeId) return;

            try {
                const qrData = await UseTokenUser.getQrCodesForEvent(qrCodeId);
                setQrItems(qrData);
            } catch (error) {
                console.error('Failed to fetch QR codes:', error);
            }
        };

        fetchQrCodes();
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
