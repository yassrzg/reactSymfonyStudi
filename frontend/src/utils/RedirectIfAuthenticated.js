import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/context';

const RedirectIfAuthenticated = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user) {

        return <Navigate to="/" replace />;
    }

    return children;
};

export default RedirectIfAuthenticated;
