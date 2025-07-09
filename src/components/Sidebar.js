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
    <div className="sidebarCM">
      <div className="profil-iconSI2">👤</div>
      <div className='usernameSI2'>
        {username} <span className="status-dotSI2"></span>
      </div>
      
      <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
      <button onClick={() => navigate('/commande/creer')}>Créer une commande</button>
      <button onClick={() => navigate('/commandes_en_cours')}>Commandes en cours</button>
      <button onClick={() => navigate('/commandes_livrees')}>Commandes livrées</button>
    </div>
  );
};

export default Sidebar;
