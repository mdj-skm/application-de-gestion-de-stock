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
          <table className="commande-tableCEC">
            <thead>
              <tr>
                <th>N° Commande</th>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Prix Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande, commandeIndex) =>
                commande.produits.map((produit, produitIndex) => (
                  <tr key={`${commandeIndex}-${produitIndex}`}>
                    <td>{commande.numero_commande}</td>
                    <td>{produit.produit}</td>
                    <td>{produit.categorie}</td>
                    <td>{produit.quantite}</td>
                    <td>{produit.prix_unitaire} FCFA</td>
                    <td>{produit.prix_total} FCFA</td>
                    <td>
                      <button className="valider-btn">Paiement en cours...</button>
                      <button
                        className="supprimer-btn"
                        onClick={() => handleSupprimer(commandeIndex)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CommandesEnCours;
