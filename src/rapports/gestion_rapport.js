// src/rapports/gestion_rapport.js
import React, { useState } from 'react';
import './gestion_rapport.css';
import { useNavigate } from 'react-router-dom';

const GestionRapport = () => {
  const navigate = useNavigate();
  const [selectedRapport, setSelectedRapport] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      nom: 'KOUASSI',
      prenom: 'Jean',
      telephone: '0102030405',
      adresse: 'Abidjan',
      email: 'jean@mail.com',
      profession: 'Enseignant',
      sexe: 'M',
      dateInscription: '2025-05-13',
      produitsAchetes: 'Ordinateur',
      montantTotal: 100000,
      nomVendeur: 'AKPA Hervé',
      modePaiement: 'Mobile Money'
    },
    {
      nom: 'TOURE',
      prenom: 'Aïcha',
      telephone: '0506070809',
      adresse: 'Yopougon',
      email: 'aicha@mail.com',
      profession: 'Commerçante',
      sexe: 'F',
      dateInscription: '2025-05-13',
      produitsAchetes: 'Téléphone',
      montantTotal: 75000,
      nomVendeur: 'TRAORÉ Fatou',
      modePaiement: 'Espèces'
    }
  ];

  const filteredClients = clients.filter(client => {
    const fullName = `${client.nom} ${client.prenom}`.toLowerCase();
    const dateInRange =
      (!startDate || client.dateInscription >= startDate) &&
      (!endDate || client.dateInscription <= endDate);
    const matchesSearch = !searchTerm || fullName.includes(searchTerm.toLowerCase());
    return dateInRange && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rapport-container">
      <aside className="rapport-sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <p className="username">Nom d'utilisateur</p>
          <div className="status-indicator" />
        </div>
        <button className="nav-button" onClick={() => navigate('/page_d_accueil')}>
          Accueil
        </button>
        <button className="nav-acceuil">Se déconnecter</button>
      </aside>

      <div className="rapport-main">
        <header className="rapport-header">
          <div className="logo">LOGO</div>
          <div className="company-name">GES</div>
        </header>

        <div className="rapport-body">
          <h2>RAPPORT</h2>

          <div className="filter-bar">
            <div className="left-filters">
              <div className="date-group">
                <label htmlFor="start-date">Date de début</label>
                <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="date-group">
                <label htmlFor="end-date">Date de fin</label>
                <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div className="search-group">
                <input
                  type="text"
                  placeholder="Rechercher"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="action-buttons">
              <button onClick={() => {
                setStartDate('');
                setEndDate('');
                setSearchTerm('');
              }}>
                Rafraîchir
              </button>
            </div>
          </div>

          <div className="rapport-dropdown-container">
            <select value={selectedRapport} onChange={(e) => setSelectedRapport(e.target.value)}>
              <option value="">-- Sélectionner un rapport --</option>
              <option value="clients">Rapport Gestions Clients</option>
              <option value="fournisseurs">Rapports gestion fournisseurs</option>
              <option value="commandes">Rapports gestion commandes</option>
            </select>
          </div>

          <div className="rapport-content">
            {selectedRapport === 'clients' && (
  <div className="print-area">
    <h3>Liste des clients</h3>
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
      <tfoot>
        <tr>
          <td colSpan="8" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total :</td>
          <td style={{ fontWeight: 'bold' }}>
            {filteredClients.reduce((sum, client) => sum + client.montantTotal, 0)} FCFA
          </td>
          <td colSpan="2"></td>
        </tr>
      </tfoot>
    </table>

    <button onClick={handlePrint} className="print-button">🖨️ Imprimer le rapport</button>
    </div>
    )}

            {selectedRapport === 'fournisseurs' && <p>Affichage du rapport de gestion des fournisseurs.</p>}
            {selectedRapport === 'commandes' && <p>Affichage du rapport de gestion des commandes.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionRapport;
