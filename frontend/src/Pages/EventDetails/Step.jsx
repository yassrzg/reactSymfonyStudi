import React, {useState} from 'react';
import { Steps } from 'primereact/steps';

export default function LinearDemo() {


    const items = [
        {
            label: 'Choice your Formule'
        },
        {
            label: 'Add your informations'
        },
        {
            label: 'Payment'
        }
    ];

    return (
        <div className="card" id='step-react'>
            <Steps readOnly model={items} activeIndex={0} />
        </div>
    )
}
