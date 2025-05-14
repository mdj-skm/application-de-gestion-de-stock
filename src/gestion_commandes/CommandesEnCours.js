import React, { useContext, useState } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import Sidebar from '../components/Sidebar';
import './CommandesEnCours.css';

const CommandesEnCours = () => {
  const { commandes, validerCommande } = useContext(CommandeContext);
  const [module, setModule] = useState("en cours");

  const handleValider = (index) => {
    validerCommande(index);
  };

  return (
    <div className="layout-container">
      <div className="sidebar">
        <Sidebar setModule={setModule} />
      </div>

      <div className="commandes-en-cours-container">
        <h2>Commandes en cours</h2>
        {commandes.length === 0 ? (
          <p>Aucune commande en cours.</p>
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
              {commandes.map((commande, index) => (
                <tr key={index}>
                  <td data-label="Produit">{commande.produit}</td>
                  <td data-label="Catégorie">{commande.categorie}</td>
                  <td data-label="Quantité">{commande.quantite}</td>
                  <td data-label="Prix Unitaire">{commande.prixUnitaire} FCFA</td>
                  <td data-label="Prix Total">{commande.prixTotal} FCFA</td>

                  <td>
                    <button className="valider-btn" onClick={() => handleValider(index)}>
                      Payé
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CommandesEnCours;
