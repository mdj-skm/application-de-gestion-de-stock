import React, { createContext, useState, useEffect } from 'react';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [fournisseurs, setFournisseurs] = useState([]);

  const fetchFournisseurs = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/fournisseurs/');
      if (!response.ok) throw new Error('Erreur chargement fournisseurs');
      const data = await response.json();
      setFournisseurs(data);
      localStorage.setItem('fournisseurs', JSON.stringify(data));
    } catch (err) {
      console.error("Erreur chargement fournisseurs:", err);
    }
  };

  const refreshFournisseurs = async () => {
  try {
    const updatedFournisseurs = await fetch('http://localhost:8000/api/fournisseurs/');
    if (!updatedFournisseurs.ok) throw new Error('Erreur lors du rafraîchissement des fournisseurs');
    const data = await updatedFournisseurs.json();
    setFournisseurs(data);
    localStorage.setItem('fournisseurs', JSON.stringify(data));
  } catch (err) {
    console.error("Erreur lors du rafraîchissement des fournisseurs:", err);
  }
};


  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const updateFournisseur = async (fournisseur) => {
    try {
      const response = await fetch(`http://localhost:8000/api/fournisseurs/${fournisseur.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fournisseur),
      });

      if (!response.ok) throw new Error('Erreur mise à jour fournisseur');
      return await response.json();
    } catch (err) {
      console.error("Erreur API:", err);
      throw err;
    }
  };

  // Fonction pour diminuer la quantité d’un produit chez un fournisseur
  const livrerProduit = async (nomFournisseur, nomProduit, quantiteLivree) => {
  const updatedFournisseurs = await Promise.all(
    fournisseurs.map(async (fournisseur) => {
      if (fournisseur.nom === nomFournisseur && fournisseur.produit === nomProduit) {
        const nouvelleQuantite = Math.max(0, fournisseur.quantite_restante - quantiteLivree);
        const updatedFournisseur = { ...fournisseur, quantite_restante: nouvelleQuantite };

        try {
          await updateFournisseur(updatedFournisseur);
        } catch (err) {
          console.error("Erreur lors de la mise à jour du stock :", err);
        }

        return updatedFournisseur;
      }
      return fournisseur;
    })
  );

  setFournisseurs(updatedFournisseurs);
};

  

  return (
    <StockContext.Provider value={{ fournisseurs, setFournisseurs, livrerProduit,refreshFournisseurs }}>
      {children}
    </StockContext.Provider>
  );
};
