import React from 'react';
import { useNavigate } from 'react-router-dom';
import './client_style.css';


const Clients = () => {
  const navigate = useNavigate();

  // ✅ Définition de la fonction
  const handleGestionClick = () => {
    navigate('/gestion-client');
  };

  return (
    <div className="container">
      <aside className="sidebar">
        {/* ... barre latérale ... */}
      </aside>

      <header className="header">
        {/* ... logo et nom entreprise ... */}
      </header>

      <main className="main-content">
        <h1>Choisissez votre module</h1>

        {/* ✅ Appel de la fonction définie */}
        <div className="module-box" onClick={handleGestionClick} style={{ cursor: 'pointer' }}>
          <h2>Gestion client</h2>
          <p>La gestion des clients</p>
        </div>
      </main>
    </div>
  );
};

export default Clients;
