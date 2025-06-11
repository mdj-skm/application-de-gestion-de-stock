import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css';
import logo from '../assets/logo.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/configuration/login_custom/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
  localStorage.setItem('username', username);
  localStorage.setItem('user_data', JSON.stringify(data.user));
  localStorage.setItem('utilisateurs', JSON.stringify([data.user])); // <-- important
  navigate('/page_d_accueil');
}

 else {
        alert(data.message || "Nom d'utilisateur ou mot de passe incorrect !");
      }
    } catch (error) {
      alert("Erreur lors de la connexion. Veuillez réessayer plus tard.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="sidebar">
        <div className="profile-icon">👤</div>
      </div>

      <div className="main-content">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
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

export default LoginPage;
