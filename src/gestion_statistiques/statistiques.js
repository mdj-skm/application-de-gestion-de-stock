import React from 'react';
import './statistiques.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BarChart2 } from 'lucide-react';

const data = [
  { nom: 'Caisse', valeur: 150 },
  { nom: 'Commandes', valeur: 254 },
  { nom: 'Utilisateurs', valeur: 38 },
  { nom: 'Stocks', valeur: 127 },
];

const couleurs = ['#3498db', '#e67e22', '#2ecc71', '#9b59b6'];

export default function Statistiques() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Utilisateur";

  return (
    <div className="container-o">
      <div className="sidebar-o">
        <div className="user-info-o">
          <div className="user-icon-o">👤</div>
          <div>{username}</div>
          <div className="status-dot-o"></div>
        </div>
        <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
        <button>Statistiques</button>
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

        <div className="legend-stats-o">
          {data.map((item, index) => (
            <div className="legend-item-o" key={index}>
              <span
                className="color-box-o"
                style={{ backgroundColor: couleurs[index % couleurs.length] }}
              ></span>
              {item.nom}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}