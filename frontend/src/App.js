import React, {useContext, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Identification/Login/Login';
import Register from './Components/Identification/Register/Register';
import AccountUser from './Pages/AccountUser/AccountUser';
import Navbar from './Components/Navbar/Navbar';
import Panier from './Components/Navbar/Panier';
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';
import LoginDoubleAuth from './Components/Identification/LoginDoubleAuth/LoginDoubleAuth';
import RegisterDoubleAuth from './Components/Identification/RegisterDoubleAuth/RegisterDoubleAuth';
import EventDetails from './Pages/EventDetails/EventDetails';
import {ToastProvider} from "./Context/ToastContext";
import EventFormPurchase from './Pages/EventFormPurchase/EventFormPurchase';
import Paiement from './Components/Paiement/Paiement';
import MyEvent from './Pages/AccountUser/MyEvent';
import DataQrCode from './Pages/DisplayDataQrCode/DataQrCode';
import {UserContext} from "./Context/context";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import stripePromise from "./utils/stripe";
import {Elements} from "@stripe/react-stripe-js";




function App() {
    const { user } = useContext(UserContext);

    const redirectToHome = () => {
        return <Navigate to="/" />;
    };

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
                        <Route path='/account/my-events' element={<MyEvent />} />
                        <Route path="/event/form" element={<EventFormPurchase />} />
                        <Route path="/event/:title" element={<EventDetails />} />
                        <Route path="/panier" element={<Panier />} />
                        <Route path="/admin" element={user && user.roles.includes("ROLE_ADMIN") ? <Admin /> : redirectToHome()} />
                        <Route path="/payment" element={
                            <Elements stripe={stripePromise}>
                                <Paiement />
                            </Elements>
                        } />
                        <Route path="/event/:eventName/:tokenUrl" element={<DataQrCode />} />
                    </Routes>
                </div>
            </Router>
        </ToastProvider>

    );
}

export default App;
