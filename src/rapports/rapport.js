import React from 'react';
import './rapport.css';
import { useNavigate } from 'react-router-dom';

const Rapport = () => {
  const navigate = useNavigate();

  return (
    <div className="rapport-container">
      {/* Sidebar */}
      <aside className="rapport-sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <p className="username">Nom d'utilisateur</p>
          <div className="status-indicator" />
        </div>
        <button className="nav-button">Accueil</button>
        <button className="logout-button">Se déconnecter</button>
      </aside>

      {/* Header + Main */}
      <header className="rapport-header">
        <div className="logo">LOGO</div>
        <div className="company-name">GEs</div>
      </header>

      <main className="rapport-main-content">
        <div className="module-box" onClick={() => navigate('/rapport/gestion')}>
          <h2>Rapport</h2>
          <p>Les rapports</p>
        </div>
      </main>
    </div>
  );
};

export default Rapport;
