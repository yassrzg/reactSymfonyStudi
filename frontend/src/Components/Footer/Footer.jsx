import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Link} from "react-router-dom";

export default function FooterPage() {

    const handleContactClick = () => {
        window.location.href = "mailto:studiJo@studiJo.com?subject=Contact%20Us";
    };

    return(
        <footer>
            <Card className="p-p-3 p-d-flex p-jc-between p-ai-center footer fixed-bottom" style={{ backgroundColor: '#333', color: '#fff', marginTop: 'auto', borderRadius:'none' }}>
                <div className='container-footer'>
                    <div>
                        <h3>JO Ticketing</h3>
                        <p>Rejoignez-nous pour des expériences inoubliables aux Jeux Olympiques.</p>
                    </div>
                    <div style={{textAlign:'end'}}>
                        <Button label="Contactez-nous" icon="pi pi-envelope" className="p-button-raised p-button-secondary" onClick={handleContactClick} />
                        <Link to={'/faq'}><Button label="FAQ" icon="pi pi-question" className="p-button-raised p-button-help" style={{ marginLeft: '1em' }} /></Link>
                        <div className='mt-4'>
                            <span>© 2024 JO Ticketing. Tous droits réservés. Devoir Studi</span>
                        </div>
                    </div>
                </div>
            </Card>
        </footer>
    );

}