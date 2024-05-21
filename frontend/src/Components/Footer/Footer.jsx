import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
export default function FooterPage() {

    return(

        <Card className="p-p-3 p-d-flex p-jc-between p-ai-center footer-component" style={{ backgroundColor: '#333', color: '#fff', marginTop: 'auto' }}>
            <div className='container-footer'>
                <div>
                    <h3>JO Ticketing</h3>
                    <p>Rejoignez-nous pour des expériences inoubliables aux Jeux Olympiques.</p>
                </div>
                <div style={{textAlign:'end'}}>
                    <Button label="Contactez-nous" icon="pi pi-envelope" className="p-button-raised p-button-secondary" />
                    <Button label="FAQ" icon="pi pi-question" className="p-button-raised p-button-help" style={{ marginLeft: '1em' }} />
                    <div className='mt-4'>
                        <span>© 2024 JO Ticketing. Tous droits réservés. Devoir Studi</span>
                    </div>
                </div>
            </div>
        </Card>
    );

}