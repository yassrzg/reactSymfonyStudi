import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/context'
import {useNavigate} from "react-router-dom";
import MyEvent from './MyEvent';


export default function AccountUser() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (user == null) {
        return null; // Retourne un élément vide si l'utilisateur est null pour éviter le rendu temporaire avant la redirection
    }
    return(
        <div>
        <div> Bienvenue sur votre compte</div>
        <div>
            <h2>Détails</h2>
            <p>email : {user.user}</p>

        <MyEvent />
        </div>
        </div>
    )
}