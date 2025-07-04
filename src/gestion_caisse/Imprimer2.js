import React, { useContext, useEffect } from 'react';
import Sidebar from '../components/Sidebar2';
import { CommandeContext } from '../contexts/CommandeContext';
import './Imprimer2.css';
import { jsPDF } from "jspdf";
import logo from '../assets/logo.png';

const Imprimer = () => {
  const { 
    commandeImpression, 
    commandesImprimees, 
    ajouterCommandeImprimee, 
    setCommandeImpression 
  } = useContext(CommandeContext);
  
  useEffect(() => {
    console.log("Composant Imprimer2 monté");
    if (!commandeImpression) {
    const saved = localStorage.getItem("commandeImpression");
    if (saved) {
      console.log("Commande récupérée depuis localStorage:", JSON.parse(saved));
      setCommandeImpression(JSON.parse(saved));
    }
  } else {
    console.log('Commande à imprimer :', commandeImpression);
  }
  }, [commandeImpression]);

  
  // Fonction générique pour générer le PDF d'une commande
  const genererPDF = (commande) => {
      if (!commande) return;

      const doc = new jsPDF();

      const username = localStorage.getItem('username');
      const now = new Date();
      const heurePaiement = now.toLocaleString(); // format local, ex: "15/05/2025, 14:30:00"


      doc.text('Reçu de Commande', 80, 20);
      doc.text(`Utilisateur: ${username}`, 80, 40);          // NOM UTILISATEUR
      doc.text(`Heure paiement: ${heurePaiement}`, 80, 50);  // HEURE PAIEMENT
      doc.text(`Produit: ${commande.produit}`, 80, 60);
      doc.text(`Catégorie: ${commande.categorie}`, 80, 70);
      doc.text(`Quantité: ${commande.quantite}`, 80, 80);
      doc.text(`Prix Unitaire: ${commande.prixUnitaire} FCFA`, 80, 90);
      doc.text(`Prix Total: ${commande.prixTotal} FCFA`, 80, 100);
      doc.text('PAYÉ', 100, 120);
      doc.text('------------------------------------------------------------------------------------------', 20, 130);
      doc.text('Reçu de Commande', 80, 140);
      doc.text(`Utilisateur: ${username}`, 80, 160);          // NOM UTILISATEUR
      doc.text(`Heure paiement: ${heurePaiement}`, 80, 170);  // HEURE PAIEMENT
      doc.text(`Produit: ${commande.produit}`, 80, 180);
      doc.text(`Catégorie: ${commande.categorie}`, 80, 190);
      doc.text(`Quantité: ${commande.quantite}`, 80, 200);
      doc.text(`Prix Unitaire: ${commande.prixUnitaire} FCFA`, 80, 210);
      doc.text(`Prix Total: ${commande.prixTotal} FCFA`, 80, 220);
      doc.text('PAYÉ', 100, 240);
      doc.text('------------------------------------------------------------------------------------------', 20, 250);

      doc.save('reçu_commande.pdf');
    };
  

   const handleImprimer = () => {
    if (commandeImpression) {
      genererPDF(commandeImpression);
      ajouterCommandeImprimee(commandeImpression);
      alert('Commande imprimée avec succès.');
    }
  };
  // Pour réimprimer une commande déjà imprimée
  const handleReimprimer = (commande) => {
    genererPDF(commande);
  };
  console.log('commandeImpression dans Imprimer:', commandeImpression);


  return (
    
    <div className="layout-containerIMP">
      <Sidebar />
      <div className="module-content">
        <div className="headerIMP">
            <img src={logo} alt="Logo" className="logoIMP" />
            <div className="company-name"><h1>G.E.S</h1></div>
        </div>
        <h2>Module Imprimer</h2>
        {commandeImpression ? (
          <div>
            <p>Voici le reçu de la commande :</p>
            <table>
              <tbody>
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
              </tbody>
            </table>
            <button onClick={handleImprimer}>Imprimer en PDF</button>
          </div>
        ) : (
          <p>Aucune commande à imprimer.</p>
        )}
        <hr />

        <h3>Historique des commandes imprimées :</h3>
        {commandesImprimees.length === 0 ? (
          <p>Aucune commande imprimée pour le moment.</p>
        ) : (
          <div className="historique-impression">
            {commandesImprimees.map((cmd, idx) => (
              <div key={idx} className="impression-item">
                <p><strong>Produit:</strong> {cmd.produit}</p>
                <p><strong>Catégorie:</strong> {cmd.categorie}</p>
                <p><strong>Quantité:</strong> {cmd.quantite}</p>
                <p><strong>Prix Unitaire:</strong> {cmd.prixUnitaire} FCFA</p>
                <p><strong>Prix Total:</strong> {cmd.prixTotal} FCFA</p>
                <button onClick={() => handleReimprimer(cmd)}>Imprimer à nouveau</button>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Imprimer;
