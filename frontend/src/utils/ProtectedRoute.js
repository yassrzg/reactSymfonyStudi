import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../Context/context';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.some(role => user.roles.includes(role))) {
        // Si l'utilisateur n'a pas le rôle requis, redirigez-le vers une page d'erreur ou d'accueil
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Rendre les composants enfants si l'utilisateur est autorisé
};

export default ProtectedRoute;
