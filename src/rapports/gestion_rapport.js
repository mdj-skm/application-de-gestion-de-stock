// src/rapports/gestion_rapport.js
import React, { useState } from 'react';
import './gestion_rapport.css';
import { useNavigate } from 'react-router-dom';

const GestionRapport = () => {
  const navigate = useNavigate();
  const [selectedRapport, setSelectedRapport] = useState('');

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
        <button className="nav-acceuil">Se déconnecter</button>
      </aside>

      <div className="rapport-main">
        <header className="rapport-header">
          <div className="logo">LOGO</div>
          <div className="company-name">GES</div>
        </header>

        <div className="rapport-body">
          <h2>RAPPORT</h2>

          <div className="filter-bar">
            <div className="left-filters">
              <div className="date-group">
                <label htmlFor="start-date">Date de début</label>
                <input type="date" id="start-date" className="date-input" />
              </div>
              <div className="date-group">
                <label htmlFor="end-date">Date de fin</label>
                <input type="date" id="end-date" className="date-input" />
              </div>
              <div className="search-group">
                <input
                  type="text"
                  id="search-input"
                  className="search-input"
                  placeholder="Rechercher"
                />
              </div>
            </div>
            <div className="action-buttons">
              <button className="refresh-button">Rafraîchir</button>
            </div>
          </div>

          {/* Liste déroulante des types de rapports */}
          <div className="rapport-dropdown-container">
            <select
              className="rapport-dropdown"
              value={selectedRapport}
              onChange={(e) => setSelectedRapport(e.target.value)}
            >
              <option value="">-- Sélectionner un rapport --</option>
              <option value="clients">Rapport Gestions Clients</option>
              <option value="fournisseurs">Rapports gestion fournisseurs</option>
              <option value="commandes">Rapports gestion commandes</option>
            </select>
          </div>

          <div className="rapport-content">
            {/* Contenu dynamique selon le rapport sélectionné */}
            {selectedRapport === 'clients' && <p>Affichage du rapport de gestion des clients.</p>}
            {selectedRapport === 'fournisseurs' && <p>Affichage du rapport de gestion des fournisseurs.</p>}
            {selectedRapport === 'commandes' && <p>Affichage du rapport de gestion des commandes.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionRapport;
