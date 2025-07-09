import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommandeContext } from '../contexts/CommandeContext';
import './CommandesValidees2.css';
import Sidebar from '../components/Sidebar2';
import logo from '../assets/logo.png';

const CommandesValidees = () => {
  const {
    commandesValidees,
    setCommandeImpression,
    ajouterCommandeLivree,
    supprimerCommandeValidee
  } = useContext(CommandeContext);

  const navigate = useNavigate();

  const handleLivrer = (commande, produit) => {
    if (!commande || !produit) return;

    const prixUnitaire = parseInt(produit.prix_unitaire || produit.prixUnitaire || 0);
    const quantite = parseInt(produit.quantite || 0);
    const prixTotal = prixUnitaire * quantite;

    const commandeAvecProduit = {
      numero_commande: commande.numero_commande,
      produit: produit.produit,
      categorie: produit.categorie,
      quantite,
      prixUnitaire,
      prixTotal,
      date: new Date().toLocaleString(),
    };

    setCommandeImpression(commandeAvecProduit);
    localStorage.setItem("commandeImpression", JSON.stringify(commandeAvecProduit));

    // Supprimer la commande livrée des commandes validées
    supprimerCommandeValidee(commande.numero_commande, produit.produit);

    // Ajouter la commande livrée dans la liste
    ajouterCommandeLivree(commandeAvecProduit);

    navigate('/imprimer2');
  };

  return (
    <div className="commandes-validees-containerCVA">
      <div className="sidebarCVA">
        <Sidebar />
      </div>
      <div className="commandes-en-cours-container">
        <div className="headerCVA">
          <img src={logo} alt="Logo" className="logoCVA" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>

        <h2>Commandes Validées</h2>

        {commandesValidees.length === 0 ? (
          <p>Aucune commande à valider. Voir dans Commandes en cours.</p>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>N° Commande</th>
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
                {commandesValidees.map((commande, commandeIndex) =>
                  commande.produits.map((produit, produitIndex) => {
                    const prixUnitaire = parseInt(produit.prix_unitaire || produit.prixUnitaire || 0);
                    const quantite = parseInt(produit.quantite || 0);
                    const prixTotal = prixUnitaire * quantite;

                    return (
                      <tr key={`${commandeIndex}-${produitIndex}`}>
                        <td>{commande.numero_commande}</td>
                        <td>{produit.produit}</td>
                        <td>{produit.categorie}</td>
                        <td>{quantite}</td>
                        <td>{prixUnitaire} FCFA</td>
                        <td>{prixTotal} FCFA</td>
                        <td style={{ color: 'green' }}>Payé</td>
                        <td>
                          <button onClick={() => handleLivrer(commande, produit)}>Livrer</button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandesValidees;
