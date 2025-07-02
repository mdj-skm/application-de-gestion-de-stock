// src/components/Layout.js
import React from 'react';
import './Layout.css'; // le fichier CSS avec tes styles

const Layout = ({ children }) => {
  return (
    <div className="block">
      <div className="headerH">
        <h1>Nom du Projet ou Logo</h1>
      </div>

      <div className="magic-bar"></div>

      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
