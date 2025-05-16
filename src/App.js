import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Pages principales
import LoginPage from './connexion/LoginPage'; 
import HomePage from './page_d_accueil/HomePage'; 

// Modules de gestion des commandes
import CreerCommande from "./gestion_commandes/CreerCommande";
import GestionCommandes from "./gestion_commandes/GestionCommandes";
import CommandesEnCours from './gestion_commandes/CommandesEnCours';

// Autres modules
import Clients from './gestion_clients/gestion_client'; 
import GestionFournisseurs from "./gestion_fournisseurs/gestion_fournisseurs";
import Rapports from "./rapports/gestion_rapport"; 
import GestionRapport from './rapports/gestion_rapport';
import Configuration from "./configuration/configuration";

import CommandesValidees from './gestion_commandes/CommandesValidees';
import CommandesLivrees from './gestion_commandes/CommandesLivrees';
import Imprimer from './gestion_commandes/Imprimer';
import HistoriqueCommandes from './gestion_commandes/Historique';

// Contexte
import { CommandeProvider } from './contexts/CommandeContext';

function App() {
  const [module, setModule] = useState("creer"); // Par défaut : module 'Créer'
  const [commandes, setCommandes] = useState([]);
  const [username] = useState(sessionStorage.getItem("username") || "Utilisateur");

  return (
    <CommandeProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/page_d_accueil" element={<HomePage />} />
          <Route path="/gestion_clients" element={<Clients />} />
          <Route path="/gestion_fournisseurs" element={<GestionFournisseurs />} />
          <Route path="/rapports" element={<Rapports />} />
          <Route path="/configuration" element={<Configuration />} />
          
         <Route path="/commande/creer" element={<CreerCommande />} />
         <Route path="/gestion_commandes" element={<GestionCommandes />} />
         <Route path="/commandes_en_cours" element={<CommandesEnCours />} />
         <Route path="/commandes_validees" element={<CommandesValidees />} />
         <Route path="/commandes_livrees" element={<CommandesLivrees />} />
         <Route path="/imprimer" element={<Imprimer />} />
         <Route path="/historique" element={<HistoriqueCommandes />} />
       </Routes>
    </CommandeProvider>
  );
}

export default App;
