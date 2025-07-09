import React, { useEffect, useState } from 'react';
import './index.css';
import profileImage from '../assets/profil_utilisateur.png'; 
import Sidebar from '../components/sidebarutilisateur'; 
import logo from '../assets/logo.png';


const HistoriqueConnexionDeconnexion = () => {
  const [connexions, setConnexions] = useState([]);
  const [deconnexions, setDeconnexions] = useState([]);

  useEffect(() => {
    const connexionsStockees = JSON.parse(localStorage.getItem('historiqueConnexions')) || [];
    const deconnexionsStockees = JSON.parse(localStorage.getItem('historiqueDeconnexions')) || [];
    setConnexions(connexionsStockees);
    setDeconnexions(deconnexionsStockees);
  }, []);

  return (
    
    <div className="historique-container" style={{ display: 'flex', gap: '2rem' }}>
        <div className="sidebarU">
        <Sidebar />
      </div>
      <div className="headerST">
                <img src={logo} alt="Logo" className="logoST" />
                <div className="company-nameCL"><h1>G.E.S</h1></div>
              </div>
      <div className="colonne">
        <h2>📥 Connexions</h2>
        {connexions.length === 0 && <p>Aucune connexion enregistrée.</p>}
        {connexions.map(({ nom, heureConnexion }, index) => (
          <div key={index} className="card">
            <img src={profileImage} alt={nom} className="avatar" />
            <p><strong>{nom}</strong></p>
            <p>: Connecté à : {heureConnexion}</p>
          </div>
        ))}
      </div>

      <div className="colonne2">
        <h2>📤 Déconnexions</h2>
        {deconnexions.length === 0 && <p>Aucune déconnexion enregistrée.</p>}
        {deconnexions.map(({ nom, heureDeconnexion }, index) => (
          <div key={index} className="card">
            <img src={profileImage} alt={nom} className="avatar" />
            <p><strong>{nom}  </strong></p>
            <p>: Déconnecté à : {heureDeconnexion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoriqueConnexionDeconnexion;
