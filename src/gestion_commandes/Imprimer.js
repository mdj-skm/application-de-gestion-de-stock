import React, { useContext, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { CommandeContext } from '../contexts/CommandeContext';
import './Imprimer.css';
import { jsPDF } from "jspdf";
import logo from '../assets/logo.png';

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

      const username = localStorage.getItem('username');
      const now = new Date();
      const heurePaiement = now.toLocaleString(); // format local, ex: "15/05/2025, 14:30:00"


      doc.text('Reçu de Commande', 80, 20);
      doc.text(`Utilisateur: ${username}`, 80, 40);          // NOM UTILISATEUR
      doc.text(`Heure paiement: ${heurePaiement}`, 80, 50);  // HEURE PAIEMENT
      doc.text(`Produit: ${commandeImpression.produit}`, 80, 60);
      doc.text(`Catégorie: ${commandeImpression.categorie}`, 80, 70);
      doc.text(`Quantité: ${commandeImpression.quantite}`, 80, 80);
      doc.text(`Prix Unitaire: ${commandeImpression.prixUnitaire} FCFA`, 80, 90);
      doc.text(`Prix Total: ${commandeImpression.prixTotal} FCFA`, 80, 100);
      doc.text('PAYÉ', 100, 120);
      doc.text('------------------------------------------------------------------------------------------', 20, 130);
      doc.text('Reçu de Commande', 80, 140);
      doc.text(`Utilisateur: ${username}`, 80, 160);          // NOM UTILISATEUR
      doc.text(`Heure paiement: ${heurePaiement}`, 80, 170);  // HEURE PAIEMENT
      doc.text(`Produit: ${commandeImpression.produit}`, 80, 180);
      doc.text(`Catégorie: ${commandeImpression.categorie}`, 80, 190);
      doc.text(`Quantité: ${commandeImpression.quantite}`, 80, 200);
      doc.text(`Prix Unitaire: ${commandeImpression.prixUnitaire} FCFA`, 80, 210);
      doc.text(`Prix Total: ${commandeImpression.prixTotal} FCFA`, 80, 220);
      doc.text('PAYÉ', 100, 240);
      doc.text('------------------------------------------------------------------------------------------', 20, 250);

      doc.save('reçu_commande.pdf');
    }
  };

  return (
    
    <div className="layout-container">
      <Sidebar />
      <div className="module-content">
        <div className="header">
            <img src={logo} alt="Logo" className="logo" />
            <div className="company-name"><h1>G.E.S</h1></div>
        </div>
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
