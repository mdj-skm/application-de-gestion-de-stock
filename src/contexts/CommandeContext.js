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

  // Synchronisation localStorage commandesImprimees
  useEffect(() => {
    localStorage.setItem('commandesImprimees', JSON.stringify(commandesImprimees));
  }, [commandesImprimees]);

  // Ajouter une commande
  const ajouterCommande = (commande) => {
    setCommandes(prev => [...prev, commande]);
    setHistorique(prev => [...prev, { ...commande, statut: 'En cours' }]);
  };

  // Vider toutes les commandes à imprimer (réinitialiser)
  const viderCommandesAImprimer = () => {
    setCommandeImpression(null);
    setCommandesImprimees([]);
    localStorage.removeItem('commandeImpression');
    localStorage.removeItem('commandesImprimees');
  };

  // Valider une commande
  const validerCommande = (index) => {
    const commande = commandes[index];
    const prixUnitaire = commande.prixUnitaire ?? commande.prix_unitaire ?? 0;
    const prixTotal = prixUnitaire * commande.quantite;

    const commandeAvecPrix = {
      ...commande,
      prixUnitaire,
      prixTotal,
    };

    setCommandes(prev => prev.filter((_, i) => i !== index));
    setCommandesValidees(prev => [...prev, commandeAvecPrix]);
    setHistorique(prev => [...prev, { ...commandeAvecPrix, statut: 'Validée' }]);
  };

  // Livrer une commande
  const livrerCommande = (index) => {
    const commande = commandesValidees[index];
    setCommandesValidees(prev => prev.filter((_, i) => i !== index));
    setCommandesLivrees(prev => [...prev, commande]);
    setHistorique(prev => [...prev, { ...commande, statut: 'Livrée' }]);
    setCommandeImpression(commande);
  };

  // Supprimer une commande (en cours)
  const supprimerCommande = (index) => {
    setCommandes(prev => prev.filter((_, i) => i !== index));
  };

  // Ajouter une commande à la liste des commandes imprimées
  const ajouterCommandeImprimee = (commande) => {
    setCommandesImprimees(prev => [...prev, commande]);
  };

  return (
    <CommandeContext.Provider value={{
      commandes,
      commandesValidees,
      commandesLivrees,
      historique,
      commandeImpression,
      commandesImprimees,

      ajouterCommande,
      validerCommande,
      supprimerCommande,
      livrerCommande,
      ajouterCommandeImprimee,
      setCommandeImpression,
      viderCommandesAImprimer,
    }}>
      {children}
    </CommandeContext.Provider>
  );
};
