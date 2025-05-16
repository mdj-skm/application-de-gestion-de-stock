
import './HomePage.css';
import logo from '../assets/logo.png';
import logoGestion from '../assets/logo_gestion_commandes.png';
import logoConfiguration from '../assets/logo_configuration.png';
import logoGestionClients from '../assets/logo_gestion_clients.png';
import logoGestionFournisseurs from '../assets/logo_gestion_fournisseurs.png';
import logoRapports from '../assets/logo_rapports.png';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (!savedUsername) {
      navigate('/');
    } else {
      setUsername(savedUsername);
    }
  }, [navigate]);

  if (username === null) {
    return null; // ou "Chargement..." si tu préfères
  }

  const handleModuleClick = (path) => {
    
    navigate(path);
  };


  const handleLogout = () => {
    alert('Déconnexion...');
    localStorage.removeItem('username');
    navigate('/');
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
        <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
      </div>

      <div className="main-content">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>

        <div className="H2">
          <h2>Choisissez votre module</h2>
        </div>
        <div className="module-section">
          {/* <h2>Choisissez votre module</h2> */}

          <div className="module-box" onClick={() => handleModuleClick('/gestion_clients')}>
          <img src={logoGestionClients} alt="Module Gestion" className="module-logo" />
          <h3>Gestion clients</h3>
          <p>La gestion des clients</p>
          </div>

        

        
          <div className="module-box" onClick={() => handleModuleClick('/gestion_fournisseurs')}>
          <img src={logoGestionFournisseurs} alt="Module Gestion" className="module-logo" />
          <h3>Gestion fournisseurs</h3>
          <p>La gestion des fournisseurs</p>
        </div>
        

        
          <div className="module-box" onClick={() => handleModuleClick('/gestion_commandes')}>
          <img src={logoGestion} alt="Module Gestion" className="module-logo" />
          <h3>Gestion commandes</h3>
          <p>La gestion des commandes</p>
        </div>
        

        
          <div className="module-box" onClick={() => handleModuleClick('/rapports')}>
          <img src={logoRapports} alt="Module Gestion" className="module-logo" />
          <h3>Rapport</h3>
          <p>Rapports</p>
        </div>
        

        
          <div className="module-box" onClick={() => handleModuleClick('/configuration')}>
          <img src={logoConfiguration} alt="Module Gestion" className="module-logo" />
          <h3>Configuration</h3>
          <p>Configuration</p>
        </div>
        </div>



        
        


      </div>
    </div>
  );
}


export default HomePage;