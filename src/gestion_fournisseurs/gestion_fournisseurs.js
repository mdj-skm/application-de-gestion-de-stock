import React, { useState, useEffect } from 'react';
import './gestion_fournisseurs.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function GestionFournisseurs() {
  const navigate = useNavigate();
  const [fournisseurs, setFournisseurs] = useState([]);
  const [message, setMessage] = useState('');
  const [showFormPage, setShowFormPage] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    email: '',
    numero: '',
    date: new Date().toISOString().split('T')[0],
    produits: [{ nom: '', quantite: '' }],
  });

  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      entreprise: '',
      email: '',
      numero: '',
      date: new Date().toISOString().split('T')[0],
      produits: [{ nom: '', quantite: '' }],
    });
    setEditingIndex(null);
    setShowFormPage(false);
  };

  const ajouterProduit = () => {
    setFormData({
      ...formData,
      produits: [...formData.produits, { nom: '', quantite: '' }],
    });
  };

  const handleAddOrEdit = () => {
    if (!formData.nom || !formData.email) {
      alert("Le nom et l'email sont obligatoires.");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...fournisseurs];
      updated[editingIndex] = formData;
      setFournisseurs(updated);
    } else {
      setFournisseurs([...fournisseurs, formData]);
    }

    resetForm();
  };

  const handleDelete = (index) => {
    if (window.confirm(`Voulez-vous vraiment supprimer ${fournisseurs[index].nom} ?`)) {
      const newList = [...fournisseurs];
      newList.splice(index, 1);
      setFournisseurs(newList);
    }
  };

  const handleEdit = (index) => {
    setFormData(fournisseurs[index]);
    setEditingIndex(index);
    setShowFormPage(true);
  };

  if (showFormPage) {
    return (
      <div className="form-page-b">
        <div className="form-container-b">
          <h2 className="titre-formulaire-b">
            {editingIndex !== null ? (
              <>
                <span className="g-b">M</span>odifier un <span className="f-b">F</span>ournisseur
              </>
            ) : (
              <>
                <span className="g-b">A</span>jouter un <span className="f-b">F</span>ournisseur
              </>
            )}
          </h2>
          <div className="form-b">
            <input placeholder="Nom" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} />
            <input placeholder="Entreprise" value={formData.entreprise} onChange={e => setFormData({ ...formData, entreprise: e.target.value })} />
            <input placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <input placeholder="Numéro" value={formData.numero} onChange={e => setFormData({ ...formData, numero: e.target.value })} />
            <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />

            <h4>Produits attribués</h4>
            {formData.produits.map((produit, index) => (
              <div key={index}>
                <input
                  placeholder="Nom du produit"
                  value={produit.nom}
                  onChange={e => {
                    const newProduits = [...formData.produits];
                    newProduits[index].nom = e.target.value;
                    setFormData({ ...formData, produits: newProduits });
                  }}
                />
                <input
                  placeholder="Quantité"
                  value={produit.quantite}
                  onChange={e => {
                    const newProduits = [...formData.produits];
                    newProduits[index].quantite = e.target.value;
                    setFormData({ ...formData, produits: newProduits });
                  }}
                />
              </div>
            ))}
            <button onClick={ajouterProduit}>Ajouter un produit</button>
          </div>
          <div className="form-buttons-b">
            <button className="btn-b" onClick={handleAddOrEdit}>
              {editingIndex !== null ? "Mettre à jour" : "Enregistrer"}
            </button>
            <button className="btn-b" onClick={resetForm}>Annuler</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-b">
      <div className="sidebar-b">
        <div className="user-info-b">
          <div className="user-icon-b">👤</div>
          <div>{username}</div>
          <div className="status-dot-b"></div>
        </div>
        <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
      </div>

      <div className="main-content-b">
        <div className="header-b">
          <div className="header-content-b">
            <img src={logo} alt="Logo" className="logo" />
            <div className="company-name-b"><h1>G.E.S</h1></div>
          </div>
        </div>

        <div className="content-b">
          {message && <div className="notification-b">{message}</div>}

          <div className="top-bar-b">
            <h2 className="titre-fournisseur-b">
              <span className="g-b">G</span>estion des <span className="f-b">F</span>ournisseurs
            </h2>
            <div className="actions-b">
              <button className="btn-b" onClick={() => setShowFormPage(true)}>Ajouter</button>
              <select className="dropdown-b">
                <option value="">Liste des fournisseurs</option>
                {fournisseurs.map((f, i) => (
                  <option key={i} value={f.nom}>{f.nom}</option>
                ))}
              </select>
              <button className="btn-b" onClick={() => window.location.reload()}>Rafraîchir</button>
            </div>
          </div>

          <div className="data-table-b">
            {fournisseurs.length === 0 ? (
              <p>Aucun fournisseur ajouté.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Entreprise</th>
                    <th>Email</th>
                    <th>Numéro</th>
                    <th>Date</th>
                    <th>Produits</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseurs.map((f, index) => (
                    <tr key={index}>
                      <td>{f.nom}</td>
                      <td>{f.entreprise}</td>
                      <td>{f.email}</td>
                      <td>{f.numero}</td>
                      <td>{f.date}</td>
                      <td>
                        <ul>
                          {f.produits.map((p, i) => (
                            <li key={i}>{p.nom} - {p.quantite}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <button className="btn-sm-b" onClick={() => handleEdit(index)}>Modifier</button>
                        <button className="btn-sm-b" onClick={() => handleDelete(index)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
