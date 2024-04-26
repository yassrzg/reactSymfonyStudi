import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Identification/Login/Login';
import Register from './Components/Identification/Register/Register';
import AccountUser from './Pages/AccountUser/AccountUser';
import Produit from './Pages/Produit/Produit';
import ProduitShow from './Pages/Produit/ProduitShow';
import Navbar from './Components/Navbar/Navbar';
import Panier from './Components/Navbar/Panier';
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';
import LoginDoubleAuth from './Components/Identification/LoginDoubleAuth/LoginDoubleAuth';
import RegisterDoubleAuth from './Components/Identification/RegisterDoubleAuth/RegisterDoubleAuth';
import EventDetails from './Pages/EventDetails/EventDetails';
import {ToastProvider} from "./Context/ToastContext";
import EventFormPurchase from './Pages/EventFormPurchase/EventFormPurchase';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";

function App() {
    return (
        <ToastProvider>
            <Router>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/double-auth/:token" element={<LoginDoubleAuth />} />
                        <Route path="/check-auth/:token" element={<RegisterDoubleAuth />} />
                        <Route path="/account" element={<AccountUser />} />
                        <Route path="/event/:id/purchase" element={<EventFormPurchase />} />
                        <Route path="/event/:id" element={<EventDetails />} />
                        <Route path="/produit" element={<Produit />} />
                        <Route path="/produit/:id" element={<ProduitShow />} />
                        <Route path="/panier" element={<Panier />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>
            </Router>
        </ToastProvider>
    );
}

export default App;
