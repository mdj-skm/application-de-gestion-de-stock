import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import Sidebar from '../components/sidebarstock';
import logo from '../assets/logo.png';

const Bienvenue = () => {
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

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
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const restaurerClient = (index) => {
    const updated = [...deletedClients];
    updated.splice(index, 1);
    setDeletedClients(updated);
    alert("Client restauré avec succès !");
  };

  const restaurerCommande = (index) => {
    const updated = [...deletedCommandes];
    updated.splice(index, 1);
    setDeletedCommandes(updated);
    alert("Commande restaurée avec succès !");
  };

  const restaurerFournisseur = (index) => {
    const updated = [...deletedFournisseurs];
    updated.splice(index, 1);
    setDeletedFournisseurs(updated);
    alert("Fournisseur restauré avec succès !");
  };

  const montantTotal = deletedClients.reduce((total, client) => {
    const montantNum = parseInt(client.montant.replace(/\s/g, '').replace('FCFA', ''));
    return total + (isNaN(montantNum) ? 0 : montantNum);
  }, 0);

  const prixTotalCommandes = deletedCommandes.reduce((total, cmd) => total + (cmd.prix || 0), 0);

  return (
    <div className="bienvenue-containerGO">
      <div className="sidebarGO">
        <Sidebar />
      </div>

      <div className="headerGO">
        <img src={logo} alt="Logo" className="logoGO" />
        <div className="company-nameCL"><h1>G.E.S</h1></div>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="bienvenue-contentGO">

          <h1 className="bienvenue-texte">Bienvenue à la corbeille !</h1>

          <select
            className="dropdown-select"
            onChange={(e) => setSelectedOption(e.target.value)}
            value={selectedOption}
          >
            <option value="">-- Sélectionnez une liste --</option>
            <option value="clients">Liste des clients supprimés</option>
            <option value="commandes">Liste des commandes supprimées</option>
            <option value="fournisseurs">Liste des fournisseurs supprimés</option>
          </select>

          {/* === CLIENTS === */}
          {selectedOption === "clients" && (
            deletedClients.length > 0 ? (
              <>
                <div className="table-wrapper">
                  <table className="table-clients">
                    <thead>
                      <tr>
                        <th>Nom</th><th>Prénom</th><th>Téléphone</th><th>Adresse</th>
                        <th>Email</th><th>Profession</th><th>Sexe</th>
                        <th>Date d'inscription</th><th>Produits achetés</th>
                        <th>Montant total</th><th>Vendeur</th><th>Paiement</th><th>Action</th>
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
                            <button className="btn-restaurer" onClick={() => restaurerClient(index)}>Restaurer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="montant-global">MONTANT TOTAL : {montantTotal.toLocaleString()} FCFA</p>
              </>
            ) : (
              <p style={{ marginTop: 20, color: "green", fontWeight: "bold" }}>
                Tous les clients ont été restaurés !
              </p>
            )
          )}

          {/* === COMMANDES === */}
          {selectedOption === "commandes" && deletedCommandes.length > 0 && (
            <>
              <table className="table-commandes">
                <thead>
                  <tr>
                    <th>ID</th><th>Produit</th><th>Catégorie</th>
                    <th>Quantité</th><th>Prix total</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedCommandes.map((cmd, index) => (
                    <tr key={index}>
                      <td>{cmd.id}</td>
                      <td>{cmd.produit}</td>
                      <td>{cmd.categorie}</td>
                      <td>{cmd.quantite}</td>
                      <td>{cmd.prix.toLocaleString()} FCFA</td>
                      <td>
                        <button className="btn-restaurer" onClick={() => restaurerCommande(index)}>Restaurer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="montant-global">PRIX TOTAL : {prixTotalCommandes.toLocaleString()} FCFA</p>
            </>
          )}

          {/* === FOURNISSEURS === */}
          {selectedOption === "fournisseurs" && deletedFournisseurs.length > 0 && (
            <>
              <table className="table-fournisseurs">
                <thead>
                  <tr>
                    <th>Nom</th><th>Entreprise</th><th>Email</th><th>Numéro</th><th>Date</th>
                    <th>Produits attribués</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedFournisseurs.map((f, index) => (
                    <tr key={index}>
                      <td>{f.nom}</td>
                      <td>{f.entreprise}</td>
                      <td>{f.email}</td>
                      <td>{f.numero}</td>
                      <td>{f.date}</td>
                      <td>
                        {f.produitsAttribues.map((p, i) => (
                          <div key={i}><strong>{p.nomProduit}</strong> — {p.quantite}</div>
                        ))}
                      </td>
                      <td>
                        <button className="btn-restaurer" onClick={() => restaurerFournisseur(index)}>Restaurer</button>
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
