import {useParams} from "react-router-dom";
import {React, useState, useEffect, useContext} from "react";
import {ProductContext} from "../../Context/contextProduct";
import {PanierContext} from "../../Context/contextPanier";


export default function ProduitShow() {

    const {id} = useParams()
    const { produit } = useContext(ProductContext);

    const { article, setArticle } = useContext(PanierContext);

    const addToPanier = () => {
        // Ajoutez le produit au panier en utilisant la fonction setArticle du contexte
        setArticle([...article, produit[productClicked]]);
    };

    const productClicked = produit.findIndex(obj => obj.title.replace(/\s+/g, "").trim()
        === id)

    return (
        <div>
            <p>{produit[productClicked].title}</p>
            <p>{produit[productClicked].description}</p>
            <img src={produit[productClicked].image} alt="Produit" />
            <button onClick={addToPanier}>Ajouter au panier</button>
        </div>
    )
}