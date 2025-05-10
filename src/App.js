
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './connexion/LoginPage'; 
import HomePage from './page_d_accueil/HomePage'; 
import React, { useState } from "react";
import Sidebar from "./gestion_commandes/Sidebar";
import CreerCommande from "./gestion_commandes/CreerCommande";
import Imprimer from "./gestion_commandes/Imprimer";
import Historique from "./gestion_commandes/Historique";
import Accueil from "./gestion_commandes/Accueil";
import RechercheBar from "./gestion_commandes/RechercheBar";









function GestionCommandes() {
  const [module, setModule] = useState("accueil");
  const [commande, setCommande] = useState(null);
  const [recherche, setRecherche] = useState("");
  


  const renderContent = () => {
    switch (module) {
      case "creer":
        return <CreerCommande setCommande={setCommande} />;
      case "imprimer":
        return <Imprimer commande={commande} />;
      case "historique":
        return <Historique recherche={recherche} />;
      default:
        return <Accueil />;
    }
  };

  return (
    <div className="app">
      <Sidebar setModule={setModule} />
      <div className="main-content">
        <h2>GESTION DES COMMANDES</h2>
        <RechercheBar setRecherche={setRecherche} />
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/page_d_accueil" element={<HomePage />} />
        <Route path="/gestion_commandes" element={<GestionCommandes />} />
      </Routes>
    
  );
}

export default App;

