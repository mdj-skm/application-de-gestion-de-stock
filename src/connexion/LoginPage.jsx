import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css';
import logo from '../assets/logo.png'; // Ajoute ton logo ici



function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    alert(`Connexion réussie`);
    // Ici tu peux ajouter une vraie vérification plus tard
    if (username && password) {
      localStorage.setItem('username', username); // très important !
      navigate('./page_d_accueil');
    } else {
      alert('Veuillez entrer votre nom d’utilisateur et mot de passe.');
    }
  

    // Tu peux ajouter ici la logique d'authentification
  };

  return (
    <div className="login-container">
      <div className="sidebar">
        <div className="profile-icon">👤</div>
      </div>

      <div className="main-content">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name">G E S</div>
        </div>

        <div className="login-form">
          <h2>Connectez vous</h2>
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

export default LoginPage;
