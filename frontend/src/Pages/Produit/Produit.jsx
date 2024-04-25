import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import './Produit.css'
import { Link } from 'react-router-dom';
import {ProductContext} from "../../Context/contextProduct";

export default function Produit() {


    const { produit } = useContext(ProductContext);



    return(
        <div id={"produit-container"}>
            {produit.map((produitItem) => (
                <Link to={{pathname: `/produit/${produitItem.title.replace(/\s+/g, "").trim()}`, state: { productId: produitItem.id }}}
                      key={produitItem.id}
                      id={"produit"}>
                    <img src={produitItem.image} alt="Produit" />
                    <p>{produitItem.title}</p>
                    <p>{produitItem.prix} €</p>
                    <p>{produitItem.description}</p>
                </Link>
            ))}
        </div>
    )
}