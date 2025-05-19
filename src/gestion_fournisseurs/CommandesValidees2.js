import React, { useContext } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import './CommandesValidees2.css';
import Sidebar from '../components/Sidebar2';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const CommandesValidees = () => {
  const { commandesValidees, livrerCommande, setCommandeImpression } = useContext(CommandeContext);
  const navigate = useNavigate();

  const handleLivrer = (index) => {
    const commande = commandesValidees[index];
    livrerCommande(index);
    setCommandeImpression(commandesValidees[index]);
    navigate('/imprimer2'); // ✅ Nouvelle syntaxe
  };

  return (
    <div className="commandes-validees-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="commandes-en-cours-container">
        <div className="header">
            <img src={logo} alt="Logo" className="logo" />
            <div className="company-name"><h1>G.E.S</h1></div>
        </div>
      <h2>Commandes Validées</h2>
      {commandesValidees.length === 0 ? (
        <p>Aucune commande à valider, Voir dans Commande effectuée.</p>
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
