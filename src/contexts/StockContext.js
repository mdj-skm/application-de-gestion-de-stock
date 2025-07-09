import React, { createContext, useState, useEffect } from 'react';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [fournisseurs, setFournisseurs] = useState([]);

  const fetchFournisseurs = async () => {
    try {
      const cached = localStorage.getItem('fournisseurs');
      if (cached) {
        const cachedFournisseurs = JSON.parse(cached);
        const fournisseursAvecQuantiteRestante = cachedFournisseurs.map(fournisseur => ({
          ...fournisseur,
          produits: fournisseur.produits.map(produit => ({
            ...produit,
            quantite_restante: produit.quantite_restante ?? produit.quantite,
          })),
        }));
        setFournisseurs(fournisseursAvecQuantiteRestante);
        return;
      }
      const response = await fetch('http://localhost:8000/api/fournisseurs/');
      if (!response.ok) throw new Error('Erreur chargement fournisseurs');
      const data = await response.json();

      const dataAvecQuantiteRestante = data.map(fournisseur => ({
        ...fournisseur,
        produits: fournisseur.produits.map(produit => ({
          ...produit,
          quantite_restante: produit.quantite,
        })),
      }));

      setFournisseurs(dataAvecQuantiteRestante);
      localStorage.setItem('fournisseurs', JSON.stringify(dataAvecQuantiteRestante));
    } catch (err) {
      console.error("Erreur chargement fournisseurs:", err);
    }
  };

  // Met à jour le stock automatiquement après validation d'une commande
  const mettreAJourStockAprèsCommande = (commande) => {
    const nouveauxFournisseurs = fournisseurs.map((fournisseur) => {
      const produitsMisAJour = fournisseur.produits.map((produit) => {
        const articleCommande = commande.produits.find(p => p.produit === produit.nom || p.produit === produit.nom);
        if (articleCommande) {
          const quantiteActuelle = parseInt(produit.quantite_restante ?? produit.quantite);
          const nouvelleQuantite = Math.max(0, quantiteActuelle - parseInt(articleCommande.quantite));
          return {
            ...produit,
            quantite_restante: nouvelleQuantite,
          };
        }
        return produit;
      });
      return { ...fournisseur, produits: produitsMisAJour };
    });

    setFournisseurs(nouveauxFournisseurs);
    localStorage.setItem('fournisseurs', JSON.stringify(nouveauxFournisseurs));
  };

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  return (
    <StockContext.Provider value={{
      fournisseurs,
      setFournisseurs,
      mettreAJourStockAprèsCommande,
    }}>
      {children}
    </StockContext.Provider>
  );
};
