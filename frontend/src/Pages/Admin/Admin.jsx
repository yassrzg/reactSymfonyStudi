import React from 'react';
import AdminEvent from './Components/AdminEvent';
import AdminUser from './Components/SeeAllUser';
import Stat from './Components/Stat';

export default function Admin() {



    return (
        <div id='admin-page'>
            <div className='container-admin-page'>
                <AdminEvent/>
            </div>
            <div className='container-admin-page'>
                <Stat/>
                <AdminUser/>
            </div>
        </div>
    );
}
