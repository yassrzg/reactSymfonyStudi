import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { PanierContext } from '../../Context/contextPanier';
import { UserContext } from '../../Context/context';
import { ToastContext } from '../../Context/ToastContext';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
    const { article } = useContext(PanierContext);
    const { user, setUser } = useContext(UserContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post('https://127.0.0.1:8000/api/logout', { email: user.user });
            setUser(null);
            sessionStorage.removeItem("tokenStudiJo");
            showToast('success', 'Logged Out', 'You logged out successfully');
            navigate('/');
        } catch (error) {
            showToast('error', 'Logout Failed', 'Failed to log out');
        }
    };

    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', command: () => { navigate('/'); }},
        { label: 'Account', icon: 'pi pi-fw pi-user', command: () => { navigate('/account'); }},
        { label: 'Produit', icon: 'pi pi-fw pi-calendar', command: () => { navigate('/produit'); }},
        { label: 'Mon Panier', icon: 'pi pi-fw pi-shopping-cart', command: () => { navigate('/panier'); }},
        { label: 'Admin', icon: 'pi pi-fw pi-cog', command: () => { navigate('/admin'); }}
    ];

    if (user) {
        items.push(
            { label: 'Mon Compte', icon: 'pi pi-fw pi-user-plus', command: () => { navigate('/account'); }},
            { label: 'Se Déconnecter', icon: 'pi pi-fw pi-power-off', command: logout }
        );
    } else {
        items.push(
            { label: 'Inscription', icon: 'pi pi-fw pi-user-plus', command: () => { navigate('/register'); }},
            { label: 'Connexion', icon: 'pi pi-fw pi-sign-in', command: () => { navigate('/login'); }}
        );
    }

    const start = <h2>Site des jeux Olympiques - Billetterie </h2>;


    return (
        <div>
            <Menubar model={items} start={start}  />
        </div>
    );
};

export default Navbar;
