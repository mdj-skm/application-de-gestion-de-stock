// src/rapports/gestion_rapport.js
import React from 'react';
import './gestion_rapport.css';
import { useNavigate } from 'react-router-dom';

const GestionRapport = () => {
  const navigate = useNavigate();

  return (
    <div className="rapport-container">
      <aside className="rapport-sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <p className="username">Nom d'utilisateur</p>
          <div className="status-indicator" />
        </div>
        <button className="nav-button" onClick={() => navigate('/page_d_accueil')}>
          Accueil
        </button>
      </aside>

      <div className="rapport-main">
        <header className="rapport-header">
          <div className="logo">LOGO</div>
          <div className="company-name">NOM DE L'ENTREPRISE</div>
          <button className="refresh-button">Rafraîchir</button>
        </header>

        <div className="rapport-body">
          <h2>RAPPORT</h2>
          <div className="filter-bar">
            <button className="filter-button">Date début</button>
            <button className="filter-button">Date fin</button>
            <button className="filter-button">Recherche</button>
          </div>
          <div className="rapport-content">
            {/* Contenu des rapports à insérer ici */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionRapport;
