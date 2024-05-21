import React from 'react';
import MyEvent from './MyEvent';
import AccompagnantUser from './AccompagnantUser';
import MyEventPast from './MyEventPast'
import PasswordChangeModal from "./ChangePassword";
import ChangeSurname from "./ChangeSurname";
import ChangeName from "./ChangeName"


export default function AccountUser() {

    return(
        <div className='container-account-edit'>
            <div>
                <div>
                    <h3 className='text-center'>Update Account ?</h3>
                    <div className='container-edit-account'>
                        <ChangeName />
                        <ChangeSurname />
                        <PasswordChangeModal />
                    </div>
                </div>
                <div className='container-accompanions-user'>
                    <AccompagnantUser />
                </div>

                <MyEvent />
                <MyEventPast />
            </div>
        </div>
    )
}