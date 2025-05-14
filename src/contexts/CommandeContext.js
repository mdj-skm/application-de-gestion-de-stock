import React, { createContext, useState } from 'react';

export const CommandeContext = createContext();

export const CommandeProvider = ({ children }) => {
  const [commandes, setCommandes] = useState([]);
  const [commandesValidees, setCommandesValidees] = useState([]);
  const [commandesLivrees, setCommandesLivrees] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [commandeImpression, setCommandeImpression] = useState(null);

  const ajouterCommande = (commande) => {
    setCommandes([...commandes, commande]);
    setHistorique(prev => [...prev, { ...commande, statut: 'En cours' }]);
  };

  const validerCommande = (index) => {
    const commande = commandes[index];
    setCommandes(commandes.filter((_, i) => i !== index));
    setCommandesValidees([...commandesValidees, commande]);
    setHistorique(prev => [...prev, { ...commande, statut: 'Validée' }]);
  };

  const livrerCommande = (index) => {
    const commande = commandesValidees[index];
    setCommandesValidees(commandesValidees.filter((_, i) => i !== index));
    setCommandesLivrees([...commandesLivrees, commande]);
    setHistorique(prev => [...prev, { ...commande, statut: 'Livrée' }]);
    setCommandeImpression(commande);
  };

  return (
    <CommandeContext.Provider value={{
        commandesValidees,
        commandeImpression,
        commandeImpression,
        setCommandeImpression, // Permet de définir la commande à imprimer
        livrerCommande,

      commandes, commandesValidees, commandesLivrees, historique,
      ajouterCommande, validerCommande, livrerCommande
    }}>
      {children}
    </CommandeContext.Provider>
  );
};
