import React, { useContext } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import './Historique.css';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.png';

const Historique = () => {
  const { historique } = useContext(CommandeContext);

  return (
    <div className="historique-container">
        <Sidebar />
      <div className="main-content">
      <div className="header">
            <img src={logo} alt="Logo" className="logo" />
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
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {historique.map((commande, index) => (
              <tr key={index}>
                <td>{commande.produit}</td>
                <td>{commande.categorie}</td>
                <td>{commande.quantite}</td>
                <td>{commande.prixUnitaire} FCFA</td>
                <td>{commande.prixTotal} FCFA</td>
                <td>{commande.statut}</td>
                <td>{commande.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default Historique;
