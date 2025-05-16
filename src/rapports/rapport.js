import React, { useState, useEffect } from 'react';
import './rapport.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './gestion_rapport.css';



const Rapport = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    setUsername(savedUsername);
  }
  }, []);


  const navigate = useNavigate();
  const handleLogout = () => {
    alert('Déconnexion...');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="rapport-container">
      {/* Sidebar */}
      <aside className="rapport-sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <div>{username}</div>
          <div className="status-indicator" />
        </div>
        <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
        {/* <button className="nav-button">Accueil</button> */}
        {/* <button className="logout-button">Se déconnecter</button> */}
        <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
      </aside>

      {/* Header + Main */}
      <header className="rapport-header">
       <img src={logo} alt="Logo" className="logo" />
       <div className="company-name"><h1>G.E.S</h1></div>
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
