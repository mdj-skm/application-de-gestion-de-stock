import React, { useContext, useEffect, useState } from 'react';
import { StockContext } from '../contexts/StockContext';
import './stock.css';

function Stocks() {
  const { fournisseurs } = useContext(StockContext);

  return (
    <div className="stock-container">
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
          {fournisseurs.length === 0 ? (
            <tr><td colSpan="4">Aucun fournisseur disponible</td></tr>
          ) : (
            fournisseurs.map(fournisseur => (
              <tr key={fournisseur.id}>
                <td>{fournisseur.nom}</td>
                <td>{fournisseur.produit}</td>
                <td>{fournisseur.quantite}</td>
                <td>{fournisseur.quantite_restante}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Stocks;
