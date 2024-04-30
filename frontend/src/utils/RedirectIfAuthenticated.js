import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/context';

const RedirectIfAuthenticated = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user) {
        // Si l'utilisateur est connecté, redirigez-le vers la page d'accueil
        return <Navigate to="/" replace />;
    }

    return children; // Rendre les composants enfants si l'utilisateur n'est pas connecté
};

export default RedirectIfAuthenticated;
