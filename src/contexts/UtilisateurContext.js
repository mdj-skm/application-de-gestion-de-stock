// contexts/UtilisateurContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UtilisateurContext = createContext();

export const UtilisateurProvider = ({ children }) => {
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('utilisateurs');
    if (saved) setUtilisateurs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
  }, [utilisateurs]);

  const ajouterUtilisateur = (user) => {
    setUtilisateurs(prev => [...prev, user]);
  };

  const supprimerUtilisateur = (id) => {
    setUtilisateurs(prev => prev.filter(u => u.id !== id));
  };

  return (
    <UtilisateurContext.Provider value={{ utilisateurs, ajouterUtilisateur, supprimerUtilisateur }}>
      {children}
    </UtilisateurContext.Provider>
  );
};
