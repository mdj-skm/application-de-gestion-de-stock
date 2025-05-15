import React, { useState } from 'react';
import './configuration.css';

export default function Configuration() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [showFormPage, setShowFormPage] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    role: '',
    telephone: '',
    modules: []
  });

  const handleAdd = () => {
    setUtilisateurs([...utilisateurs, formData]);
    setFormData({
      nom: '',
      email: '',
      role: '',
      telephone: '',
      modules: []
    });
    setShowFormPage(false);
  };

  const handleDelete = (index) => {
    const updatedList = [...utilisateurs];
    updatedList.splice(index, 1);
    setUtilisateurs(updatedList);
  };

  const handleModuleChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, modules: selected });
  };

  if (showFormPage) {
    return (
      <div className="form-page">
        <div className="form-container">
          <h2>Créer un utilisateur</h2>
          <div className="form">
            <input placeholder="Nom" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} />
            <input placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            
            <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
              <option value="">Sélectionner un rôle</option>
              <option value="Administrateur">Administrateur</option>
              <option value="Fournisseur">Fournisseur</option>
            </select>

            <input placeholder="Téléphone" value={formData.telephone} onChange={e => setFormData({ ...formData, telephone: e.target.value })} />
            
            <label>Modules attribués :</label>
            <select multiple value={formData.modules} onChange={handleModuleChange}>
              <option value="Gestion client">Module gestion client</option>
              <option value="Gestion commande">Module gestion commande</option>
              <option value="Gestion fournisseurs">Module gestion fournisseurs</option>
              <option value="Configuration">Module configuration</option>
              <option value="Rapport">Module rapport</option>
            </select>
          </div>

          <div className="form-buttons">
            <button className="btn" onClick={handleAdd}>Enregistrer</button>
            <button className="btn" onClick={() => setShowFormPage(false)}>Annuler</button>
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
        <button className="btn">Accueil</button>
        <button className="btn">Utilisateur</button>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="logo">Logo</div>
          <div className="company-name">NOM DE L’ENTREPRISE</div>
        </div>

        <div className="content">
          <div className="top-bar">
            <h2>Configuration des utilisateurs</h2>
            <div className="actions">
              <button className="btn" onClick={() => setShowFormPage(true)}>Créer un utilisateur</button>
              <button className="btn">Rafraîchir</button>
            </div>
          </div>

          <div className="data-table">
            {utilisateurs.length === 0 ? (
              <p>Aucun utilisateur ajouté.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Téléphone</th>
                    <th>Modules</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {utilisateurs.map((user, index) => (
                    <tr key={index}>
                      <td>{user.nom}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.telephone}</td>
                      <td>{user.modules.join(', ')}</td>
                      <td>
                        <button className="btn-sm">Modifier</button>
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
