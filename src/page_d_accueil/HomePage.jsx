import './HomePage.css';
import logo from '../assets/logo.png';
import logoUtilisateurs from '../assets/logo utilisateurs.png'
import logoStatistiques from '../assets/logo statistiques.png'
import logoGestion from '../assets/logo_gestion_commandes.png';
import logoCaisse from '../assets/logo caisse.png';
import logoConfiguration from '../assets/logo_configuration.png';
import logoGestionClients from '../assets/logo_gestion_clients.png';
import logoCorbeil from '../assets/logo corbeil.png';
import logoGestionFournisseurs from '../assets/logo_gestion_fournisseurs.png';
import logoRapports from '../assets/logo_rapports.png';
import logostock from '../assets/logo_stock.png';
import { useNavigate } from 'react-router-dom';
// import React from 'react';
import React, { useState, useEffect } from 'react';

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  // Simulation utilisateur connecté
  const currentUser = {
    // nom: "Utilisateur",
    nom: username || 'Utilisateur',
    modules: [
      "Gestion fournisseurs",
      "Gestion commande",
      "Gestion caisses",
      "Gestion clients",
      "Gestion stocks",
      "Gestion corbeil",
      "Rapport",
      "Gestion statistiques",
      "Configuration",
      "Gestion utilisateurs",
    ]
  };

  
  const handleModuleClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const hasAccessTo = (moduleName) => {
    return currentUser.modules.includes(moduleName);
  };

  return (
    <div className="home-container">
      <div className="sidebarH">
        <div className="profile-section">
          <div className="profile-iconH">👤</div>
          <div className="usernameH">
            {currentUser.nom} <span className="status-dotH"></span>
          </div>
        </div>
        <button className="menu-buttonH active">Accueil</button>
        <button className="logout-buttonH" onClick={handleLogout}>Se déconnecter</button>
      </div>

      <div className="block">
        <div className="headerH">
        <img src={logo} alt="Logo" className="logoH" />
        <div className="company-name"><h1>G.E.S</h1></div>
        </div>


        <div className="H2">
          <h2>Choisissez votre module</h2>
          <hr class="magic-bar" />
        </div>

        <div className="module-section">
          
          {hasAccessTo("Gestion fournisseurs") && (
            <div className="module-box" onClick={() => handleModuleClick('/gestion_fournisseurs')}>
              <img src={logoGestionFournisseurs} alt="Module Gestion" className="module-logo" />
              <h3>Gestion fournisseurs</h3>
              <p>La gestion des fournisseurs</p>
            </div>
          )}

          {hasAccessTo("Gestion commande") && (
            <div className="module-box" onClick={() => handleModuleClick('/gestion_commandes')}>
              <img src={logoGestion} alt="Module Gestion" className="module-logo" />
              <h3>Gestion commandes</h3>
              <p>La gestion des commandes</p>
            </div>
          )}

          {hasAccessTo("Gestion caisses") && (
            <div className="module-box" onClick={() => handleModuleClick('/gestion_caisse')}>
              <img src={logoCaisse} alt="Module Gestion" className="module-logo" />
              <h3>Gestion caisse</h3>
              <p>La gestion des caisses</p>
            </div>
          )}

          {hasAccessTo("Gestion clients") && (
            <div className="module-box" onClick={() => handleModuleClick('/gestion_clients')}>
              <img src={logoGestionClients} alt="Module Gestion" className="module-logo" />
              <h3>Gestion clients</h3>
              <p>La gestion des clients</p>
            </div>
          )}

          {hasAccessTo("Gestion stocks") && (
            <div className="module-box" onClick={() => handleModuleClick('/gestion_stocks')}>
              <img src={logostock} alt="Module Gestion" className="module-logo" />
              <h3>Stock</h3>
              <p>Stocks</p>
            </div>
          )}

          {hasAccessTo("Gestion corbeil") && (
            <div className="module-box" onClick={() => handleModuleClick('/gestion_corbeil')}>
              <img src={logoCorbeil} alt="Module Gestion" className="module-logo" />
              <h3>Corbeille</h3>
              <p>La gestion de la Corbeille</p>
            </div>
          )}



          {hasAccessTo("Rapport") && (
            <div className="module-box" onClick={() => handleModuleClick('/rapports')}>
              <img src={logoRapports} alt="Module Gestion" className="module-logo" />
              <h3>Rapport</h3>
              <p>Rapports</p>
            </div>
          )}


          {hasAccessTo("Gestion statistiques") && (
            <div className="module-box" onClick={() => handleModuleClick('/gestion_statistiques')}>
              <img src={logoStatistiques} alt="Module Gestion" className="module-logo" />
              <h3>Gestion statistiques</h3>
              <p>La gestion des statistiques</p>
            </div>
          )}

          

          {hasAccessTo("Configuration") && (
            <div className="module-box" onClick={() => handleModuleClick('/configuration')}>
              <img src={logoConfiguration} alt="Module Gestion" className="module-logo" />
              <h3>Configuration</h3>
              <p>Configuration</p>
            </div>
          )}

          {hasAccessTo("Gestion utilisateurs") && (
            <div className="module-box" onClick={() => handleModuleClick('/gestion_utilisateurs')}>
              <img src={logoUtilisateurs} alt="Module Gestion" className="module-logo" />
              <h3>Gestion utilisateurs</h3>
              <p>La gestion des utilisateurs</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default HomePage;
