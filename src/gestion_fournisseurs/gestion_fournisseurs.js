import React, { useState } from 'react';
import './gestion_fournisseurs.css';
import { useNavigate } from 'react-router-dom';

export default function GestionFournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [showFormPage, setShowFormPage] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    produit: '',
    quantite: '',
    email: '',
    numero: '',
    date: '',
  });

  const resetForm = () => {
    setFormData({
      nom: '',
      entreprise: '',
      produit: '',
      quantite: '',
      email: '',
      numero: '',
      date: '',
    });
    setEditingIndex(null);
    setShowFormPage(false);
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
    const newList = [...fournisseurs];
    newList.splice(index, 1);
    setFournisseurs(newList);
  };

   const navigate = useNavigate();
  const handleEdit = (index) => {
    setFormData(fournisseurs[index]);
    setEditingIndex(index);
    setShowFormPage(true);
  };

  if (showFormPage) {
    return (
      <div className="form-page">
        <div className="form-container">
          <h2>{editingIndex !== null ? "Modifier" : "Ajouter"} un fournisseur</h2>
          <div className="form">
            <input placeholder="Nom" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} />
            <input placeholder="Entreprise" value={formData.entreprise} onChange={e => setFormData({ ...formData, entreprise: e.target.value })} />
            <input placeholder="Produit" value={formData.produit} onChange={e => setFormData({ ...formData, produit: e.target.value })} />
            <input placeholder="Quantité" value={formData.quantite} onChange={e => setFormData({ ...formData, quantite: e.target.value })} />
            <input placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <input placeholder="Numéro" value={formData.numero} onChange={e => setFormData({ ...formData, numero: e.target.value })} />
            <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          </div>
          <div className="form-buttons">
            <button className="btn" onClick={handleAddOrEdit}>
              {editingIndex !== null ? "Mettre à jour" : "Enregistrer"}
            </button>
            <button className="btn" onClick={resetForm}>Annuler</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="user-info">
          <div className="user-icon">👤</div>
          <div>Nom d’utilisateur</div>
          <div className="status-dot"></div>
        </div>
        <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
        <button className="btn">Commande en attente</button>
        <button className="btn">Commande validée</button>
        <button className="btn">Commande effectuée</button>
        <button className="btn">Rapport</button>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="logo">📦</div>
          <div className="company-name">NOM DE L’ENTREPRISE</div>
        </div>

        <div className="content">
          <div className="top-bar">
            <h2>Gestion des fournisseurs</h2>
            <div className="actions">
              <button className="btn" onClick={() => setShowFormPage(true)}>Ajouter</button>
              <select className="dropdown">
                <option value="">Liste des fournisseurs</option>
                {fournisseurs.map((f, i) => (
                  <option key={i} value={f.nom}>{f.nom}</option>
                ))}
              </select>
              <button className="btn" onClick={() => alert('Données à jour !')}>Rafraîchir</button>
            </div>
          </div>

          <div className="data-table">
            {fournisseurs.length === 0 ? (
              <p>Aucun fournisseur ajouté.</p>
            ) : (
              <table>
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
                  {fournisseurs.map((f, index) => (
                    <tr key={index}>
                      <td>{f.nom}</td>
                      <td>{f.entreprise}</td>
                      <td>{f.produit}</td>
                      <td>{f.quantite}</td>
                      <td>{f.email}</td>
                      <td>{f.numero}</td>
                      <td>{f.date}</td>
                      <td>
                        <button className="btn-sm" onClick={() => handleEdit(index)}>Modifier</button>
                        <button className="btn-sm" onClick={() => handleDelete(index)}>Supprimer</button>
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
