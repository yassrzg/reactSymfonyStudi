import React, {useState, useEffect, useContext} from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Panel } from 'primereact/panel';
import {UserContext} from "../../Context/context";
import {ToastContext} from "../../Context/ToastContext";


export default function EventFormPurchase() {
    const [mainBuyer, setMainBuyer] = useState({ name: '', surname: ''});
    const [companions, setCompanions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const location = useLocation();
    const { state } = location;
    const { offerType, eventId, stock, price, PriceOffertDuo, PriceOffertFamille, date, location: eventLocation, EventName } = state || {};
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { showToast } = useContext(ToastContext);


    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        updatePrice();
    }, [companions.length]);

    useEffect(() => {
        if (!stock || stock <= 0) {
            showToast('error', 'Stock Unavailable', 'No spots available.');
            navigate('/');
        } else if (offerType === 'familiales' && stock < 4) {
            showToast('error', 'Insufficient Stock', 'Not enough spots available for a family offer.');
            navigate('/');
        } else if (offerType === 'duo' && stock < 2) {
            showToast('error', 'Insufficient Stock', 'Not enough spots available for a duo offer.');
            navigate('/');
        }

        if (stock < 10) {
            showToast('warn', 'Limited Spots', `Only ${stock} spots left!`);
        }

        updateCompanions();
        setMainBuyer({ name: user.name, surname: user.surname });
    }, [user, offerType, stock, navigate, showToast]);

    const updateCompanions = () => {
        let initialCompanions = [];
        if (offerType === 'familiales') {
            initialCompanions = Array(3).fill().map(() => ({ name: '', surname: '' }));
        } else if (offerType === 'duo') {
            initialCompanions = Array(1).fill().map(() => ({ name: '', surname: '' }));
        } else {
            initialCompanions = [];
        }
        setCompanions(initialCompanions);
    };

    const updatePrice = () => {
        let newPrice = price;
        if (offerType === 'single') {
            newPrice += companions.length * price;
        } else if (offerType === 'duo') {
            newPrice = PriceOffertDuo;
        } else if (offerType === 'familiales') {
            newPrice = PriceOffertFamille;
        }
        setTotalPrice(newPrice);
    };

    const handleSubmit = () => {
        if (!mainBuyer.name || !mainBuyer.surname ) {
            showToast('error', 'Validation Error', 'Please complete all fields for the main buyer.');
            return;
        }

        // Check if companion fields are filled out
        for (let i = 0; i < companions.length; i++) {
            if (!companions[i].name || !companions[i].surname ) {
                showToast('error', 'Validation Error', `Please complete all fields for companion ${i + 1}.`);
                return;
            }
        }

        navigate('/payment', { state: { mainBuyer, companions, eventId } });
    };

    const addCompanion = () => {
        if (companions.length < Math.floor(stock / 2) - 1) {
            const newCompanions = [...companions, { name: '', surname: '' }];
            setCompanions(newCompanions);
        } else {
            showToast('warn', 'Stock Limit', 'Cannot add more companions due to limited spots.');
        }
    };


    const handleCompanionChange = (e, index, field) => {
        const updatedCompanions = [...companions];
        updatedCompanions[index][field] = e.target.value;
        setCompanions(updatedCompanions);
    };
    const removeCompanion = (indexToRemove) => {
        const newCompanions = companions.filter((_, index) => index !== indexToRemove);
        setCompanions(newCompanions);
    };

    const changeOffer = (newOfferType) => {
        navigate('/event/form', {
            state: { offerType: newOfferType, eventId, stock, price, date, location: eventLocation, PriceOffertDuo, PriceOffertFamille, EventName }
        });
    };

    const priceTemplate = (rowData) => {
        return `${rowData.price} €`;
    };


    return (
        <div style={{padding: '1.5rem', width:'70%', height:'100%'}} id={'eventFormPurchase'}>

            <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <div className="p-grid p-fluid" style={{
                    backgroundColor: 'white',
                    gridGap: '1rem',
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr'
                }} id={'container-formPurchase'}>
                    <div className="p-col-12" id='main-User-Buyer'>
                        <Panel header="Principal Acheteur" style={{marginBottom:'1rem'}}>
                            <Card>
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col">
                                        <label htmlFor="mainBuyerName">Nom</label>
                                        <InputText id="mainBuyerName" value={user ? user.name : ''} disabled={!user}/>
                                    </div>
                                    <div className="p-field p-col">
                                        <label htmlFor="mainBuyerSurname">Prénom</label>
                                        <InputText id="mainBuyerSurname" value={user ? user.surname : ''} disabled={!user}/>
                                    </div>
                                    {/* Add more fields for main buyer */}
                                </div>
                            </Card>
                        </Panel>
                        <Panel header="Changer d'offres ?">
                            <Card>
                                <div className="p-fluid p-formgrid p-grid">
                                    {offerType !== 'single' &&
                                        <Button label="Change to Single Offer" onClick={() => changeOffer('single')}
                                                className="p-button-success"/>}
                                    {offerType !== 'duo' && stock >= 2 &&
                                        <Button label="Change to Duo Offer" onClick={() => changeOffer('duo')}
                                                className="p-button-success"/>}
                                    {offerType !== 'familiales' && stock >= 4 &&
                                        <Button label="Change to Familiale Offer" onClick={() => changeOffer('familiales')}
                                                className="p-button-success"/>}
                                </div>
                            </Card>
                        </Panel>
                    </div>

                    <div className="p-col-12">
                        <Panel header="Accompagnants">
                            {companions.map((companion, index) => (
                                <Card key={index} title={`Accompagnant ${index + 1}`}>
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col">
                                            <label htmlFor={`companionName${index}`}>Nom</label>
                                            <InputText id={`companionName${index}`} value={companion.name}
                                                       onChange={(e) => handleCompanionChange(e, index, 'name')}/>
                                        </div>
                                        <div className="p-field p-col">
                                            <label className='titleofCompanions' htmlFor={`companionSurname${index}`}>Prénom</label>
                                            <InputText id={`companionSurname${index}`} value={companion.surname}
                                                       onChange={(e) => handleCompanionChange(e, index, 'surname')}/>
                                        </div>
                                        {offerType === 'single' && (
                                            <div className="p-field p-col">
                                                <Button label={`Supprimer le compagnon ${index + 1}`} className="p-button-danger"
                                                        onClick={() => removeCompanion(index)} />

                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                            {offerType === 'single' && (
                                <Button label="Ajouter un accompagnant" onClick={addCompanion} className="p-button-secondary"/>
                            )}
                        </Panel>
                    </div>

                    <div className="p-col-12">
                        <Panel header={`Purchase Form for ${EventName} - ${date} at ${eventLocation}`}>
                            <DataTable value={[{ price: totalPrice, location: eventLocation, date, offerType, EventName }]} className="p-datatable-sm">
                                <Column field="EventName" header="Event Name"/>
                                <Column field="offerType" header="Offer Type"/>
                                <Column field="location" header="Location"/>
                                <Column field="date" header="Date"/>
                                <Column field="price" header="Price" body={priceTemplate}/>
                            </DataTable>
                            <Button label={`Proceed to Payment - ${totalPrice}€`} onClick={handleSubmit} className="p-button-rounded p-button-success"/>
                        </Panel>
                    </div>
                </div>

            </div>
        </div>
    )
        ;
}