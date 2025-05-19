// src/rapports/gestion_rapport.js
import React, { useState, useEffect } from 'react';
import './gestion_rapport.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const GestionRapport = () => {
  const navigate = useNavigate();
  const [selectedRapport, setSelectedRapport] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [username, setUsername] = useState('');

  const clients = [/* ... mêmes données clients ... */];
  const fournisseurs = [/* ... mêmes données fournisseurs ... */];
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


  useEffect(() => {
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    setUsername(savedUsername);
  }
  }, []);

  const filterByDateAndSearch = (list, dateKey, searchKeys) => {
    return list.filter(item => {
      const date = item[dateKey];
      const dateInRange = (!startDate || date >= startDate) && (!endDate || date <= endDate);
      const searchText = searchTerm.toLowerCase();
      const matchesSearch = searchKeys.some(key =>
        item[key]?.toString().toLowerCase().includes(searchText)
      );
      return dateInRange && matchesSearch;
    });
  };

  const filteredClients = filterByDateAndSearch(clients, 'dateInscription', ['nom', 'prenom']);
  const filteredFournisseurs = filterByDateAndSearch(fournisseurs, 'dateAjout', ['nom', 'entreprise']);
  const filteredCommandes = filterByDateAndSearch(commandes, 'dateCommande', ['client', 'produit']);

  const totalMontantClients = filteredClients.reduce((sum, c) => sum + c.montantTotal, 0);
  const totalMontantCommandes = filteredCommandes.reduce((sum, c) => sum + c.montant, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rapport-container">
      <aside className="rapport-sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <div className="username">{username}</div>
          <div className="status-indicator" />
        </div>
        <button className="nav-button" onClick={() => navigate('/page_d_accueil')}>
          Accueil
        </button>
        <button className="nav-acceuil" onClick={() => { localStorage.removeItem('username');
            navigate('/');
          }}
        >
          Se déconnecter
        </button>
      </aside>

      <div className="rapport-main">
        <header className="rapport-header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </header>

        <div className="rapport-body">
          <h2>LE RAPPORT DE NOS ACTIVITES</h2>

          <div className="filter-bar">
            <div className="left-filters">
              <label>Date de début</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <label>Date de fin</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              <input type="text" placeholder="Rechercher par le Nom" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="action-buttons">
              <button onClick={() => { setStartDate(''); setEndDate(''); setSearchTerm(''); }}>
                Rafraîchir
              </button>
            </div>
          </div>

          <div className="rapport-dropdown-container centered-select">
          <select value={selectedRapport} onChange={e => setSelectedRapport(e.target.value)}>
          <option value="">-- Sélectionner un rapport --</option>
          <option value="clients">Rapport Gestions Clients</option>
          <option value="fournisseurs">Rapports gestion fournisseurs</option>
          <option value="commandes">Rapports gestion commandes</option>
       </select>
       </div>


          <div className="rapport-content">
            {selectedRapport === 'clients' && (
              <div className="print-area">
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
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client, index) => (
                      <tr key={index}>
                        <td>{client.nom} {client.prenom}</td>
                        <td>{client.telephone}</td>
                        <td>{client.adresse}</td>
                        <td>{client.email}</td>
                        <td>{client.profession}</td>
                        <td>{client.sexe}</td>
                        <td>{client.dateInscription}</td>
                        <td>{client.produitsAchetes}</td>
                        <td>{client.montantTotal} FCFA</td>
                        <td>{client.nomVendeur}</td>
                        <td>{client.modePaiement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="total-amount">Total : {totalMontantClients} FCFA</p>
                <button onClick={handlePrint} className="print-button">🖨️ Imprimer le rapport</button>
              </div>
            )}

            {selectedRapport === 'fournisseurs' && (
              <div className="print-area">
                <center><h3>Liste des fournisseurs</h3></center>
                <table className="rapport-table">
                  <thead>
                    <tr>
                      <th>Entreprise</th>
                      <th>Nom</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>Adresse</th>
                      <th>Produits</th>
                      <th>Date d’ajout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFournisseurs.map((fournisseur, index) => (
                      <tr key={index}>
                        <td>{fournisseur.entreprise}</td>
                        <td>{fournisseur.nom}</td>
                        <td>{fournisseur.telephone}</td>
                        <td>{fournisseur.email}</td>
                        <td>{fournisseur.adresse}</td>
                        <td>{fournisseur.produits}</td>
                        <td>{fournisseur.dateAjout}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={handlePrint} className="print-button">🖨️ Imprimer le rapport</button>
              </div>
            )}

            {selectedRapport === 'commandes' && (
              <div className="print-area">
                <center><h3>Liste des commandes</h3></center>
                <table className="rapport-table">
                  <thead>
                    <tr>
                      <th>Numero commande</th>
                      <th>Produit</th>
                      <th>Catégorie</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Prix Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommandes.map((cmd, index) => (
                      <tr key={index}>
                        <td>{cmd.numero}</td>
                        <td>{cmd.client}</td>
                        <td>{cmd.produit}</td>
                        <td>{cmd.quantite}</td>
                        <td>{cmd.montant} FCFA</td>
                        <td>{cmd.dateCommande}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="total-amount">Total : {totalMontantCommandes} FCFA</p>
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
