import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Toast } from 'primereact/toast';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const toast = useRef(null);
    const navigate = useNavigate();

    // Initialize user from cookies to maintain state across refreshes
    const [user, setUser] = useState(() => {
        const savedUser = Cookies.get('userStudiJo');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const token = Cookies.get('tokenStudiJo');

    const prevUserRef = useRef();
    useEffect(() => {
        prevUserRef.current = user;
    });


    useEffect(() => {
        if (!token && user) {
            logout(user.email); // Assuming the user object has an email property
            setUser(null);
            showToast('info', 'Session Expired', 'You have been logged out.');
        }
    }, [token, user]);

    useEffect(() => {
        if (!user && token) {
            Cookies.remove('tokenStudiJo', { path: '/' });
        }
    }, [user, token]);

    const logout = async (email) => {
        try {
            await axios.post('https://127.0.0.1:8000/api/logout', { email });
            Cookies.remove('userStudiJo', { path: '/' }); // Clear user data on logout
            Cookies.remove('tokenStudiJo', { path: '/' });
        } catch (error) {
            showToast('error', 'Logout error', 'Error on reinitializing token.');
        }
    };

    const showToast = (severity, summary, detail, life = 3000) => {
        toast.current.show({ severity, summary, detail, life });
    };

    // Store user data in cookies whenever it changes
    useEffect(() => {
        if (user) {
            Cookies.set('userStudiJo', JSON.stringify(user), { path: '/' });
        } else {
            Cookies.remove('userStudiJo', { path: '/' });
            if (prevUserRef.current) {
                navigate('/login'); // Navigate to login only if there was a user before
            }
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, logout, showToast }}>
            <Toast ref={toast} />
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
