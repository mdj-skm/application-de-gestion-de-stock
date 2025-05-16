import React, { useContext } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import Sidebar from '../components/Sidebar'; // chemin correct
import './GestionCommandes.css';
import logo from '../assets/logo.png';

const GestionCommandes = () => {
  const { commandes, validerCommande } = useContext(CommandeContext);

  const handleValider = (index) => {
    validerCommande(index);
  }

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="commandes-en-cours-container">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>
        <h2>Commandes en cours</h2>
        {commandes.length === 0 ? (
          <p>Aucune commande en cours.</p>
        ) : (
          <table>
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
                  <td>{commande.produit}</td>
                  <td>{commande.categorie}</td>
                  <td>{commande.quantite}</td>
                  <td>{commande.prixUnitaire} FCFA</td>
                  <td>{commande.prixTotal} FCFA</td>
                  <td>
                    <button onClick={() => handleValider(index)}>Payé</button>
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

export default GestionCommandes;
