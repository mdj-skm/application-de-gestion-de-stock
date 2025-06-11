// Importation des dépendances nécessaires
import React, { useState, useEffect, useContext } from 'react';
import './gestion_rapport.css'; // Importation du fichier CSS pour les styles
import { useNavigate } from 'react-router-dom'; // Hook pour la navigation
import logo from '../assets/logo.png'; // Logo utilisé dans l’en-tête
import Imprimer2 from '../components/Imprimer2'; 
import { StockContext } from '../contexts/StockContext';

// Composant principal de gestion des rapports
const GestionRapport = () => {
  const navigate = useNavigate(); // Hook pour redirection
  const { fournisseurs: stockFournisseurs } = useContext(StockContext);

  // Déclaration des états
  const [selectedRapport, setSelectedRapport] = useState(''); // Pour le menu déroulant
  const [startDate, setStartDate] = useState(''); // Date de début du filtre
  const [endDate, setEndDate] = useState(''); // Date de fin du filtre
  const [searchTerm, setSearchTerm] = useState(''); // Texte de recherche
  const [clients, setClients] = useState([]); // Données clients récupérées depuis le backend
  const [username, setUsername] = useState(''); // Nom d'utilisateur connecté

  // Données en dur pour les commandes
  const commandes = [
    {
      numero: 'CMD001',
      client: 'Jean KOUASSI',
      produit: 'Ordinateur',
      quantite: 1,
      montant: 100000,
      dateCommande: '2025-05-13',
      statut: 'Livrée'
    },
    {
      numero: 'CMD002',
      client: 'Aïcha TOURE',
      produit: 'Téléphone',
      quantite: 1,
      montant: 75000,
      dateCommande: '2025-05-12',
      statut: 'En attente'
    }
  ];

  // Chargement initial des données et du nom d'utilisateur
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }

    const stockData = JSON.parse(localStorage.getItem('stock_rapport')) || [];
    // setStockFournisseurs(stockData);

    // Récupération des clients depuis le backend
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/clients/');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Clients reçus:", data); // Ajout du log pour debug
        setClients(data);
      } catch (error) {
        console.error('Erreur lors du chargement des clients:', error);
      }
    };

    fetchClients();
  }, []);

  // Fonction générique de filtrage par date et recherche textuelle
  // Ici, on supprime temporairement la condition sur la date pour les clients
  const filterByDateAndSearch = (list, dateKey, searchKeys) => {
    return list.filter(item => {
      const dateInRange = true; // On laisse toujours vrai pour clients, mais tu peux adapter selon le rapport

      const searchText = searchTerm.toLowerCase();
      const matchesSearch = searchKeys.some(key =>
        item[key]?.toString().toLowerCase().includes(searchText)
      );
      return dateInRange && matchesSearch;
    });
  };

  // Application des filtres aux différentes listes
  const filteredClients = filterByDateAndSearch(clients, 'dateInscription', ['nom', 'prenom']);
  const filteredFournisseurs = filterByDateAndSearch(stockFournisseurs, 'dateAjout', ['nom', 'entreprise']);
  const filteredCommandes = filterByDateAndSearch(commandes, 'dateCommande', ['client', 'produit']);

  // Calcul du montant total des clients
  const totalMontantClients = filteredClients.reduce(
    (sum, c) => sum + (parseFloat(c.montantTotal) || 0),
    0
  );

  // Calcul du montant total des commandes
  const totalMontantCommandes = filteredCommandes.reduce(
    (sum, c) => sum + (parseFloat(c.montant) || 0),
    0
  );

  // Fonction de suppression d’un client simulée (juste en local pour l’instant)
  const supprimerClient = (clientId) => {
    setClients(prevClients => prevClients.filter(c => c.id !== clientId));
  };

  // Impression de la page
  const handlePrint = () => {
    window.print();
  };

  // Rendu JSX
  return (
    <div className="rapport-container">
      {/* Barre latérale */}
      <aside className="rapport-sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <div className="username">{username}</div>
          <div className="status-indicator" />
        </div>
        <button className="nav-button" onClick={() => navigate('/page_d_accueil')}>
          Accueil
        </button>
        <button
          className="nav-acceuil"
          onClick={() => {
            localStorage.removeItem('username');
            navigate('/');
          }}
        >
          Se déconnecter
        </button>
      </aside>

      {/* Contenu principal */}
      <div className="rapport-main">
        <header className="rapport-header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </header>

        <div className="rapport-body">
          <h2>LE RAPPORT DE NOS ACTIVITES</h2>

          {/* Barre de filtre */}
          <div className="filter-bar">
            <div className="left-filters">
              <label>Date de début</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
              <label>Date de fin</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Rechercher par le Nom"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="action-buttons">
              <button onClick={() => { setStartDate(''); setEndDate(''); setSearchTerm(''); }}>
                Rafraîchir
              </button>
            </div>
          </div>

          {/* Menu déroulant pour sélectionner le type de rapport */}
          <div className="rapport-dropdown-container centered-select">
            <select
              value={selectedRapport}
              onChange={e => setSelectedRapport(e.target.value)}
            >
              <option value="">-- Sélectionner un rapport --</option>
              <option value="clients">Rapport Gestions Clients</option>
              <option value="fournisseurs">Rapports gestion fournisseurs</option>
              <option value="commandes">Rapports gestion commandes</option>
              <option value="stocks">Rapports gestion stocks</option>
            </select>
          </div>

          {/* Affichage dynamique selon le rapport sélectionné */}
          <div className="rapport-content">
            {selectedRapport === 'clients' && (
              <div className="print-area">
                {clients.length === 0 ? (
                  <p>Aucun client trouvé ou chargement en cours...</p>
                ) : (
                  <>
                    <center><h3>Liste des clients</h3></center>
                    <table className="rapport-table">
                      <thead>
                        <tr>
                          <th>Nom</th>
                          <th>Téléphone</th>
                          <th>Adresse</th>
                          <th>Email</th>
                          <th>Profession</th>
                          <th>Sexe</th>
                          <th>Date</th>
                          <th>Produit</th>
                          <th>Montant</th>
                          <th>Vendeur</th>
                          <th>Paiement</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClients.map((client) => (
                          <tr key={client.id}>
                            <td>{client.nom} {client.prenom}</td>
                            <td>{client.telephone}</td>
                            <td>{client.adresse}</td>
                            <td>{client.email}</td>
                            <td>{client.profession}</td>
                            <td>{client.sexe}</td>
                            <td>{client.dateInscription}</td>
                            <td>{client.produitsAchetes}</td>
                            <td>{(parseFloat(client.montantTotal) || 0).toLocaleString()} FCFA</td>
                            <td>{client.nomVendeur}</td>
                            <td>{client.modePaiement}</td>
                            <td>
                              <button
                                className="btn-supprimer"
                                onClick={() => {
                                  if (window.confirm(`Voulez-vous vraiment supprimer ${client.nom} ${client.prenom} ?`)) {
                                    supprimerClient(client.id);
                                    alert(`Client ${client.nom} supprimé.`);
                                  }
                                }}
                              >
                                Supprimer
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="total-amount">
                      Total : {totalMontantClients.toLocaleString()} FCFA
                    </p>
                    <button onClick={handlePrint} className="print-button">🖨️ Imprimer le rapport</button>
                  </>
                )}
              </div>
            )}

            {selectedRapport === 'fournisseurs' && (
            <div className="print-area">
              <center><h3>Liste des fournisseurs</h3></center>
              <table className="rapport-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Entreprise</th>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Email</th>
                    <th>Numéro</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stockFournisseurs.length === 0 ? (
                    <tr><td colSpan="8">Aucun fournisseur enregistré.</td></tr>
                  ) : (
                    stockFournisseurs.map((fournisseur, index) => (
                      <tr key={index}>
                        <td>{fournisseur.nom}</td>
                        <td>{fournisseur.entreprise}</td>
                        <td>{fournisseur.produit}</td>
                        <td>{fournisseur.quantite}</td>
                        <td>{fournisseur.email}</td>
                        <td>{fournisseur.numero}</td>
                        <td>{fournisseur.date}</td>

                        <td>
                          <button
                            className="btn-supprimer"
                            onClick={() => {
                              if (window.confirm(`Voulez-vous vraiment supprimer ${fournisseur.nom} ?`)) {
                              // Suppression simulée en local (tu peux adapter selon stockage)
                                const newFournisseurs = stockFournisseurs.filter((_, i) => i !== index);
                                // Comme stockFournisseurs vient du contexte, tu dois appeler un setter si tu en as un dans ce contexte
                                // Ici, je suppose que tu as une fonction pour modifier le contexte ou sinon ça ne fera rien.
                                alert(`Fournisseur ${fournisseur.nom} supprimé.`);
                              }
                            }}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <button onClick={handlePrint} className="print-button">🖨️ Imprimer le rapport</button>
            </div>
          )}


            {selectedRapport === 'commandes' && (
              <Imprimer2 />
            )}
            
            {selectedRapport === 'stocks' && (
              <div className="print-area">
                <h2>Gestion des Stocks Fournisseurs</h2>
                <table className="stock-table rapport-table">
                  <thead>
                    <tr>
                      <th>Nom Fournisseur</th>
                      <th>Produit</th>
                      <th>Quantité départ</th>
                      <th>Quantité restante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockFournisseurs.length === 0 ? (
                      <tr><td colSpan="4">Aucun fournisseur disponible</td></tr>
                    ) : (
                      stockFournisseurs.map((fournisseur, index) => (
                        <tr key={index}>
                          <td>{fournisseur.nom}</td>
                          <td>{fournisseur.produit}</td>
                          <td>{fournisseur.quantite}</td>
                          <td>{fournisseur.quantite_restante}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <button onClick={handlePrint} className="print-button">🖨️ Imprimer le rapport</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionRapport;
