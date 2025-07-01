import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { StockProvider } from './contexts/StockContext';

// Pages principales
import LoginPage from './connexion/LoginPage'; 
import HomePage from './page_d_accueil/HomePage'; 
import Stocks from "./gestion_stocks/Stocks"; 


// Modules de gestion des commandes
import CreerCommande from "./gestion_commandes/CreerCommande";
import GestionCommandes from "./gestion_commandes/GestionCommandes";
import CommandesEnCours from './gestion_commandes/CommandesEnCours';
import CommandesEnCours2 from './gestion_caisse/CommandesEnCours2';

// Autres modules
import Clients from './gestion_clients/gestion_client'; 
import GestionCaisse from "./gestion_caisse/CommandesEnCours2";
import GestionFournisseurs from "./gestion_fournisseurs/gestion_fournisseurs";
import GestionCorbeil from "./gestion_corbeil/index"
import GestionStatistiques from"./gestion_statistiques/index";
import GestionUtilisateurs from "./gestion_utilisateurs/index";
import Rapports from "./rapports/gestion_rapport"; 
import Configuration from "./configuration/configuration";




import CommandesValidees from './gestion_commandes/CommandesValidees';
import CommandesValidees2 from './gestion_caisse/CommandesValidees2';
import CommandesLivrees from './gestion_commandes/CommandesLivrees';
import CommandesLivrees2 from './gestion_caisse/CommandesLivrees2';
import Imprimer from './gestion_commandes/Imprimer';
import Imprimer2 from './gestion_caisse/Imprimer2';
import HistoriqueCommandes from './gestion_commandes/Historique';
import HistoriqueCommandes2 from './gestion_caisse/Historique2';

// Contexte
import { CommandeProvider } from './contexts/CommandeContext';

function App() {
  const [module, setModule] = useState("creer"); // Par défaut : module 'Créer'
  const [commandes, setCommandes] = useState([]);
  const [username] = useState(sessionStorage.getItem("username") || "Utilisateur");

  return (
    <CommandeProvider>
      <StockProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/page_d_accueil" element={<HomePage />} />

          <Route path="/gestion_fournisseurs" element={
            <PrivateRoute moduleName="Gestion fournisseurs">
            <GestionFournisseurs />
            </PrivateRoute>
            }/>
            
          <Route path="/gestion_clients" element={
            <PrivateRoute moduleName="Gestion client">
            <Clients />
            </PrivateRoute>
            }/>

          <Route path="/gestion_caisse" element={
            <PrivateRoute moduleName="Gestion caisse">
            <GestionCaisse />
            </PrivateRoute>
            }/>

          <Route path="/rapports" element={
            <PrivateRoute moduleName="Rapport">
            <Rapports />
            </PrivateRoute>
            }/>

          <Route path="/gestion_stocks" element={
            <PrivateRoute moduleName="Gestion stocks">
            <Stocks />
            </PrivateRoute>
            } />

          <Route path="/configuration" element={
            <PrivateRoute moduleName="Configuration">
            <Configuration />
            </PrivateRoute>
            }/>

          <Route path="gestion_corbeil" element={
            <PrivateRoute moduleName="Gestion corbeil">
            <GestionCorbeil />
            </PrivateRoute>
            }/>

          <Route path="/gestion_statistiques" element={
            <PrivateRoute moduleName="Gestion statistiques">
            <GestionStatistiques />
            </PrivateRoute>
            }/>
          
          <Route path="/gestion_utilisateurs" element={
            <PrivateRoute moduleName="Gestion utilisateurs">
            <GestionUtilisateurs />
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
       </StockProvider>
    </CommandeProvider>
  );
}

export default App;
