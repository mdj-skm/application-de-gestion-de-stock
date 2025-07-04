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
      <div className="profil-iconCM">👤</div>
      {username} <span className="status-dot"></span>
      <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
      
    </div>
  );
};

export default Sidebar;
