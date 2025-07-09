import React, { useContext } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import './Historique2.css';
import Sidebar from '../components/Sidebar2';
import logo from '../assets/logo.png';

const Historique = () => {
  const { historique } = useContext(CommandeContext);

  // Fonction pour colorer selon statut
  const couleurStatut = (statut) => {
    switch (statut?.toLowerCase()) {
      case 'livré':
        return 'blue';
      case 'validée':
        return 'green';
      case 'en cours':
        return 'orange';
      default:
        return 'black';
    }
  };

  return (
    <div className="historique-containerHIT">
      <Sidebar />
      <div className="main-content">
        <div className="headerHIT">
          <img src={logo} alt="Logo" className="logoHIT" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>  

        <h2>Historique des commandes</h2>

        {historique.length === 0 ? (
          <p>Aucune commande dans l'historique.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Prix Total</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {historique.flatMap((commande, index) => {
                const produits = commande.produits || [commande];
                return produits.map((produit, idx) => {
                  const prixUnitaire = parseInt(produit.prix_unitaire || produit.prixUnitaire || 0);
                  const quantite = parseInt(produit.quantite || 0);
                  const prixTotal = prixUnitaire * quantite;
                  const statut = commande.statut || "Inconnu";

                  return (
                    <tr key={`${index}-${idx}`}>
                      <td>{produit.produit}</td>
                      <td>{produit.categorie}</td>
                      <td>{quantite}</td>
                      <td>{prixUnitaire} FCFA</td>
                      <td>{prixTotal} FCFA</td>
                      <td style={{ color: couleurStatut(statut) }}>{statut}</td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Historique;
