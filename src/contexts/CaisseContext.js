import React, { createContext, useState, useEffect } from 'react';

export const CaisseContext = createContext();

export const CaisseProvider = ({ children }) => {
  const [caisse, setCaisse] = useState(() => {
    const data = localStorage.getItem('caisseData');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('caisseData', JSON.stringify(caisse));
  }, [caisse]);

  const ajouterPaiement = (montant) => {
    const nouveauPaiement = {
      montant,
      date: new Date().toISOString(),
    };
    setCaisse(prev => [...prev, nouveauPaiement]);
  };

  const viderCaisse = () => {
    setCaisse([]);
    localStorage.removeItem('caisseData');
  };

  return (
    <CaisseContext.Provider value={{ caisse, ajouterPaiement, viderCaisse }}>
      {children}
    </CaisseContext.Provider>
  );
};
