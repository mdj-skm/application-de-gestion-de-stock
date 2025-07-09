import React, { useContext } from 'react';
// import { CommandeContext } from '../contexts/CommandeContext';
import { StockContext } from '../contexts/StockContext';
import { CaisseContext } from '../contexts/CaisseContext';
// import { UtilisateurContext } from '../contexts/UtilisateurContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart2 } from 'lucide-react';
import logo from '../assets/logo.png';
import './statistiques.css';
import Sidebar from '../components/sidebarstock'; 

const couleurs = ['#3498db', '#e67e22', '#2ecc71', '#9b59b6'];

export default function Statistiques() {
  // const { commandes } = useContext(CommandeContext);
  const { fournisseurs } = useContext(StockContext);
  const { caisse } = useContext(CaisseContext);
  // const { utilisateurs } = useContext(UtilisateurContext);

  const totalCaisse = caisse.reduce((acc, p) => acc + Number(p.montant), 0);
  // const totalCommandes = commandes.length;
  // const totalUtilisateurs = utilisateurs.length;
  const totalStock = fournisseurs.reduce((acc, f) =>
    acc + f.produits.reduce((a, p) => a + Number(p.quantite_restante ?? p.quantite), 0), 0
  );

  const data = [
    { nom: 'Caisse', valeur: totalCaisse },
    // { nom: 'Commandes', valeur: totalCommandes },
    // { nom: 'Utilisateurs', valeur: totalUtilisateurs },
    { nom: 'Stocks', valeur: totalStock },
  ];

  return (
    <div className="container-o">
      <div className="sidebarST">
        <Sidebar />
      </div>
      <div className="main-content-o">
        <div className="header-o">
          <img src={logo} alt="Logo" className="logo-o" />
          <h1 className="company-name-o">G.E.S</h1>
        </div>

        <div className="stats-title-container-o">
          <BarChart2 className="stats-icon-o clignote-o" color="#ff7f50" />
          <h2 className="stats-title-o">
            <span className="green-letter-o">S</span>tatistique{" "}
            <span className="orange-letter-o">G</span>énérale
          </h2>
        </div>

        <div className="graph-container-o">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nom" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valeur" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={couleurs[index % couleurs.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
