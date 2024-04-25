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
    const [mainBuyer, setMainBuyer] = useState({ name: '', surname: '', email: '' });
    const [companions, setCompanions] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const location = useLocation();
    const offerType = new URLSearchParams(location.search).get('offer');
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { showToast } = useContext(ToastContext);

    // Initialize companions based on the offer type
    useEffect(() => {
        if (offerType === 'familiales') {
            setCompanions([{ name: '', surname: '', email: '' }, { name: '', surname: '', email: '' }, { name: '', surname: '', email: '' }]);
        } else if (offerType === 'duo') {
            setCompanions([{ name: '', surname: '', email: '' }]);
        }
    }, [offerType]);

    const handleSubmit = () => {
        for (let i = 0; i < companions.length; i++) {
            if (!companions[i].name || !companions[i].surname || !companions[i].email) {
                showToast('error', 'Validation Error', `Please complete all fields for companion ${i + 1}.`);
                return;
            }
        }

        // Check if payment method is selected
        if (!paymentMethod) {
            showToast('error', 'Validation Error', 'Please select a payment method.');
            return;
        }

        navigate('/payment', { state: { mainBuyer: user, companions, paymentMethod } });
    };

    // const addCompanion = () => {
    //     setCompanions([...companions, { name: '', surname: '', email: '' }]);
    // };

    // const handleMainBuyerChange = (e, field) => {
    //     setMainBuyer({ ...mainBuyer, [field]: e.target.value });
    // };

    const handleCompanionChange = (e, index, field) => {
        const updatedCompanions = [...companions];
        updatedCompanions[index][field] = e.target.value;
        setCompanions(updatedCompanions);
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
                <div className="p-col-12">
                    <Panel header="Principal Acheteur">
                        <Card>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="mainBuyerName">Nom</label>
                                    <InputText id="mainBuyerName" value={user ? user.name : ''} disabled={!user} />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="mainBuyerSurname">Prénom</label>
                                    <InputText id="mainBuyerSurname" value={user ? user.surname : ''} disabled={!user} />
                                </div>
                                {/* Add more fields for main buyer */}
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
                                        <label htmlFor={`companionSurname${index}`}>Prénom</label>
                                        <InputText id={`companionSurname${index}`} value={companion.surname}
                                                   onChange={(e) => handleCompanionChange(e, index, 'surname')}/>
                                    </div>
                                    {/* Add more fields for each companion */}
                                </div>
                            </Card>
                        ))}
                    </Panel>
                </div>

                <div className="p-col-12">
                    <Panel header="Historique de l'achat">
                        <Card>
                            <DataTable value={[{offerType, location: 'Location', date: 'Date', price: 'Price'}]}
                                       className="p-datatable-sm">
                                <Column field="offerType" header="Type d'offre"/>
                                <Column field="location" header="Localisation"/>
                                <Column field="date" header="Date"/>
                                <Column field="price" header="Prix"/>
                            </DataTable>
                        </Card>
                    </Panel>


                    <Panel header="Méthode de Paiement">
                        <Card>
                            <Dropdown value={paymentMethod} options={[{label: 'Carte de Crédit', value: 'creditCard'}]}
                                      onChange={(e) => setPaymentMethod(e.value)}
                                      placeholder="Sélectionner une méthode de paiement"/>
                        </Card>
                    </Panel>


                </div>
            </div>
            <div className="p-col-12" id={'btn-form-offert'}>
                <Panel style={{display:'flex', justifyContent:'center'}}>
                    <Button label="Aller au Paiement" onClick={handleSubmit} />
                </Panel>
            </div>
        </div>
    </div>
)
    ;
}