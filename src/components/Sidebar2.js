import React, { useContext, useState, useEffect } from 'react'; 
import { CommandeContext } from '../contexts/CommandeContext';
import { CaisseContext } from '../contexts/CaisseContext'; // ➕ Importer le contexte caisse
import './Sidebar2.css'; 
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const { viderToutesLesDonnees } = useContext(CommandeContext);
  const { viderCaisse } = useContext(CaisseContext); // ➕ Utiliser la fonction viderCaisse

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleReset = () => {
    viderToutesLesDonnees();
    viderCaisse(); // ➕ Réinitialise aussi la caisse
    alert("Toutes les données ont été réinitialisées.");
  };

  return (
    <div className="sidebar2">
      <div className="user-iconSI2">👤</div>
      <div className='usernameSI2'>
        {username} <span className="status-dot2"></span>
      </div>
      <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
      <button className="btn" onClick={() => navigate('/commandes_en_cours2')}>Commandes en cours</button>
      <button className="btn" onClick={() => navigate('/commandes_validees2')}>Commandes validées</button>
      <button className="btn" onClick={() => navigate('/commandes_livrees2')}>Commandes effectuées</button>
      <button className="btn" onClick={() => navigate('/historique2')}>Voir Historique</button>
      <button className="btn" onClick={handleReset}>Réinitialiser</button> 
      <button className="btn" onClick={() => navigate('/imprimer2')}>Imprimé</button>
    </div>
  );
};

export default Sidebar;
