import React from 'react';
import './HomePage.css';
import logo from '../assets/logo.png'; // Ton logo principal
import logoGestion from '../assets/logo_gestion_commandes.png'; // Logo module

function HomePage() {
  const username = 'Nom d’utilisateur'; // Tu peux le rendre dynamique

  const handleModuleClick = () => {
    alert('Redirection vers le module de gestion des commandes...');
    // Tu peux ici utiliser useNavigate pour aller sur une autre page/module
  };

  const handleLogout = () => {
    alert('Déconnexion...');
    // Redirection vers login ou suppression du token
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-icon">👤</div>
          <div className="username">
            {username} <span className="status-dot"></span>
          </div>
        </div>

        <button className="menu-button active">Accueil</button>
        <button className="logout-button" onClick={handleLogout}>se deconnecter</button>
      </div>

      <div className="main-content">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name">G E S</div>
        </div>

        <div className="module-section">
          <h2>Choisissez votre module</h2>
          <div className="module-box" onClick={handleModuleClick}>
            <img src={logoGestion} alt="Module Gestion" className="module-logo" />
            <h3>Gestion commandes</h3>
            <p>La gestion des commandes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;