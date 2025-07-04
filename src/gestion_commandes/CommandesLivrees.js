import React, { useContext } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import './CommandesLivrees.css';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.png';


const CommandesLivrees = () => {
  const { commandesLivrees } = useContext(CommandeContext);

  return (
    <div className="layout-containerCL">
      <div className="sidebarCL">
          <Sidebar />
      </div>
      <div className="module-content">
      <div className="headerCL">
            <img src={logo} alt="Logo" className="logoCL" />
            <div className="company-nameCL"><h1>G.E.S</h1></div>
        </div>
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
                <td data-label="Produit">{commande.produit}</td>
                <td data-label="Catégorie">{commande.categorie}</td>
                <td data-label="Quantité">{commande.quantite}</td>
                <td data-label="Prix Unitaire">{commande.prixUnitaire} FCFA</td>
                <td data-label="Prix Total">{commande.prixTotal} FCFA</td>
                <td data-label="Statut" style={{ color: 'blue' }}>Livré</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default CommandesLivrees;
