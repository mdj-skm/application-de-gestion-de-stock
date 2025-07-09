import React, { useContext, useEffect, useState } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import './CommandesLivrees2.css';
import Sidebar from '../components/Sidebar2';
import logo from '../assets/logo.png';

const CommandesLivrees = () => {
  const { commandesLivrees } = useContext(CommandeContext);
  const [livrees, setLivrees] = useState([]);

  useEffect(() => {
    // Synchroniser avec localStorage au cas où CommandeContext n'a pas encore chargé
    if (commandesLivrees.length === 0) {
      const saved = localStorage.getItem("commandesLivrees");
      if (saved) {
        setLivrees(JSON.parse(saved));
      }
    } else {
      setLivrees(commandesLivrees);
    }
  }, [commandesLivrees]);

  return (
    <div className="layout-containerCLI">
      <div className="sidebarCLI">
        <Sidebar />
      </div>
      <div className="module-content">
        <div className="headerCLI">
          <img src={logo} alt="Logo" className="logoCLI" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>
        <h2>Commandes effectuées</h2>
        {livrees.length === 0 ? (
          <p>Aucune commande effectuée.</p>
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
              {livrees.map((commande, index) => (
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
