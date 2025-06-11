import React, { useState, useEffect, useContext } from 'react';
import './gestion_fournisseurs.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { StockContext } from '../contexts/StockContext';

export default function GestionFournisseurs() {
  const { fournisseurs, setFournisseurs } = useContext(StockContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const [showFormPage, setShowFormPage] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    produit: '',
    quantite: '',
    email: '',
    numero: '',
    date: new Date().toISOString().split('T')[0], // 👈 format 'YYYY-MM-DD'
  });

  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/fournisseurs/')
      .then(res => res.json())
      .then(data => setFournisseurs(data))
      .catch(err => console.error('Erreur fetch fournisseurs:', err));
  }, [setFournisseurs]);

  const showMessage = (msg) => {
  setMessage(msg);
  setTimeout(() => setMessage(''), 3000); // disparait après 3 secondes
  };


  const resetForm = () => {
    setFormData({
      nom: '',
      entreprise: '',
      produit: '',
      quantite: '',
      email: '',
      numero: '',
      date: new Date().toISOString().split('T')[0], // 👈 ici aussi
    });
    setEditingIndex(null);
    setShowFormPage(false);
  };

  const handleAddOrEdit = async () => {
    if (!formData.nom || !formData.email) {
      alert("Le nom et l'email sont obligatoires.");
      return;
    }

    try {
      const url = editingIndex !== null
        ? `http://localhost:8000/api/fournisseurs/${fournisseurs[editingIndex].id}/`
        : 'http://localhost:8000/api/fournisseurs/';
      const method = editingIndex !== null ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du fournisseur");
      }

      const savedFournisseur = await response.json();

      if (editingIndex !== null) {
        const updatedList = [...fournisseurs];
        updatedList[editingIndex] = savedFournisseur;
        setFournisseurs(updatedList);
      } else {
        setFournisseurs([...fournisseurs, savedFournisseur]);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement !");
    }
  };

  const handleDelete = async (index) => {
    const fournisseurToDelete = fournisseurs[index];
    if (!window.confirm(`Voulez-vous vraiment supprimer ${fournisseurToDelete.nom} ?`)) return;

    try {
      const response = await fetch(`http://localhost:8000/api/fournisseurs/${fournisseurToDelete.id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur suppression fournisseur');
      }

      const newList = [...fournisseurs];
      newList.splice(index, 1);
      setFournisseurs(newList);
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression');
    }
  };

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
            {/* <input placeholder="Produit" value={formData.produit} onChange={e => setFormData({ ...formData, produit: e.target.value })} /> */}
            
            <select
  value={formData.produit}
  onChange={e => setFormData({ ...formData, produit: e.target.value })}
>
  <option value="">-- Choisir un produit --</option>
  <option value="lait">lait</option>
  <option value="sucre">sucre</option>
  <option value="riz">riz</option>
  <option value="huile">huile</option>
  <option value="eau minérale">eau minérale</option>
  <option value="sardine">sardine</option>
  <option value="sel">sel</option>
  <option value="chaussure">chaussure</option>
  <option value="teeshirt">teeshirt</option>
  <option value="pantalon">pantalon</option>
  <option value="casquette">casquette</option>
  <option value="moto">moto</option>
  <option value="velo">velo</option>
  <option value="voiture">voiture</option>
  <option value="ventilateur">ventilateur</option>
  <option value="climatiseur">climatiseur</option>
  <option value="ampoule">ampoule</option>
  <option value="matelas">matelas</option>
  <option value="natte">natte</option>
  <option value="tv plasma">tv plasma</option>
  <option value="chaise">chaise</option>
  <option value="ordinateur bureau">ordinateur bureau</option>
  <option value="ordinateur portable">ordinateur portable</option>
  <option value="téléphone">téléphone</option>
  <option value="chargeur">chargeur</option>
  <option value="tablette">tablette</option>
  <option value="savon">savon</option>
  <option value="parfum">parfum</option>
</select>

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
          <div>{username}</div>
          <div className="status-dot"></div>
        </div>
        <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>
        <button className="btn" onClick={() => navigate('/commandes_en_cours2')}>Commande en attente</button>
        <button className="btn" onClick={() => navigate('/commandes_validees2')}>Commande validée</button>
        <button className="btn" onClick={() => navigate('/commandes_livrees2')}>Commande effectuée</button>
        <button className="btn" onClick={() => navigate('/imprimer2')}>Imprimé</button>
        <button className="btn" onClick={() => navigate('/historique2')}>Voir Historique</button>
        <button className="btn" onClick={() => window.location.reload()}>Réinitialiser</button>
      </div>

      <div className="main-content">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>

        <div className="content">
          {message && (
          <div className="notification">
          {message}
          </div>
          )}

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
              <button className="btn" onClick={() => window.location.reload()}>Rafraîchir</button>
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
