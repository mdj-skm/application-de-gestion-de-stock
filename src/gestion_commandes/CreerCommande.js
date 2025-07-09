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
  const { fournisseurs } = useContext(StockContext);

  const [numeroCommande, setNumeroCommande] = useState('');
  const [produit, setProduit] = useState('');
  const [categorie, setCategorie] = useState('');
  const [quantite, setQuantite] = useState('');
  const [prixUnitaire, setPrixUnitaire] = useState('');
  const [erreur, setErreur] = useState('');
  const [autresProduits, setAutresProduits] = useState([]);

  useEffect(() => {
    setNumeroCommande(genererNumeroCommande());
  }, []);

  const produitsAttribues = [...new Set(
    fournisseurs.flatMap(f => f.produits.map(p => p.nom).filter(Boolean))
  )];

  const ajouterAutreProduit = () => {
    setAutresProduits([
      ...autresProduits,
      { produit: '', categorie: '', quantite: '', prixUnitaire: '' }
    ]);
  };

  const modifierAutreProduit = (index, champ, valeur) => {
    const copie = [...autresProduits];
    copie[index][champ] = valeur;
    setAutresProduits(copie);
  };

  const prixPrincipal = Number(quantite) * Number(prixUnitaire) || 0;
  const prixTotalAutres = autresProduits.reduce((total, ligne) => {
    const qte = Number(ligne.quantite);
    const pu = Number(ligne.prixUnitaire);
    return total + (qte && pu ? qte * pu : 0);
  }, 0);

  const prixTotalGeneral = prixPrincipal + prixTotalAutres;

  const handleValidation = () => {
    // Vérif champs du 1er produit
    if (!produit || !categorie || !quantite || !prixUnitaire) {
      setErreur("Veuillez remplir tous les champs du premier produit.");
      return;
    }

    // Vérif champs des autres produits
    for (let i = 0; i < autresProduits.length; i++) {
      const p = autresProduits[i];
      if (!p.produit || !p.categorie || !p.quantite || !p.prixUnitaire) {
        setErreur(`Veuillez remplir tous les champs de la ligne ${i + 2}`);
        return;
      }
    }

    // Vérif dépassement de stock pour le produit principal
    const fMain = fournisseurs.find(f => f.produits.some(p => p.nom === produit));
    const pMain = fMain?.produits.find(p => p.nom === produit);
    if (pMain && parseInt(quantite) > parseInt(pMain.quantite_restante ?? pMain.quantite)) {
      setErreur(`Quantité demandée pour "${produit}" dépasse le stock disponible (${pMain.quantite_restante ?? pMain.quantite})`);
      return;
    }

    // Vérif dépassement de stock pour les autres
    for (let i = 0; i < autresProduits.length; i++) {
      const ligne = autresProduits[i];
      const f = fournisseurs.find(f => f.produits.some(p => p.nom === ligne.produit));
      const p = f?.produits.find(p => p.nom === ligne.produit);
      if (p && parseInt(ligne.quantite) > parseInt(p.quantite_restante ?? p.quantite)) {
        setErreur(`Ligne ${i + 2} : Quantité de "${ligne.produit}" dépasse le stock disponible (${p.quantite_restante ?? p.quantite})`);
        return;
      }
    }

    // Regroupe tous les produits en un tableau unique
    const produits = [
      {
        produit,
        categorie,
        quantite: parseInt(quantite),
        prix_unitaire: parseFloat(prixUnitaire),
        prix_total: prixPrincipal,
      },
      ...autresProduits.map((p) => ({
        produit: p.produit,
        categorie: p.categorie,
        quantite: parseInt(p.quantite),
        prix_unitaire: parseFloat(p.prixUnitaire),
        prix_total: Number(p.quantite) * Number(p.prixUnitaire),
      })),
    ];

    const nouvelleCommande = {
      numero_commande: numeroCommande,
      produits,
      prix_total: prixTotalGeneral,
      date_commande: new Date().toISOString(),
      statut: 'En attente',
    };

    ajouterCommande(nouvelleCommande);

    // Réinitialiser le formulaire
    setProduit('');
    setCategorie('');
    setQuantite('');
    setPrixUnitaire('');
    setAutresProduits([]);
    setErreur('');
    setNumeroCommande(genererNumeroCommande());
  };

  return (
    <div className="commande-containerCC">
      <Sidebar />
      <div className="headerCC">
        <img src={logo} alt="Logo" className="logoCC" />
        <div className="company-nameCC"><h1>G.E.S</h1></div>
      </div>

      <h2>Créer une commande</h2>

      <input type="text" value={numeroCommande} disabled className="numero-commande" />

      {/* Produit principal */}
      <select value={produit} onChange={e => setProduit(e.target.value)}>
        <option value="">-- Choisir un produit --</option>
        {produitsAttribues.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {produit && (
        <div style={{ fontStyle: 'italic', marginBottom: '5px' }}>
          Fournisseur : {fournisseurs.find(f => f.produits.some(p => p.nom === produit))?.nom || 'Non attribué'}
        </div>
      )}

      <select value={categorie} onChange={e => setCategorie(e.target.value)}>
        <option value="">-- Sélectionnez une catégorie --</option>
        <option value="Electronique">Electronique</option>
        <option value="Vêtements">Vêtements</option>
        <option value="Alimentation">Alimentation</option>
        <option value="Ménage">Ménage</option>
        <option value="Automobile">Automobile</option>
        <option value="Autres">Autres</option>
      </select>

      <input type="number" placeholder="Quantité" value={quantite} onChange={e => setQuantite(e.target.value)} />
      <input type="number" placeholder="Prix unitaire" value={prixUnitaire} onChange={e => setPrixUnitaire(e.target.value)} />

      {/* Autres produits */}
      {autresProduits.map((ligne, index) => (
        <div key={index} className="ligne-produit">
          <select value={ligne.produit} onChange={e => modifierAutreProduit(index, 'produit', e.target.value)}>
            <option value="">-- Choisir un produit --</option>
            {produitsAttribues.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select value={ligne.categorie} onChange={e => modifierAutreProduit(index, 'categorie', e.target.value)}>
            <option value="">-- Catégorie --</option>
            <option value="Electronique">Electronique</option>
            <option value="Vêtements">Vêtements</option>
            <option value="Alimentation">Alimentation</option>
            <option value="Ménage">Ménage</option>
            <option value="Automobile">Automobile</option>
            <option value="Autres">Autres</option>
          </select>

          <input type="number" placeholder="Quantité" value={ligne.quantite} onChange={e => modifierAutreProduit(index, 'quantite', e.target.value)} />
          <input type="number" placeholder="Prix unitaire" value={ligne.prixUnitaire} onChange={e => modifierAutreProduit(index, 'prixUnitaire', e.target.value)} />
        </div>
      ))}

      <button onClick={ajouterAutreProduit}>+ Ajouter une autre commande</button>

      <input type="text" value={`Total général = ${prixTotalGeneral.toLocaleString()} FCFA`} disabled />
      {erreur && <p className="erreur" style={{ color: 'red' }}>{erreur}</p>}

      <button onClick={handleValidation}>Valider la commande</button>
    </div>
  );
};

export default CreerCommande;
