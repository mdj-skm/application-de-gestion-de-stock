import React, { useState, useEffect } from 'react'; 
import './sidebarutilisateur.css'; 
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

  const handleReset = () => {
    const confirmation = window.confirm("Voulez-vous vraiment réinitialiser toutes les informations ?");
    if (confirmation) {
      // Effacer uniquement les infos liées aux utilisateurs
      localStorage.removeItem('username'); 
      localStorage.removeItem('historiqueConnexions');
      localStorage.removeItem('historiqueDeconnexions');
      // Tu peux ajouter ici d'autres clés à réinitialiser si besoin

      // Optionnel : recharger la page ou naviguer vers l’accueil
      window.location.reload();
    }
  };

  return (
    <div className="sidebarU">
      <div className="profil-iconU">👤</div>
      <div className='username-SU'>
         {username} <span className="status-dot-SU"></span>
         </div>
      <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
      <button onClick={handleReset} className="reset-buttonU">Réinitialiser</button>
    </div>
  );
};

export default Sidebar;
