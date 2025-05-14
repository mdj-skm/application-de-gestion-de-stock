import React, { useState } from 'react';
import './gestion_fournisseurs.css';

export default function GestionFournisseurs() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <div>Non d’utilisateur</div>
          <div className="status-dot"></div>
        </div>
        <button className="btn">Accueil</button>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="logo">LOGO</div>
          <div className="company-name">NOM DE L'ENTREPRISE</div>
        </div>

        {/* Gestion fournisseurs */}
        <div className="content">
          <div className="top-bar">
            <h2>GESTION DES FOURNISSEURS</h2>
            <button className="btn">Rafraîchir</button>
          </div>

          {/* Filtres */}
          <div className="filters">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-date"
              placeholder="Date début"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-date"
              placeholder="Date fin"
            />
            <button className="btn">Recherche</button>
          </div>

          {/* Table placeholder */}
          <div className="data-table">
            {/* Données des fournisseurs ici */}
          </div>
        </div>
      </div>
    </div>
  );
}
