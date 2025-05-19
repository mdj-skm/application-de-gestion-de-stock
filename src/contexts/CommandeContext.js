import React, { createContext, useState, useEffect } from 'react';

export const CommandeContext = createContext();

export const CommandeProvider = ({ children }) => {
  const [commandes, setCommandes] = useState([]);
  const [commandesValidees, setCommandesValidees] = useState([]);
  const [commandesLivrees, setCommandesLivrees] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [commandeImpression, setCommandeImpression] = useState(null);

    // Nouvel état pour garder la liste des commandes imprimées
   const [commandesImprimees, setCommandesImprimees] = useState(() => {
    const saved = localStorage.getItem('commandesImprimees');
    return saved ? JSON.parse(saved) : [];
  });

   // Garder synchronisé le localStorage à chaque changement de commandesImprimees
  useEffect(() => {
    localStorage.setItem('commandesImprimees', JSON.stringify(commandesImprimees));
  }, [commandesImprimees]);
  
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

  // Fonction pour ajouter une commande à la liste des imprimées
  const ajouterCommandeImprimee = (commande) => {
    setCommandesImprimees(prev => [...prev, commande]);
  };

  return (
    <CommandeContext.Provider value={{
        commandesValidees,
        commandeImpression,
        commandesImprimees,       // expose la liste des commandes imprimées
        ajouterCommandeImprimee,  // expose la fonction pour ajouter une commande imprimée
        setCommandeImpression, // Permet de définir la commande à imprimer
        livrerCommande,

      commandes, commandesValidees, commandesLivrees, historique,
      ajouterCommande, validerCommande, livrerCommande
    }}>
      {children}
    </CommandeContext.Provider>
  );
};
