import React, { useState, useEffect } from 'react'; 
import './sidebarstock.css'; 
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
      <div className="profil-icon-st">👤</div>
      <div className='username-st'>
         {username} <span className="status-dot-st"></span>
         </div>
      <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
      
    </div>
  );
};

export default Sidebar;
