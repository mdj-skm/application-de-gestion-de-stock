import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommandeContext } from '../contexts/CommandeContext';
import { StockContext } from '../contexts/StockContext';
import './CommandesValidees2.css';
import Sidebar from '../components/Sidebar2';
import logo from '../assets/logo.png';

const CommandesValidees = () => {
  const { commandesValidees, setCommandeImpression } = useContext(CommandeContext);
  const { fournisseurs, setFournisseurs, livrerProduit } = useContext(StockContext);
  const navigate = useNavigate();

  const handleLivrer = async (commande) => {
  if (!commande || !commande.numero_commande) {
    console.error("Commande invalide :", commande);
    return;
  }

  const fournisseur = fournisseurs.find(
    (f) => f.produit === commande.produit
  );

  if (!fournisseur) {
    alert("Fournisseur introuvable pour ce produit.");
    return;
  }

  if (fournisseur.quantite < commande.quantite) {
    alert("Stock insuffisant pour livrer cette commande.");
    return;
  }

  try {
  const resCommande = await fetch(`http://localhost:8000/api/commandes/livrer_commande/${commande.numero_commande}/`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const text = await resCommande.text();
const contentType = resCommande.headers.get('content-type');

console.log('Status:', resCommande.status);
console.log('Response text:', text);

if (!contentType || !contentType.includes('application/json')) {
  throw new Error("Réponse inattendue du serveur (non JSON)");
}

const data = JSON.parse(text);

if (!resCommande.ok) {
  throw new Error(data.message || 'Erreur mise à jour commande');
}



    // ✅ 2. Mettre à jour le stock dans Django via API livrer_produit
    const resStock = await fetch(`http://localhost:8000/api/fournisseurs/livrer/${fournisseur.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantite_livree: commande.quantite }),
    });

    const stockData = await resStock.json();
    if (!resStock.ok) throw new Error(stockData.message || 'Erreur mise à jour stock');

    // ✅ 3. Mettre à jour localement (frontend)
    const nouveauxFournisseurs = fournisseurs.map((f) =>
      f.nom === fournisseur.nom && f.produit === fournisseur.produit
        ? { ...f, quantite: f.quantite - commande.quantite, quantite_restante: f.quantite_restante - commande.quantite }
        : f
    );
    setFournisseurs(nouveauxFournisseurs);

    // ✅ 4. Sauvegarder la commande pour l'impression
    const prixUnitaire = commande.prixUnitaire ?? fournisseur.prixUnitaire;
    const commandeAvecPrix = {
      ...commande,
      prixUnitaire,
      prixTotal: prixUnitaire * commande.quantite,
    };

    setCommandeImpression(commandeAvecPrix);
    localStorage.setItem("commandeImpression", JSON.stringify(commandeAvecPrix));
    navigate('/imprimer2');
    window.location.reload();

  } catch (error) {
    console.error("Erreur lors de la livraison :", error);
    alert("Erreur lors de la livraison de la commande.");
  }
};



const commandesAvecPrix = commandesValidees.map((commande) => {
  const prixUnitaire = commande.prixUnitaire ?? 0;
  const quantite = commande.quantite ?? 0;
  const prixTotal = commande.prixTotal ?? (prixUnitaire * quantite);

  return {
    ...commande,
    prixUnitaire,
    prixTotal,
  };
});



  return (
    <div className="commandes-validees-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="commandes-en-cours-container">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>

        <h2>Commandes Validées</h2>

        {commandesValidees.length === 0 ? (
          <p>Aucune commande à valider, Voir dans Commande effectuée.</p>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Catégorie</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Prix Total</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              
              <tbody>
               {commandesAvecPrix.map((commande, index) => (
                <tr key={index}>
                  <td>{commande.produit}</td>
                  <td>{commande.categorie}</td>
                  <td>{commande.quantite}</td>
                  <td>{commande.prixUnitaire} FCFA</td>
                  <td>{commande.prixTotal} FCFA</td>
                  <td style={{ color: 'green' }}>Payé</td>
                  <td>
                  <button onClick={() => handleLivrer(commande)}>Livrer</button>
                  </td>
                </tr>
               ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandesValidees;
