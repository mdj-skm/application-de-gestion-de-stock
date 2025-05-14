import React, { useContext } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import './CommandesLivrees.css';
import Sidebar from '../components/Sidebar';

const CommandesLivrees = () => {
  const { commandesLivrees } = useContext(CommandeContext);

  return (
    <div className="commandes-livrees-container">
        <Sidebar />
      <h2>Commandes Livrées</h2>
      {commandesLivrees.length === 0 ? (
        <p>Aucune commande livrée.</p>
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
            {commandesLivrees.map((commande, index) => (
              <tr key={index}>
                <td>{commande.produit}</td>
                <td>{commande.categorie}</td>
                <td>{commande.quantite}</td>
                <td>{commande.prixUnitaire} FCFA</td>
                <td>{commande.prixTotal} FCFA</td>
                <td style={{ color: 'blue' }}>Livré</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CommandesLivrees;
