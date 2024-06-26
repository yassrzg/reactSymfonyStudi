import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Identification/Login/Login';
import Register from './Components/Identification/Register/Register';
import AccountUser from './Pages/AccountUser/AccountUser';
import Navbar from './Components/Navbar/Navbar';
import Panier from './Components/Navbar/Panier';
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';
import LoginDoubleAuth from './Components/Identification/LoginDoubleAuth/LoginDoubleAuth';
import RegisterDoubleAuth from './Components/Identification/RegisterDoubleAuth/RegisterDoubleAuth';
import EventDetails from './Pages/EventDetails/FullPage';
import {ToastProvider} from "./Context/ToastContext";
import EventFormPurchase from './Pages/EventFormPurchase/FullPage';
import Paiement from './Pages/Paiement/FullPage';
import DataQrCode from './Pages/DisplayDataQrCode/DataQrCode';
import RedirectIfAuthenticated from './utils/RedirectIfAuthenticated';
import ProtectedRoute from './utils/ProtectedRoute';
import {UserProvider} from "./Context/context";
import ResetPassword from './Components/Identification/ForgetPassword/ResetPassword'
import ResetPasswordToken from "./Components/Identification/ForgetPassword/ResetPasswordToken";
import Footer from './Components/Footer/Footer'
import ErrorPage from "./Pages/Error/ErrorPage";
import FAQ from "./Pages/Footer/Faq"

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import stripePromise from "./utils/stripe";
import {Elements} from "@stripe/react-stripe-js";

function App() {



    return (
        <ToastProvider>
                <Router>
                    <UserProvider>
                        <Navbar />
                        <div className="container">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
                                <Route path="/register" element={<RedirectIfAuthenticated><Register /></RedirectIfAuthenticated>} />
                                <Route path="/double-auth/:token" element={<LoginDoubleAuth />} />
                                <Route path="/check-auth/:token" element={<RegisterDoubleAuth />} />
                                <Route path="/account" element={<ProtectedRoute />}>
                                    <Route path="/account" element={<AccountUser />} />
                                </Route>
                                <Route path="/event/form" element={<ProtectedRoute />}>
                                    <Route path="/event/form" element={<EventFormPurchase />} />
                                </Route>

                                <Route path="/event/:title" element={<EventDetails />} />
                                <Route path="/panier" element={<Panier />} />
                                <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                                    <Route path="/admin" element={<Admin />} />
                                </Route>
                                <Route path="/payment" element={
                                    <Elements stripe={stripePromise}>
                                        <Paiement />
                                    </Elements>
                                } />
                                <Route path="/event/:eventName/:tokenUrl" element={<DataQrCode />} />
                                <Route path="/forgot-password" element={<ResetPassword/>} />
                                <Route path="/forgot-password/:token" element={<ResetPasswordToken/>} />
                                <Route path="/faq" element={<FAQ/>} />
                                <Route path="*" element={<ErrorPage/>} />
                            </Routes>
                        </div>
                        <Footer />

                    </UserProvider>
                </Router>

        </ToastProvider>

    );
}

export default App;
