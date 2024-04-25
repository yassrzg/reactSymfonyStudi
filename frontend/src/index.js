import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {UserProvider} from "./Context/context";
import {ProductProvider} from "./Context/contextProduct";
import {PanierProvider} from "./Context/contextPanier";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
       <ProductProvider>
           <PanierProvider>
               <App />
           </PanierProvider>
       </ProductProvider>
    </UserProvider>
);


