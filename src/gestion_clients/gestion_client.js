import React, { useState } from 'react';
import './gestion_client.css';

const GestionClient = () => {
  const [clients, setClients] = useState([]); // Liste réelle à connecter à la base plus tard
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // État pour la date sélectionnée
  const [isFormVisible, setIsFormVisible] = useState(false); // État pour afficher ou masquer le formulaire
  const [newClient, setNewClient] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
    email: '',
    profession: '',
    sexe: '',
    dateInscription: new Date().toISOString().split('T')[0], // Défini à la date actuelle par défaut
    produitsAchetes: '',
    montantTotal: '',
    nomVendeur: '',
    modePaiement: ''
  });

  const handleRefresh = () => {
    setSearchTerm('');
    setSelectedDate(''); // Réinitialise la date de recherche
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation basique
    if (!newClient.nom || !newClient.prenom || !newClient.telephone || !newClient.adresse) {
      alert('Les champs obligatoires doivent être remplis.');
      return;
    }

    // Ajouter le client à la liste des clients
    setClients((prevClients) => [...prevClients, newClient]);

    // Réinitialiser le formulaire
    setNewClient({
      nom: '',
      prenom: '',
      telephone: '',
      adresse: '',
      email: '',
      profession: '',
      sexe: '',
      dateInscription: new Date().toISOString().split('T')[0],
      produitsAchetes: '',
      montantTotal: '',
      nomVendeur: '',
      modePaiement: ''
    });

    // Cacher le formulaire
    setIsFormVisible(false);
  };

  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Fonction pour filtrer les clients par date d'ajout (selon la date sélectionnée)
  const filterClientsByDate = (clients) => {
    if (!selectedDate) return clients; // Si aucune date n'est sélectionnée, retourne tous les clients

    return clients.filter(client => {
      const clientDate = client.dateInscription;
      return clientDate === selectedDate; // Comparer la date du client avec la date sélectionnée
    });
  };

  const filteredClients = filterClientsByDate(clients).filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gc-container">
      <aside className="gc-sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <p className="username">Nom d'utilisateur</p>
          <div className="status-indicator" />
        </div>
        <button className="nav-button">Accueil</button>
        <button className="nav-acceuil">Se deconnecter</button>
      </aside>

      <header className="gc-header">
        <div className="logo">LOGO</div>
        <div className="company-name">GES</div>
      </header>

      <main className="gc-main-content">
        <div className="top-bar">
          <h2>GESTION CLIENTS</h2>
        </div>

        <div className="filter-bar">
          <div className="left-filters">
            <div className="date-group">
              <label htmlFor="start-date">Date d'ajout du client(e)</label>
              <input
                type="date"
                id="start-date"
                className="date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)} // Mise à jour de la date sélectionnée
              />
            </div>
            <input
              type="text"
              id="search-input"
              className="search-input"
              placeholder="Recherche par nom"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="right-actions">
            <button className="refresh-button" onClick={handleRefresh}>Rafraîchir</button>
            <button className="add-client-button" onClick={handleToggleForm}>Ajouter client</button>
          </div>
        </div>

        {/* Formulaire d'ajout de client */}
        {isFormVisible && (
          <div className="form-container">
            <h3>Ajouter un client</h3>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td><label>Nom (obligatoire):</label></td>
                    <td><input
                      type="text"
                      name="nom"
                      value={newClient.nom}
                      onChange={handleInputChange}
                      required
                    /></td>
                  
                    <td><label>Prénom (obligatoire):</label></td>
                    <td><input
                      type="text"
                      name="prenom"
                      value={newClient.prenom}
                      onChange={handleInputChange}
                      required
                    /></td>
                    <td><label>Téléphone (obligatoire et valide):</label></td>
                    <td><input
                      type="tel"
                      name="telephone"
                      value={newClient.telephone}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}" // Validation de numéro de téléphone
                    /></td>
                  </tr>
                  <tr>
                    <td><label>Adresse:</label></td>
                    <td><input
                      type="text"
                      name="adresse"
                      value={newClient.adresse}
                      onChange={handleInputChange}
                    /></td>
                  
                    <td><label>Email:</label></td>
                    <td><input
                      type="email"
                      name="email"
                      value={newClient.email}
                      onChange={handleInputChange}
                    /></td>
                  
                    <td><label>Profession:</label></td>
                    <td><input
                      type="text"
                      name="profession"
                      value={newClient.profession}
                      onChange={handleInputChange}
                    /></td>
                  </tr>
                  <tr>
                    <td><label>Sexe / Genre:</label></td>
                    <td><input
                      type="text"
                      name="sexe"
                      value={newClient.sexe}
                      onChange={handleInputChange}
                    /></td>
                  
                    <td><label>Date d'inscription:</label></td>
                    <td><input
                      type="date"
                      name="dateInscription"
                      value={newClient.dateInscription}
                      onChange={handleInputChange}
                      readOnly
                    /></td>
                  
                    <td><label>Produit(s) acheté(s):</label></td>
                    <td><input
                      type="text"
                      name="produitsAchetes"
                      value={newClient.produitsAchetes}
                      onChange={handleInputChange}
                    /></td>
                  </tr>
                  <tr>
                    <td><label>Montant total:</label></td>
                    <td><input
                      type="number"
                      name="montantTotal"
                      value={newClient.montantTotal}
                      onChange={handleInputChange}
                    /></td>
                  
                    <td><label>Nom du vendeur / caissière:</label></td>
                    <td><input
                      type="text"
                      name="nomVendeur"
                      value={newClient.nomVendeur}
                      onChange={handleInputChange}
                    /></td>
                  
                    <td><label>Mode de paiement:</label></td>
                    <td><input
                      type="text"
                      name="modePaiement"
                      value={newClient.modePaiement}
                      onChange={handleInputChange}
                    /></td>
                  </tr>
                </tbody>
              </table>
              <button type="submit">Ajouter Client</button>
            </form>
          </div>
        )}

        <div className="data-display">
          {filteredClients.length > 0 ? (
            <table className="client-table">
              <thead>
                <tr>
                  <th>Nom</th>
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
                    <td>{client.montantTotal}</td>
                    <td>{client.nomVendeur}</td>
                    <td>{client.modePaiement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun client trouvé.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default GestionClient;
