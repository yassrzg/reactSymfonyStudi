import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { PanierContext } from '../../Context/contextPanier';
import { UserContext } from '../../Context/context';
import { ToastContext } from '../../Context/ToastContext';
import { UserService } from '../../service/UserService';





import './Navbar.css';

const Navbar = () => {
    const { article } = useContext(PanierContext);
    const { user, setUser } = useContext(UserContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();




    const logout = async () => {
        if (!user) {
            showToast('error', 'Logout Error', 'No user is currently logged in');
            return;
        }
        try {
            await UserService.logout(user.user);
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
    ];

    if (user) {

        if (user.roles.includes("ROLE_ADMIN")) {
            items.push({ label: 'Admin', icon: 'pi pi-fw pi-cog', command: () => { navigate('/admin'); }});
        }
        items.push(
            { label: 'Mon Compte', icon: 'pi pi-fw pi-user', command: () => { navigate('/account'); }},
            { label: 'Se Déconnecter', icon: 'pi pi-fw pi-power-off', command: logout }
        );
    } else {
        items.push(
            { label: 'Inscription', icon: 'pi pi-fw pi-user-plus', command: () => { navigate('/register'); }},
            { label: 'Connexion', icon: 'pi pi-fw pi-sign-in', command: () => { navigate('/login'); }}
        );
    }

    const start = <Link to='/' style={{textDecoration:'none', color:'black', fontStyle:'bold' }}>Site des jeux Olympiques - Billetterie </Link>;


    return (
        <div>
            <Menubar model={items} start={start}  style={{padding:'2rem'}}/>
        </div>
    );
};

export default Navbar;
