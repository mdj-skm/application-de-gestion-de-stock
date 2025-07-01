import React, { useContext, useState } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import Sidebar from '../components/Sidebar2';
import './CommandesEnCours2.css';
import logo from '../assets/logo.png';

const CommandesEnCours = () => {
  const { commandes, validerCommande, viderCommandesAImprimer, supprimerCommande } = useContext(CommandeContext);
  const [module, setModule] = useState("en cours");

  const handleValider = (index) => {
    validerCommande(index);
  };

  const handleSupprimer = (index) => {
    supprimerCommande(index);
    viderCommandesAImprimer(); // <-- Vide aussi les fichiers à imprimer
  };

  // Fonction pour calculer le prix total
  const calculatePrixTotal = (prixUnitaire, quantite) => {
    return prixUnitaire * quantite;
  };

  return (
    <div className="layout-container">
      <div className="sidebar">
        <Sidebar setModule={setModule} />
      </div>
      <div className="commandes-en-cours-container">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>
        <h2>Commandes en attentes</h2>
        {commandes.length === 0 ? (
          <p>Aucune commande en attente, Voir dans Commande validée.</p>
        ) : (
          <table className="commande-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Prix Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande, index) => {
                const prixUnitaire = commande.prixUnitaire ?? commande.prix_unitaire ?? 0;
                const prixTotal = commande.prixTotal ?? prixUnitaire * commande.quantite;


                return (
                  <tr key={index}>
                    <td data-label="Produit">{commande.produit}</td>
                    <td data-label="Catégorie">{commande.categorie}</td>
                    <td data-label="Quantité">{commande.quantite}</td>
                    <td data-label="Prix Unitaire">{prixUnitaire} FCFA</td>
                    <td data-label="Prix Total">{prixTotal} FCFA</td>
                    <td>
                      <button className="valider-btn" onClick={() => handleValider(index)}>
                        Payé
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CommandesEnCours;
