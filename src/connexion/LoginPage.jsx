import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css';
import logo from '../assets/logo.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // On stocke juste un nom d’utilisateur pour l’exemple
    localStorage.setItem('username', username);

    // 👉 Redirection immédiate sans aucune vérification
    navigate('/page_d_accueil');
  };

  return (
    <div className="login-containerL">
      <div className="sidebarL">
        <div className="profile-iconL">👤</div>
      </div>

      <div className="blockL">
        <div className="headerL">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-nameL"><h1>G.E.S</h1></div>
        </div>

        <div className="login-form">
          <h2>Connectez vous</h2>
          <hr class="magic-bar" />
          <input
            type="text"
            placeholder="Nom d’utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>se connecter</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
