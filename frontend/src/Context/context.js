import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Toast } from 'primereact/toast';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const toast = useRef(null);

    // Initialize user from sessionStorage to maintain state across refreshes
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('userStudiJo');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const token = sessionStorage.getItem('tokenStudiJo');

    useEffect(() => {
        if (!token && user) {
            logout(user.email); // Assuming the user object has an email property
            setUser(null);
            showToast('info', 'Session Expired', 'You have been logged out.');
        }
    }, [token]);

    useEffect(() => {
        if (!user && token) {
            sessionStorage.removeItem('tokenStudiJo');
        }
    }, [user]);

    const logout = async (email) => {
        try {
            await axios.post('https://127.0.0.1:8000/api/logout', { email });
            sessionStorage.removeItem('userStudiJo'); // Clear user data on logout
            sessionStorage.removeItem('tokenStudiJo');
        } catch (error) {
            showToast('error', 'Token error', 'Error on reinitializing token.');
        }
    };

    const showToast = (severity, summary, detail, life = 3000) => {
        toast.current.show({ severity, summary, detail, life });
    };

    // Store user data in sessionStorage whenever it changes
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('userStudiJo', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('userStudiJo');
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
