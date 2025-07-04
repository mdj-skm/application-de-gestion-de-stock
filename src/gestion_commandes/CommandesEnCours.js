import React, { useContext, useState } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import Sidebar from '../components/Sidebar';
import './CommandesEnCours.css';
import logo from '../assets/logo.png';

const CommandesEnCours = () => {
  const { commandes, validerCommande, supprimerCommande } = useContext(CommandeContext);
  const [module, setModule] = useState("en cours");

  const handleValider = (index) => {
    validerCommande(index);
  };

  const handleSupprimer = (index) => {
    supprimerCommande(index);
  };

  // Fonction pour calculer le prix total
  const calculatePrixTotal = (prixUnitaire, quantite) => {
    // Assure que prixUnitaire et quantite sont des nombres
    const pu = Number(prixUnitaire) || 0;
    const qte = Number(quantite) || 0;
    return pu * qte;
  };

  return (
    <div className="layout-containerCE">
      <div className="sidebarCM">
        <Sidebar setModule={setModule} />
      </div>
      <div className="commandes-en-cours-containerCE">
        <div className="headerCE">
          <img src={logo} alt="Logo" className="logoCE" />
          <div className="company-nameCE"><h1>G.E.S</h1></div>
        </div>
        <h2>Commandes en cours</h2>
        {commandes.length === 0 ? (
          <p>Aucune commande en cours, Voir Commande validées.</p>
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
                // On récupère le prix unitaire (avec fallback)
                const prixUnitaire = commande.prixUnitaire ?? commande.prix_unitaire ?? 0;
                // Calcul du prix total via fonction
                const prixTotal = calculatePrixTotal(prixUnitaire, commande.quantite);

                return (
                  <tr key={index}>
                    <td data-label="Produit">{commande.produit}</td>
                    <td data-label="Catégorie">{commande.categorie}</td>
                    <td data-label="Quantité">{commande.quantite}</td>
                    <td data-label="Prix Unitaire">{prixUnitaire} FCFA</td>
                    <td data-label="Prix Total">{prixTotal} FCFA</td>
                    <td>
                      <button
                        className="valider-btn"
                        
                      >
                        Paiement en cours...
                      </button>
                      <button
                        className="supprimer-btn"
                        onClick={() => handleSupprimer(index)}
                      >
                        Supprimer
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
