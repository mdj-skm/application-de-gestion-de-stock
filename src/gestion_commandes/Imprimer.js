import React, { useContext, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { CommandeContext } from '../contexts/CommandeContext';
import './Imprimer.css';
import { jsPDF } from "jspdf";

const Imprimer = () => {
  const { commandeImpression } = useContext(CommandeContext);
  
  useEffect(() => {
    if (commandeImpression) {
      console.log('Commande à imprimer :', commandeImpression);
    }
  }, [commandeImpression]);

  const handleImprimer = () => {
    if (commandeImpression) {
      const doc = new jsPDF();

      doc.text('Reçu de Commande', 80, 20);
      doc.text(`Produit: ${commandeImpression.produit}`, 80, 40);
      doc.text(`Catégorie: ${commandeImpression.categorie}`, 80, 50);
      doc.text(`Quantité: ${commandeImpression.quantite}`, 80, 60);
      doc.text(`Prix Unitaire: ${commandeImpression.prixUnitaire} FCFA`, 80, 70);
      doc.text(`Prix Total: ${commandeImpression.prixTotal} FCFA`, 80, 80);
      doc.text('PAYÉ', 100, 100);
      doc.text('------------------------------------------------------------------------------------------', 20, 110);
      

      doc.save('reçu_commande.pdf');
    }
  };

  return (
    
    <div className="layout-container">
      <Sidebar />
      <div className="module-content">
        <h2>Module Imprimer</h2>
        {commandeImpression ? (
          <div>
            <p>Voici le reçu de la commande :</p>
            <table>
              <tr>
                <td>Produit:</td>
                <td>{commandeImpression.produit}</td>
              </tr>
              <tr>
                <td>Catégorie:</td>
                <td>{commandeImpression.categorie}</td>
              </tr>
              <tr>
                <td>Quantité:</td>
                <td>{commandeImpression.quantite}</td>
              </tr>
              <tr>
                <td>Prix Unitaire:</td>
                <td>{commandeImpression.prixUnitaire} FCFA</td>
              </tr>
              <tr>
                <td>Prix Total:</td>
                <td>{commandeImpression.prixTotal} FCFA</td>
              </tr>
            </table>
            <button onClick={handleImprimer}>Imprimer en PDF</button>
          </div>
        ) : (
          <p>Aucune commande à imprimer.</p>
        )}
      </div>
    </div>
  );
};

export default Imprimer;
