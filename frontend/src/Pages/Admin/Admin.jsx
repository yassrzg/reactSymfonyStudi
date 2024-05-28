import React from 'react';
import AdminEvent from './Components/AdminEvent';
import AdminUser from './Components/SeeAllUser';
import Stat from './Components/Stat';
import StatPurchase from './Components/StatPurchaseEvent'

export default function Admin() {



    return (
        <div id='admin-page'>

                <AdminEvent/>

                <Stat/>
                <AdminUser/>
                <StatPurchase />

        </div>
    );
}
