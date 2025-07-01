import React, { useState, useContext, useEffect } from 'react';
import { CommandeContext } from '../contexts/CommandeContext';
import './CreerCommande.css';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.png';
import { StockContext } from '../contexts/StockContext';

const genererNumeroCommande = () => {
  const dernierNumero = localStorage.getItem('dernierNumeroCommande');
  const prochainNumero = dernierNumero ? parseInt(dernierNumero) + 1 : 1;
  localStorage.setItem('dernierNumeroCommande', prochainNumero);
  return `CMD${String(prochainNumero).padStart(4, '0')}`;
};

const CreerCommande = () => {
  const { ajouterCommande } = useContext(CommandeContext);
  const { fournisseurs, setFournisseurs } = useContext(StockContext);

  const [numeroCommande, setNumeroCommande] = useState('');
  const [produit, setProduit] = useState('');
  const [categorie, setCategorie] = useState('');
  const [quantite, setQuantite] = useState('');
  const [prixUnitaire, setPrixUnitaire] = useState('');
  const [erreur, setErreur] = useState('');

  const stockRestant = fournisseurs.find(f => f.produit === produit)?.quantite || 0;

  const prixTotal = Number(quantite) && Number(prixUnitaire)
    ? Number(quantite) * Number(prixUnitaire)
    : 0;

  useEffect(() => {
    const numero = genererNumeroCommande();
    setNumeroCommande(numero);
  }, []);

  const handleValidation = () => {
    if (quantite > stockRestant) {
      setErreur(`Quantité demandée (${quantite}) supérieure au stock restant (${stockRestant})`);
      return;
    }

    if (!produit || !categorie || !quantite || !prixUnitaire) {
      setErreur('Veuillez remplir toutes les cases.');
      return;
    }

    const nouvelleCommande = {
      numero_commande: numeroCommande,
      produit,
      categorie,
      quantite: parseInt(quantite),
      prix_unitaire: parseFloat(prixUnitaire),
      prix_total: prixTotal,
      date_commande: new Date().toISOString(),
      statut: 'En attente',
    };

    // ✅ Ajouter la commande dans le contexte
    ajouterCommande(nouvelleCommande);

    // ✅ Mettre à jour localement le stock
    const fournisseursMisAJour = fournisseurs.map(f =>
      f.produit === produit
        ? {
            ...f,
            quantite: f.quantite - parseInt(quantite),
            quantite_restante: f.quantite_restante - parseInt(quantite)
          }
        : f
    );
    setFournisseurs(fournisseursMisAJour);

    // ✅ Réinitialiser les champs
    setProduit('');
    setCategorie('');
    setQuantite('');
    setPrixUnitaire('');
    setErreur('');
    setNumeroCommande(genererNumeroCommande());
  };

  return (
    <div className="commande-container">
      <Sidebar />
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="company-name"><h1>G.E.S</h1></div>
      </div>

      <h2>Créer une commande</h2>

      <input
        type="text"
        value={numeroCommande}
        disabled
        className="numero-commande"
      />

      <select value={produit} onChange={e => setProduit(e.target.value)}>
        <option value="">-- Choisir un produit --</option>
        <option value="lait">lait</option>
        <option value="sucre">sucre</option>
        <option value="riz">riz</option>
        <option value="huile">huile</option>
        <option value="eau minérale">eau minérale</option>
        <option value="sardine">sardine</option>
        <option value="sel">sel</option>
        <option value="chaussure">chaussure</option>
        <option value="teeshirt">teeshirt</option>
        <option value="pantalon">pantalon</option>
        <option value="casquette">casquette</option>
        <option value="moto">moto</option>
        <option value="velo">velo</option>
        <option value="voiture">voiture</option>
        <option value="ventilateur">ventilateur</option>
        <option value="climatiseur">climatiseur</option>
        <option value="ampoule">ampoule</option>
        <option value="matelas">matelas</option>
        <option value="natte">natte</option>
        <option value="tv plasma">tv plasma</option>
        <option value="chaise">chaise</option>
        <option value="ordinateur bureau">ordinateur bureau</option>
        <option value="ordinateur portable">ordinateur portable</option>
        <option value="téléphone">téléphone</option>
        <option value="chargeur">chargeur</option>
        <option value="tablette">tablette</option>
        <option value="savon">savon</option>
        <option value="parfum">parfum</option>
      </select>

      <select value={categorie} onChange={e => setCategorie(e.target.value)}>
        <option value="">-- Sélectionnez une catégorie --</option>
        <option value="Electronique">Electronique</option>
        <option value="Vêtements">Vêtements</option>
        <option value="Alimentation">Alimentation</option>
        <option value="Ménage">Ménage</option>
        <option value="Automobile">Automobile</option>
        <option value="Autres">Autres</option>
      </select>

      <input
        type="number"
        placeholder="Quantité"
        value={quantite}
        onChange={e => setQuantite(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix unitaire"
        value={prixUnitaire}
        onChange={e => setPrixUnitaire(e.target.value)}
      />

      <input
        type="text"
        value={`Total = ${prixTotal} FCFA`}
        disabled
      />

      {erreur && <p className="erreur" style={{ color: 'red' }}>{erreur}</p>}

      <button onClick={handleValidation}>Valider</button>
    </div>
  );
};

export default CreerCommande;
