import React, { createContext, useState, useEffect, useContext } from 'react';
import { StockContext } from './StockContext';
import { CaisseContext } from './CaisseContext';

export const CommandeContext = createContext();

export const CommandeProvider = ({ children }) => {
  const [commandes, setCommandes] = useState([]);
  const [commandesValidees, setCommandesValidees] = useState([]);
  const [commandesLivrees, setCommandesLivrees] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [commandeImpression, setCommandeImpression] = useState(null);
  const [commandesImprimees, setCommandesImprimees] = useState([]);
  const [aImprimer, setAImprimer] = useState([]);

  const { mettreAJourStockAprèsCommande } = useContext(StockContext);
  const { ajouterPaiement } = useContext(CaisseContext); // 🔥 Paiement caisse

  const viderToutesLesDonnees = () => {
    setCommandes([]);
    setCommandesValidees([]);
    setCommandesLivrees([]);
    setHistorique([]);
    setAImprimer([]);
    setCommandesImprimees([]);
    setCommandeImpression(null);

    localStorage.removeItem('commandes');
    localStorage.removeItem('commandesValidees');
    localStorage.removeItem('commandesLivrees');
    localStorage.removeItem('historique');
    localStorage.removeItem('aImprimer');
    localStorage.removeItem('commandesImprimees');
    localStorage.removeItem('commandeImpression');
  };

  useEffect(() => {
    const savedHistorique = localStorage.getItem("historique");
    if (savedHistorique) setHistorique(JSON.parse(savedHistorique));

    const savedLivrees = localStorage.getItem("commandesLivrees");
    if (savedLivrees) setCommandesLivrees(JSON.parse(savedLivrees));

    const savedImprimees = localStorage.getItem("commandesImprimees");
    if (savedImprimees) setCommandesImprimees(JSON.parse(savedImprimees));
  }, []);

  useEffect(() => {
    localStorage.setItem("historique", JSON.stringify(historique));
  }, [historique]);

  useEffect(() => {
    localStorage.setItem('aImprimer', JSON.stringify(aImprimer));
  }, [aImprimer]);

  const ajouterCommande = (commande) => {
    setCommandes(prev => [...prev, commande]);
    setHistorique(prev => [...prev, { ...commande, statut: 'En cours' }]);
  };

  const validerCommande = (commandeIndex, produitIndex) => {
    const commande = commandes[commandeIndex];
    if (!commande) return;

    const produitValide = commande.produits[produitIndex];
    if (!produitValide) return;

    const montant = produitValide.prix_total;
    if (montant) {
      ajouterPaiement(montant); // ✅ Paiement vers la caisse
    }

    const commandeValidee = {
      ...commande,
      produits: [produitValide],
    };

    mettreAJourStockAprèsCommande(commandeValidee); // ✅ mise à jour stock

    const nouvelleListeProduits = commande.produits.filter((_, i) => i !== produitIndex);
    if (nouvelleListeProduits.length === 0) {
      setCommandes(prev => prev.filter((_, i) => i !== commandeIndex));
    } else {
      setCommandes(prev => {
        const copie = [...prev];
        copie[commandeIndex] = { ...commande, produits: nouvelleListeProduits };
        return copie;
      });
    }

    setCommandesValidees(prev => [...prev, commandeValidee]);
    setHistorique(prev => [...prev, { ...commandeValidee, statut: 'Validée' }]);
  };

  const ajouterCommandeLivree = (commande) => {
    setCommandesLivrees(prev => {
      const nouvelles = [...prev, commande];
      localStorage.setItem("commandesLivrees", JSON.stringify(nouvelles));
      return nouvelles;
    });
    setHistorique(prev => [...prev, { ...commande, statut: 'Livré' }]);
  };

  const livrerCommande = (commandeLivree) => {
    setCommandesLivrees(prev => {
      const updated = [...prev, commandeLivree];
      localStorage.setItem("commandesLivrees", JSON.stringify(updated));
      return updated;
    });
    setHistorique(prev => [...prev, { ...commandeLivree, statut: 'Livré' }]);
  };

  const supprimerCommande = (index) => {
    setCommandes(prev => prev.filter((_, i) => i !== index));
  };

  const ajouterCommandeImprimee = (commande) => {
    setCommandesImprimees(prev => {
      const updated = [...prev, commande];
      localStorage.setItem("commandesImprimees", JSON.stringify(updated));
      return updated;
    });
  };

  const supprimerCommandeValidee = (numeroCommande, nomProduit) => {
    const nouvellesValidees = commandesValidees
      .map(commande => {
        if (commande.numero_commande !== numeroCommande) return commande;

        const produitsRestants = commande.produits.filter(
          produit => produit.produit !== nomProduit
        );

        if (produitsRestants.length === 0) return null;

        return { ...commande, produits: produitsRestants };
      })
      .filter(Boolean);

    setCommandesValidees(nouvellesValidees);
    localStorage.setItem("commandesValidees", JSON.stringify(nouvellesValidees));
  };

  return (
    <CommandeContext.Provider
      value={{
        commandes,
        commandesValidees,
        commandesLivrees,
        historique,
        ajouterCommande,
        validerCommande,
        supprimerCommande,
        livrerCommande,
        ajouterCommandeLivree,
        supprimerCommandeValidee,
        commandeImpression,
        setCommandeImpression,
        commandesImprimees,
        ajouterCommandeImprimee,
        aImprimer,
        setAImprimer,
        viderToutesLesDonnees,
      }}
    >
      {children}
    </CommandeContext.Provider>
  );
};
