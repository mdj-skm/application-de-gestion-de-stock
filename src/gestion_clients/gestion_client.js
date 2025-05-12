import React from 'react';
import './gestion_client.css';

const GestionClient = () => {
  return (
    <div className="gc-container">
      <aside className="gc-sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <p className="username">Nom d'utilisateur</p>
          <div className="status-indicator" />
        </div>
        <button className="nav-button">Accueil</button>
      </aside>

      <header className="gc-header">
        <div className="logo">LOGO</div>
        <div className="company-name">NOM DE L'ENTREPRISE</div>
      </header>

      <main className="gc-main-content">
        <div className="top-bar">
          <h2>GESTION CLIENTS</h2>
          <button className="refresh-button">Rafraîchir</button>
        </div>

        <div className="filter-bar">
          <input type="date" className="date-input" placeholder="Date début" />
          <input type="date" className="date-input" placeholder="Date fin" />
          <button className="search-button">Recherche</button>
        </div>

        <div className="data-display">
          {/* Zone de résultats clients */}
        </div>
      </main>
    </div>
  );
};

export default GestionClient;
