import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/context';

import { UseTokenUser } from '../../service/UseTokenUser';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

export default function AccompagnantUser() {
    const [accompagnant, setAccompagnant] = useState([]);
    const { user } = useContext(UserContext);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await UseTokenUser.getUserAccompagnant();
                setAccompagnant(fetchedEvents);
                console.log(fetchedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);


    const eventTemplate = (rowData) => {
        return (
            <ul>
                {rowData.event.map((evt, index) => (
                    <li key={index}>
                        {`${evt.name} le ${new Date(evt.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}`}
                    </li>
                ))}
            </ul>
        );
    };
    const dateFilterTemplate = (options) => {
        return (
            <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value)} dateFormat="dd/mm/yy" />
        );
    };

    return (
        <Inplace closable>
            <InplaceDisplay>
                <Button icon="pi pi-eye" label="Voir tous mes compagnons" className="p-button-rounded p-button-info" />
            </InplaceDisplay>
            <InplaceContent>
                <h3>Mes Compagnons</h3>
                <DataTable value={accompagnant}>
                    <Column field="name" header="Name"></Column>
                    <Column field="lastname" header="Lastname"></Column>
                    <Column body={eventTemplate} header="Événements Participés" filter filterElement={dateFilterTemplate}></Column>
                </DataTable>
            </InplaceContent>
        </Inplace>
    );
}
