import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css';
import logo from '../assets/logo.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Récupérer la liste des utilisateurs depuis localStorage
    const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];

    // Chercher un utilisateur avec le même nom ET mot de passe
    const utilisateurTrouve = utilisateurs.find(
      u => u.nom === username && u.motDePasse === password
    );

    if (utilisateurTrouve) {
      // Stocker nom et modules dans localStorage
      localStorage.setItem('username', utilisateurTrouve.nom);
      localStorage.setItem('modules_autorises', JSON.stringify(utilisateurTrouve.modules));
      setErreur('');
      navigate('/page_d_accueil');  // Redirection vers la page d’accueil
    } else {
      setErreur("Nom d’utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-containerL">
      <div className="blockL">
        <div className="headerL">
          <img src={logo} alt="Logo" className="logoL" />
          <div className="company-nameL"><h1>G.E.S</h1></div>
        </div>

        <div className="login-form">
          <h2>Connectez vous</h2>
          <hr className="magic-bar" />
          {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
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
