import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Ajouté ici
import './index.css';

const Bienvenue = () => {
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate(); // <-- Ajouté ici

  const [deletedClients, setDeletedClients] = useState([
    {
      nom: "Kouadio",
      prenom: "Jean",
      telephone: "0700000000",
      adresse: "Abidjan",
      email: "jean.k@example.com",
      profession: "Commerçant",
      sexe: "Masculin",
      dateInscription: "2023-02-15",
      produits: "Ordinateur, Imprimante",
      montant: "450 000 FCFA",
      vendeur: "Mme Yao",
      paiement: "Mobile Money"
    },
    {
      nom: "Traoré",
      prenom: "Aminata",
      telephone: "0500112233",
      adresse: "Bouaké",
      email: "aminata.t@example.com",
      profession: "Enseignante",
      sexe: "Féminin",
      dateInscription: "2022-11-03",
      produits: "Smartphone",
      montant: "150 000 FCFA",
      vendeur: "M. Koné",
      paiement: "Espèces"
    }
  ]);

  const [deletedCommandes, setDeletedCommandes] = useState([
    {
      id: "CMD0001",
      produit: "Ordinateur portable",
      categorie: "Informatique",
      quantite: 2,
      prix: 300000
    },
    {
      id: "CMD0002",
      produit: "Imprimante",
      categorie: "Bureau",
      quantite: 1,
      prix: 120000
    }
  ]);

  const [deletedFournisseurs, setDeletedFournisseurs] = useState([
    {
      nom: "Ouattara",
      entreprise: "Tech Afrique",
      email: "contact@techafrique.ci",
      numero: "0708001122",
      date: "2024-03-10",
      produitsAttribues: [
        { nomProduit: "Serveur Dell", quantite: 2 },
        { nomProduit: "Switch Cisco", quantite: 1 }
      ]
    },
    {
      nom: "Kouamé",
      entreprise: "Electro Ivoire",
      email: "info@electroivoire.com",
      numero: "0500223344",
      date: "2023-12-05",
      produitsAttribues: [
        { nomProduit: "Onduleur APC", quantite: 3 }
      ]
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const restaurerClient = (index) => {
    const updatedList = [...deletedClients];
    updatedList.splice(index, 1);
    setDeletedClients(updatedList);
    alert("Client restauré avec succès !");
  };

  const montantTotal = deletedClients.reduce((total, client) => {
    const montantNum = parseInt(client.montant.replace(/\s/g, '').replace('FCFA', ''));
    return total + (isNaN(montantNum) ? 0 : montantNum);
  }, 0);

  const prixTotalCommandes = deletedCommandes.reduce((total, commande) => {
    return total + (commande.prix || 0);
  }, 0);

  return (
    <div className="bienvenue-container">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="bienvenue-content">
          {/* BOUTON RETOUR */}
          <button className="btn-retour" onClick={() => navigate('/page_d_accueil')}>
            ← Retour
          </button>

          <h1 className="bienvenue-texte">Bienvenue à la corbeille !</h1>

          <select
            className="dropdown-select"
            onChange={(e) => setSelectedOption(e.target.value)}
            value={selectedOption}
          >
            <option value="">-- Sélectionnez une liste --</option>
            <option value="clients">Liste des clients supprimés</option>
            <option value="commandes">Liste des commandes supprimées</option>
            <option value="fournisseurs">Liste des fournisseurs supprimées</option>
          </select>

          {/* CLIENTS SUPPRIMÉS */}
          {selectedOption === "clients" && deletedClients.length > 0 && (
            <>
              <div className="table-wrapper">
                <table className="table-clients">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Téléphone</th>
                      <th>Adresse</th>
                      <th>Email</th>
                      <th>Profession</th>
                      <th>Sexe</th>
                      <th>Date d'inscription</th>
                      <th>Produits achetés</th>
                      <th>Montant total</th>
                      <th>Nom du vendeur</th>
                      <th>Mode de paiement</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedClients.map((client, index) => (
                      <tr key={index}>
                        <td>{client.nom}</td>
                        <td>{client.prenom}</td>
                        <td>{client.telephone}</td>
                        <td>{client.adresse}</td>
                        <td>{client.email}</td>
                        <td>{client.profession}</td>
                        <td>{client.sexe}</td>
                        <td>{client.dateInscription}</td>
                        <td>{client.produits}</td>
                        <td>{client.montant}</td>
                        <td>{client.vendeur}</td>
                        <td>{client.paiement}</td>
                        <td>
                          <button className="btn-restaurer" onClick={() => restaurerClient(index)}>
                            Restaurer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="montant-global">
                MONTANT TOTAL : {montantTotal.toLocaleString()} FCFA
              </p>
            </>
          )}

          {selectedOption === "clients" && deletedClients.length === 0 && (
            <p style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>
              Tous les clients ont été restaurés !
            </p>
          )}

          {/* COMMANDES SUPPRIMÉES */}
          {selectedOption === "commandes" && deletedCommandes.length > 0 && (
            <>
              <table className="table-commandes">
                <thead>
                  <tr>
                    <th>ID de commande</th>
                    <th>Nom du produit</th>
                    <th>Catégorie du produit</th>
                    <th>Quantité</th>
                    <th>Prix total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedCommandes.map((commande, index) => (
                    <tr key={index}>
                      <td>{commande.id}</td>
                      <td>{commande.produit}</td>
                      <td>{commande.categorie}</td>
                      <td>{commande.quantite}</td>
                      <td>{commande.prix.toLocaleString()} FCFA</td>
                      <td>
                        <button className="btn-restaurer" onClick={() => restaurerClient(index)}>
                          Restaurer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="montant-global">
                PRIX TOTAL : {prixTotalCommandes.toLocaleString()} FCFA
              </p>
            </>
          )}

          {/* FOURNISSEURS SUPPRIMÉS */}
          {selectedOption === "fournisseurs" && deletedFournisseurs.length > 0 && (
            <>
              <table className="table-fournisseurs">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Entreprise</th>
                    <th>Email</th>
                    <th>Numéro</th>
                    <th>Date</th>
                    <th>Produits attribués</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedFournisseurs.map((fournisseur, index) => (
                    <tr key={index}>
                      <td>{fournisseur.nom}</td>
                      <td>{fournisseur.entreprise}</td>
                      <td>{fournisseur.email}</td>
                      <td>{fournisseur.numero}</td>
                      <td>{fournisseur.date}</td>
                      <td>
                        {fournisseur.produitsAttribues.map((produit, i) => (
                          <div key={i}>
                            <strong>{produit.nomProduit}</strong> — {produit.quantite}
                          </div>
                        ))}
                      </td>
                      <td>
                        <button className="btn-restaurer" onClick={() => restaurerClient(index)}>
                          Restaurer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Bienvenue;
