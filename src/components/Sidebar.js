import React, { useState, useEffect } from 'react'; 
import './Sidebar.css'; 
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
      <button onClick={() => navigate('/commande/creer')}>Créer une commande</button>
      <button onClick={() => navigate('/commandes_en_cours')}>Commandes en cours</button>
      <button onClick={() => navigate('/commandes_validees')}>Commandes validées</button>
      <button onClick={() => navigate('/commandes_livrees')}>Commandes livrées</button>
      <button onClick={() => navigate('/imprimer')}>Imprimer</button>
      <button onClick={() => navigate('/historique')}>Voir historique</button>
      <button onClick={() => window.location.reload()}>Reinitialise</button>
    </div>
  );
};

export default Sidebar;
