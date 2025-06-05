import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// Pages principales
import LoginPage from './connexion/LoginPage'; 
import HomePage from './page_d_accueil/HomePage'; 

// Modules de gestion des commandes
import CreerCommande from "./gestion_commandes/CreerCommande";
import GestionCommandes from "./gestion_commandes/GestionCommandes";
import CommandesEnCours from './gestion_commandes/CommandesEnCours';
import CommandesEnCours2 from './gestion_fournisseurs/CommandesEnCours2';

// Autres modules
import Clients from './gestion_clients/gestion_client'; 
import GestionFournisseurs from "./gestion_fournisseurs/gestion_fournisseurs";
import Rapports from "./rapports/gestion_rapport"; 
import GestionRapport from './rapports/gestion_rapport';
import Configuration from "./configuration/configuration";

import CommandesValidees from './gestion_commandes/CommandesValidees';
import CommandesValidees2 from './gestion_fournisseurs/CommandesValidees2';
import CommandesLivrees from './gestion_commandes/CommandesLivrees';
import CommandesLivrees2 from './gestion_fournisseurs/CommandesLivrees2';
import Imprimer from './gestion_commandes/Imprimer';
import Imprimer2 from './gestion_fournisseurs/Imprimer2';
import HistoriqueCommandes from './gestion_commandes/Historique';
import HistoriqueCommandes2 from './gestion_fournisseurs/Historique2';

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

          <Route path="/gestion_clients" element={
            <PrivateRoute moduleName="Gestion client">
            <Clients />
            </PrivateRoute>
            }/>

          <Route path="/gestion_fournisseurs" element={
            <PrivateRoute moduleName="Gestion fournisseurs">
            <GestionFournisseurs />
            </PrivateRoute>
            }/>

          <Route path="/rapports" element={
            <PrivateRoute moduleName="Rapport">
            <Rapports />
            </PrivateRoute>
            }/>

          <Route path="/configuration" element={
            <PrivateRoute moduleName="Configuration">
            <Configuration />
            </PrivateRoute>
            }/>
          
         <Route path="/commande/creer" element={<CreerCommande />} />

         <Route path="/gestion_commandes" element={
          <PrivateRoute moduleName="Gestion commande">
          <GestionCommandes />
          </PrivateRoute>
          }/>

         <Route path="/commandes_en_cours" element={<CommandesEnCours />} />
         <Route path="/commandes_en_cours2" element={<CommandesEnCours2 />} />
         <Route path="/commandes_validees" element={<CommandesValidees />} />
         <Route path="/commandes_validees2" element={<CommandesValidees2 />} />
         <Route path="/commandes_livrees" element={<CommandesLivrees />} />
         <Route path="/commandes_livrees2" element={<CommandesLivrees2 />} />
         <Route path="/imprimer" element={<Imprimer />} />
         <Route path="/imprimer2" element={<Imprimer2 />} />
         <Route path="/historique" element={<HistoriqueCommandes />} />
         <Route path="/historique2" element={<HistoriqueCommandes2 />} />
       </Routes>
    </CommandeProvider>
  );
}

export default App;
