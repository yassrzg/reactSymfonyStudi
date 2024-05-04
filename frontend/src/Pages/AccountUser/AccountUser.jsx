import React from 'react';
import MyEvent from './MyEvent';
import AccompagnantUser from './AccompagnantUser';
import MyEventPast from './MyEventPast'
import PasswordChangeModal from "./ChangePassword";
import ChangeSurname from "./ChangeSurname";
import ChangeName from "./ChangeName"


export default function AccountUser() {

    return(
        <div>
            <div> Bienvenue sur votre compte</div>
            <div>
                <ChangeName />
                <ChangeSurname />
                <PasswordChangeModal />
                <AccompagnantUser />

                <MyEvent />
                <MyEventPast />
            </div>
        </div>
    )
}