import React, { useState, useEffect } from 'react'; // Importation de React et des hooks useState, useEffect
import './gestion_client.css'; // Importation du fichier CSS spécifique
import { useNavigate } from 'react-router-dom'; // Hook pour la navigation entre les pages
import logo from '../assets/logo.png'; // Importation du logo



const GestionClient = () => {
  const navigate = useNavigate(); // Initialisation de la fonction de navigation

  // État pour stocker le nom d'utilisateur
  const [username, setUsername] = useState('');
  // État pour stocker la liste des clients
  const [clients, setClients] = useState([]);
  // État pour la recherche par nom
  const [searchTerm, setSearchTerm] = useState('');
  // État pour le filtrage par date
  const [selectedDate, setSelectedDate] = useState('');
  // État pour afficher ou non le formulaire
  const [isFormVisible, setIsFormVisible] = useState(false);
  // État pour stocker les données du nouveau client
  const [newClient, setNewClient] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
    email: '',
    profession: '',
    sexe: '',
    dateInscription: new Date().toISOString().split('T')[0], // Date du jour
    produitsAchetes: '',
    montantTotal: '',
    nomVendeur: '',
    modePaiement: ''
  });

  // useEffect pour récupérer les données au chargement
  useEffect(() => {
    const savedUsername = localStorage.getItem('username'); // Récupération de l'utilisateur

    if (!savedUsername) {
      navigate('/'); // Redirection vers la page de connexion si pas de session
    } else {
      setUsername(savedUsername);
      setNewClient((prev) => ({ ...prev, nomVendeur: savedUsername }));
    }

    // Récupération des clients depuis le backend Django
    fetch('http://localhost:8000/api/clients/')
      .then((res) => res.json())
      .then((data) => setClients(data)) // Mise à jour de l'état clients
      .catch((err) => console.error(err)); // Gestion des erreurs
  }, [navigate]);

  // Réinitialiser les filtres
  const handleRefresh = () => {
    setSearchTerm('');
    setSelectedDate('');
  };

  // Mise à jour des champs du formulaire
  const handleInputChange = (e) => {

    const { name, value } = e.target;
    
    const valueToStore = name === 'montantTotal' && value === '' ? null : value;

    setNewClient((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Afficher/Masquer le formulaire
  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Soumission du formulaire (ajout ou modification)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nom, prenom, telephone, adresse } = newClient;

    if (!nom || !prenom || !telephone || !adresse) {
      alert('Les champs obligatoires doivent être remplis.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/clients/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        const savedClient = await response.json();
        setClients((prev) => [...prev, savedClient]); // Ajout du nouveau client à la liste

        // Réinitialisation du formulaire
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
          nomVendeur: username,
          modePaiement: ''
        });

        setIsFormVisible(false); // Cacher le formulaire après soumission
      } else {
        const errorData = await response.json();
        alert("Erreur lors de l'enregistrement: " + (errorData.detail || JSON.stringify(errorData)));
      }
    } catch (error) {
  console.error("Erreur lors de l'envoi du formulaire :", error);
  alert("Une erreur est survenue : " + error.message);
    }
  };

  // Pré-remplir le formulaire avec les infos du client sélectionné pour modification
  const handleEdit = (client) => {
    setNewClient(client);
    setIsFormVisible(true);
  };

  // Suppression d'un client
  const handleDelete = async (client) => {
    if (window.confirm(`Voulez-vous vraiment supprimer ${client.nom} ${client.prenom} ?`)) {
      try {
        const response = await fetch(`http://localhost:8000/api/clients/${client.id}/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setClients((prev) => prev.filter((c) => c.id !== client.id));
        } else {
          alert("Erreur lors de la suppression.");
        }
      } catch (error) {
        console.error(error);
        alert("Une erreur est survenue.");
      }
    }
  };

  // Filtrage des clients selon les critères de recherche
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? client.dateInscription === selectedDate : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="gc-container">
      {/* Barre latérale gauche */}
      <aside className="gc-sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <p className="username">{username}</p>
          <div className="status-indicator" />
        </div>
        <button className="logout-button" onClick={() => navigate('/page_d_accueil')}>
          Accueil
        </button>
        <button
          className="logout-button"
          onClick={() => {
            alert('Déconnexion...');
            localStorage.removeItem('username'); // Suppression de la session
            navigate('/'); // Redirection vers la connexion
          }}
        >
          Se déconnecter
        </button>
      </aside>

      {/* En-tête */}
      <header className="gc-header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="company-name"><h1>G.E.S</h1></div>
      </header>

      {/* Contenu principal */}
      <main className="gc-main-content">
        <div className="top-bar">
          <center><h2 className="top-title">GESTION CLIENTS</h2></center>
        </div>

        {/* Barre de filtres */}
        <div className="filter-bar">
          <div className="left-filters">
            <div className="date-group">
              <label htmlFor="start-date">Date d'ajout du client(e)</label>
              <input
                type="date"
                id="start-date"
                className="date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
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

          {/* Actions */}
          <div className="right-actions">
            <button className="refresh-button" onClick={handleRefresh}>
              Rafraîchir
            </button>

            <button className="add-client-button" onClick={handleToggleForm}>
              {isFormVisible ? "Annuler" : "Ajouter client"}
            </button>
          </div>
        </div>

        {/* Formulaire d'ajout/modification client */}
        {isFormVisible && (
          <div className="form-container2">
            <h3><center>Ajouter un client</center></h3>
            <form onSubmit={handleSubmit}>
              <div class="table-container">
              <table class="client-table">
                <tbody>
                  <tr>
                    <td><label>Nom :</label></td>
                    <td><input type="text" name="nom" value={newClient.nom} onChange={handleInputChange} required /></td>

                    <td><label>Prénom:</label></td>
                    <td><input type="text" name="prenom" value={newClient.prenom} onChange={handleInputChange} required /></td>

                    <td><label>Téléphone:</label></td>
                    <td><input type="tel" name="telephone" value={newClient.telephone} onChange={handleInputChange} required pattern="[0-9]{10}" /></td>
                  </tr>

                  <tr>
                    <td><label>Adresse :</label></td>
                    <td><input type="text" name="adresse" value={newClient.adresse} onChange={handleInputChange} required/></td>

                    <td><label>Email :</label></td>
                    <td><input type="email" name="email" value={newClient.email} onChange={handleInputChange} /></td>

                    <td><label>Profession :</label></td>
                    <td><input type="text" name="profession" value={newClient.profession} onChange={handleInputChange} /></td>
                  </tr>

                  <tr>
                    <td><label>Sexe :</label></td>
                    <td>
                      <select name="sexe" value={newClient.sexe} onChange={handleInputChange}>
                        <option value="">-- Sélectionnez --</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                      </select>
                    </td>

                    <td><label>Date d'inscription:</label></td>
                    <td><input type="date" name="dateInscription" value={newClient.dateInscription} readOnly /></td>

                    <td><label>Produits achetés:</label></td>
                    <td><input type="text" name="produitsAchetes" value={newClient.produitsAchetes} onChange={handleInputChange} /></td>
                  </tr>

                  <tr>
                    <td><label>Montant total:</label></td>
                    <td><input type="number" name="montantTotal" value={newClient.montantTotal} onChange={handleInputChange} /></td>

                    <td><label>Nom du vendeur :</label></td>
                    <td><input type="text" name="nomVendeur" value={newClient.nomVendeur} onChange={handleInputChange} readOnly /></td>

                    <td><label>Mode de paiement :</label></td>
                    <td>
                      <select name="modePaiement" value={newClient.modePaiement} onChange={handleInputChange} required>
                        <option value="">-- Sélectionnez --</option>
                        <option value="mtn">MTN</option>
                        <option value="orange">ORANGE</option>
                        <option value="moov">MOOV</option>
                        <option value="wave">WAVE</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
              <button type="submit">Ajouter Client</button>
            </form>
          </div>
        )}

        {/* Affichage des clients sous forme de tableau */}
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
                  <th>Prix</th>
                  <th>Nom du vendeur</th>
                  <th>Mode de paiement</th>
                  <th>Actions</th>
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
                    <td>{client.montantTotal}FCFA</td>
                    <td>{client.nomVendeur}</td>
                    <td>{client.modePaiement}</td>
                    <td>
                      <button className="action-button edit-button" onClick={() => handleEdit(client)}>Modifier</button>
                      <button className="action-button delete-button" onClick={() => handleDelete(client)}>Supprimer</button>
                    </td>
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
