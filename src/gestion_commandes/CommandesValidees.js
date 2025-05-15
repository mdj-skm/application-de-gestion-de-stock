import React, { useContext } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import './CommandesValidees.css';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const CommandesValidees = () => {
  const { commandesValidees, livrerCommande, setCommandeImpression } = useContext(CommandeContext);
  const navigate = useNavigate();

  const handleLivrer = (index) => {
    livrerCommande(index);
    setCommandeImpression(commandesValidees[index]);
    navigate('/imprimer'); // ✅ Nouvelle syntaxe
  };

  return (
    <div className="commandes-validees-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="commandes-en-cours-container">
      <h2>Commandes Validées</h2>
      {commandesValidees.length === 0 ? (
        <p>Aucune commande à valider.</p>
      ) : (
        <div style={{ overflowX: 'auto', width: '100%' }}>
        
          <table className="responsive-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Quantité</th>
              <th>Prix Unitaire</th>
              <th>Prix Total</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commandesValidees.map((commande, index) => (
              
              <tr key={index}>
                
                <td>{commande.produit}</td>
                <td>{commande.categorie}</td>
                <td>{commande.quantite}</td>
                <td>{commande.prixUnitaire} FCFA</td>
                <td>{commande.prixTotal} FCFA</td>
                <td style={{ color: 'green' }}>Payé</td>
                <td>
                  <button onClick={() => handleLivrer(index)}>Livré</button>
                </td>
                
              </tr>
              
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default CommandesValidees;
