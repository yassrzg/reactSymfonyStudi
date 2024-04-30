import React from 'react';
import AdminEvent from './Components/AdminEvent';
import AdminUser from './Components/SeeAllUser';

export default function Admin() {



    return (
        <div>
            <div>
                <AdminUser />
            </div>
            <div>
                <AdminEvent />
            </div>
        </div>
    );
}
