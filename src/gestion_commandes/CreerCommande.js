import React, { useState, useContext } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import './CreerCommande.css';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.png';

 
const CreerCommande = () => {
  const { ajouterCommande } = useContext(CommandeContext);
  const [produit, setProduit] = useState('');
  const [categorie, setCategorie] = useState('');
  const [quantite, setQuantite] = useState('');
  const [prixUnitaire, setPrixUnitaire] = useState('');
  const [erreur, setErreur] = useState('');

  // const prixTotal = quantite && prixUnitaire ? quantite * prixUnitaire : 0;
  const prixTotal = Number(quantite)  && Number(prixUnitaire) 
  ? Number(quantite) * Number(prixUnitaire)
  : 0;

  const handleValidation = () => {
    if (!produit || !categorie || !quantite || !prixUnitaire) {
      setErreur('Veuillez remplir toutes les cases.');
      return;
    }

    const nouvelleCommande = {
      produit,
      categorie,
      quantite: parseInt(quantite),
      prixUnitaire: parseFloat(prixUnitaire),
      prixTotal,
      date: new Date().toLocaleString()
    };

    ajouterCommande(nouvelleCommande);

    // Réinitialiser les champs
    setProduit('');
    setCategorie('');
    setQuantite('');
    setPrixUnitaire('');
    setErreur('');
    // alert("Commande ajoutée !");
  };

  return (
    <div className="commande-container">
        <Sidebar />
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>
      <h2>Créer une commande</h2>
      <input type="text" placeholder="Nom du produit" value={produit} onChange={e => setProduit(e.target.value)} />
      {/* <input type="text" placeholder="Catégorie" value={categorie} onChange={e => setCategorie(e.target.value)} /> */}     
      <select value={categorie} onChange={e => setCategorie(e.target.value)}>
      <option value="">-- Sélectionnez une catégorie --</option>
      <option value="Electronique">Electronique</option>
      <option value="Vêtements">Vêtements</option>
      <option value="Alimentation">Alimentation</option>
      <option value="Autre">Autre</option>
      </select>
      <input type="number" placeholder="Quantité" value={quantite} onChange={e => setQuantite(e.target.value)} />
      <input type="number" placeholder="Prix unitaire" value={prixUnitaire} onChange={e => setPrixUnitaire(e.target.value)} />

      <input type="text" value={`Total = ${prixTotal} FCFA`} disabled />
      {/* <p><strong>Prix total :</strong> {prixTotal} FCFA</p> */}
      {erreur && <p className="erreur">{erreur}</p>}

      <button onClick={handleValidation}>Valider</button>
    </div>
  );
};

export default CreerCommande;
