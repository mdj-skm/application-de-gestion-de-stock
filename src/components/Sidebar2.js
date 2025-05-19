import React, { useState, useEffect } from 'react'; 
import './Sidebar2.css'; 
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="sidebar">
      <div className="user-icon">👤</div>
      {username} <span className="status-dot"></span>
      <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
      <button className="btn" onClick={() => navigate('/commandes_en_cours2')}>Commande en attente</button>
        <button className="btn" onClick={() => navigate('/commandes_validees2')}>Commande validée</button>
        <button className="btn" onClick={() => navigate('/commandes_livrees2')}>Commande effectuée</button>
        <button className="btn" onClick={() => navigate('/imprimer2')}>Imprimé</button>
        <button className="btn" onClick={() => navigate('/historique2')}>Voir Historique</button>
        <button className="btn">Rapport</button>
      {/* <button onClick={() => window.location.reload()}>Reinitialise</button> */}
    </div>
  );
};

export default Sidebar;
