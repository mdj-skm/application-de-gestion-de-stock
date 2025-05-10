import React, { useState, useEffect } from 'react'; 
import './Sidebar.css'; 
import { useNavigate } from 'react-router-dom'; // 👉 Import de useNavigate

const Sidebar = ({ setModule }) => {
    const navigate = useNavigate(); // 👉 Initialisation du hook
    const [username, setUsername] = useState('');

    useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  return (
    <div className="sidebar">
      {username} <span className="status-dot"></span>
      <br></br>
      <br></br>
      <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
      <button onClick={() => setModule("creer")}>Créer une commande</button>
      <button onClick={() => setModule("imprimer")}>Imprimer</button>
      <button onClick={() => setModule("historique")}>Voir historique</button>
      <button onClick={() => window.location.reload()}>Retour</button>
    </div>
  );
};

export default Sidebar;