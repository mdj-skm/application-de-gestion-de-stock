import React, { useContext } from 'react';
import { StockContext } from '../contexts/StockContext';
import './stock.css';
import Sidebar from '../components/sidebarstock'; 
import logo from '../assets/logo.png';

function Stocks() {
  const { fournisseurs } = useContext(StockContext);

  return (
    <div className="stock-containerST">
          <div className="sidebarST">
              <Sidebar />
          </div>
          <div className="module-content">
          <div className="headerST">
                <img src={logo} alt="Logo" className="logoST" />
                <div className="company-nameCL"><h1>G.E.S</h1></div>
            </div>
      <h2>Gestion des Stocks Fournisseurs</h2>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Nom Fournisseur</th>
            <th>Produit</th>
            <th>Quantité départ</th>
            <th>Quantité restante</th>
          </tr>
        </thead>
        <tbody>
          {fournisseurs && fournisseurs.length > 0 ? (
            fournisseurs.map((fournisseur, index) => (
              <tr key={index}>
                <td>{fournisseur.nom}</td>
                <td>{fournisseur.produit}</td>
                <td>{fournisseur.quantite}</td>
                <td>{fournisseur.quantite_restante}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucun fournisseur disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Stocks;
