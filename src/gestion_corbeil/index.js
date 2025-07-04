import React, { useEffect, useState } from "react";
import './index.css';

const Bienvenue = () => {
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
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

  // Simule le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Supprime un client de la corbeille
  const restaurerClient = (index) => {
    const updatedList = [...deletedClients];
    updatedList.splice(index, 1);
    setDeletedClients(updatedList);
    alert("Client restauré avec succès !");
  };

  // Calcul du montant total global (en FCFA)
  const montantTotal = deletedClients.reduce((total, client) => {
    const montantNum = parseInt(client.montant.replace(/\s/g, '').replace('FCFA', ''));
    return total + (isNaN(montantNum) ? 0 : montantNum);
  }, 0);

  return (
    <div className="bienvenue-container">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="bienvenue-content">
          <h1 className="bienvenue-texte">Bienvenue à la corbeille !</h1>

          {/* Liste déroulante */}
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

          {/* Tableau des clients supprimés */}
          {selectedOption === "clients" && deletedClients.length > 0 && (
            <>
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
                        <button
                          className="btn-restaurer"
                          onClick={() => restaurerClient(index)}
                        >
                          Restaurer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Montant total en dessous du tableau */}
              <p className="montant-global">
                MONTANT TOTAL: {montantTotal.toLocaleString()} FCFA
              </p>
            </>
          )}

          {/* Message si tous les clients sont restaurés */}
          {selectedOption === "clients" && deletedClients.length === 0 && (
            <p style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>
              Tous les clients ont été restaurés !
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Bienvenue;
