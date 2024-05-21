import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

const FAQ = () => {
    const faqData = [
        {
            question: "Comment acheter des billets pour les Jeux Olympiques ?",
            answer: "Les billets peuvent être achetés via le site officiel de la billetterie des Jeux Olympiques. Assurez-vous de créer un compte et de suivre les étapes indiquées pour acheter vos billets."
        },
        {
            question: "Quels sont les différents types de billets disponibles ?",
            answer: "Il existe plusieurs types de billets, y compris les billets pour les événements individuels, les forfaits de plusieurs événements et les billets pour les cérémonies d'ouverture et de clôture."
        },
        {
            question: "Puis-je obtenir un remboursement si je ne peux pas assister à l'événement ?",
            answer: "Les politiques de remboursement varient. Veuillez consulter les conditions générales sur le site de la billetterie pour plus de détails sur les remboursements et les échanges de billets."
        },
        {
            question: "Quels modes de paiement sont acceptés ?",
            answer: "Les principaux modes de paiement tels que les cartes de crédit et de débit, ainsi que certains portefeuilles électroniques, sont acceptés."
        },
        {
            question: "Comment puis-je contacter le support client pour des questions sur les billets ?",
            answer: "Vous pouvez contacter le support client via le formulaire de contact sur le site de la billetterie ou en appelant le numéro de téléphone fourni sur le site."
        }
    ];

    return (
        <div className="p-m-4" style={{padding:'4rem'}}>
            <h2 className="p-text-center">FAQ - Billetterie des Jeux Olympiques 2024</h2>
            <Accordion>
                {faqData.map((item, index) => (
                    <AccordionTab key={index} header={item.question}>
                        <p>{item.answer}</p>
                    </AccordionTab>
                ))}
            </Accordion>
        </div>
    );
};

export default FAQ;
