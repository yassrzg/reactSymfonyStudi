import React, { useContext } from "react";
import { PanierContext } from "../../Context/contextPanier";

export default function Panier() {
    const { article } = useContext(PanierContext);

    // Créer un objet pour stocker les articles et leurs quantités
    const articlesQuantities = {};

    // Parcourir les articles et mettre à jour les quantités
    article.forEach((item) => {
        if (item.id in articlesQuantities) {
            articlesQuantities[item.id].quantity += 1;
        } else {
            articlesQuantities[item.id] = { ...item, quantity: 1 };
        }
    });

    // Convertir l'objet en tableau d'articles uniques
    const uniqueArticles = Object.values(articlesQuantities);

    return (
        <div>
            <h1>Panier</h1>
            {uniqueArticles.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                <ul>
                    {uniqueArticles.map((item) => (
                        <div key={item.id}>
                            <p>
                                {item.title} (x{item.quantity})
                            </p>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}
