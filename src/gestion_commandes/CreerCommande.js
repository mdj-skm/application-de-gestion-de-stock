import React, { useState } from "react";
import './CreerCommande.css';


export default function CreerCommande({ setCommande }) {
  const [produit, setProduit] = useState("");
  const [categorie, setCategorie] = useState("");
  const [quantite, setQuantite] = useState(0);
  const [prix, setPrix] = useState(0);

  const total = quantite * prix;

  const valider = () => {
    const nouvelleCommande = { produit, categorie, quantite, prix, total };
    setCommande(nouvelleCommande);
    alert("Commande enregistrée !");
  };

  return (
    <div className="creer-commande-container">
      <div className="creer-commande-form">
      <h3>Créer une commande</h3>
      <input placeholder="Nom du produit" onChange={e => setProduit(e.target.value)} />
      <input placeholder="Catégorie" onChange={e => setCategorie(e.target.value)} />
      <input type="number" placeholder="Quantité" onChange={e => setQuantite(Number(e.target.value))} />
      <input type="number" placeholder="Prix unitaire" onChange={e => setPrix(Number(e.target.value))} />
      <p>Total : {total} €</p>
      <button onClick={valider}>Valider</button>
      <button onClick={() => window.location.reload()}>Annuler</button>
    </div>
 </div>
  );
}