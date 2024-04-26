import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [produit, setProduit] = useState([]);

    useEffect(() => {
        fetchProduits();
    }, []);

    const fetchProduits = () => {
        // axios
        //     .get('/api/getProduct')
        //     .then((response) => {
        //         setProduit(response.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    const createProduit = async (newProduit) => {
        // try {
        //     // const token = localStorage.getItem('token');
        //     // const config = {
        //     //     headers: {
        //     //         Authorization: `Bearer ${token}`,
        //     //         'Content-Type': 'application/json',
        //     //     },
        //     // };
        //     //
        //     // // Faites votre appel à l'API pour créer un nouveau produit ici
        //     // const response = await axios.post('/api/produits', newProduit, config);
        //
        //     // Mise à jour de la liste des produits après la création réussie
        //     await fetchProduits();
        //
        //     // Vous pouvez également utiliser la réponse de l'API pour afficher des messages ou effectuer d'autres actions si nécessaire
        //     // console.log(response.data);
        // } catch (error) {
        //     console.error("Erreur lors de la création du produit :", error);
        //     // Gérer les erreurs lors de la création du produit
        // }
    };

    // const token = localStorage.getItem('token');
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type' : 'application/json',
    //
    //     }
    // };
    const deleteProduit = (produitId) => {
        // const url = `/api/deleteProduits/${produitId}`;
        // axios.delete(url, config)
        //     .then((response) => {
        //         setProduit(produit.filter((produitItem) => produitItem.id !== produitId));
        //         // Le produit a été supprimé avec succès, vous pouvez mettre à jour votre état global si nécessaire.
        //         console.log("Produit supprimé avec succès.");
        //     })
        //     .catch((error) => {
        //         // Gérer les erreurs en cas d'échec de la suppression.
        //         console.error("Erreur lors de la suppression du produit :", error);
        //     });
    };

    const updateProduit = (produitId, newData) => {
        // const url = `/api/updateProduits/${produitId}`;
        // axios.put(url, newData, config)
        //     .then((response) => {
        //         // Le produit a été mis à jour avec succès, mettez à jour l'état local avec les nouvelles données.
        //         const updatedProduits = produit.map((produitItem) =>
        //             produitItem.id === produitId ? { ...produitItem, ...newData } : produitItem
        //         );
        //         setProduit(updatedProduits);
        //         console.log("Produit mis à jour avec succès.");
        //     })
        //     .catch((error) => {
        //         // Gérer les erreurs en cas d'échec de la mise à jour.
        //         console.error("Erreur lors de la mise à jour du produit :", error);
        //     });
    };


    return (
        <ProductContext.Provider value={{ produit, setProduit, createProduit, deleteProduit, updateProduit }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };

