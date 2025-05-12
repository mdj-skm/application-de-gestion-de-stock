// ConfigurationUI.jsx
import React from 'react';
import './configuration.css';

export default function configuration() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <div>
            <div className="username">Nom d'utilisateur</div>
            <div className="status-indicator"></div>
          </div>
        </div>
        <button className="sidebar-button">Accueil</button>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="logo-section">
            <div className="logo">LOGO</div>
            <div className="company-name">NOM DE L'ENTREPRISE</div>
          </div>
          <button className="refresh-button">Rafraîchir</button>
        </div>

        {/* Configuration section */}
        <div className="configuration-section">
          <h2 className="configuration-title">CONFIGURATION</h2>
          <div className="button-group">
            <button className="config-button">Date début</button>
            <button className="config-button">Date fin</button>
            <button className="config-button">Recherche</button>
          </div>
          {/* Placeholder for content */}
          <div className="placeholder-box"></div>
        </div>
      </div>
    </div>
  );
}
