
import React, { useState, useEffect  } from 'react';
import './configuration.css';

import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';



const modules = [
  "Gestion client",
  "Gestion commande",
  "Gestion fournisseurs",
  "Configuration",
  "Rapport"
];

// Composant pour afficher les checkboxes des modules
function ModuleCheckboxList({ selectedModules, onChange }) {
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      onChange([...selectedModules, value]);
    } else {
      onChange(selectedModules.filter(m => m !== value));
    }
  };

  return (
    <div>
      {modules.map(module => (
        <label key={module} style={{ display: 'block', cursor: 'pointer' }}>
          <input
            type="checkbox"
            value={module}
            checked={selectedModules.includes(module)}
            onChange={handleCheckboxChange}
          />
          {" "}Module {module}
        </label>
      ))}
    </div>
  );
}

export default function Configuration() {
  const [showUserTable, setShowUserTable] = useState(true);

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [showFormPage, setShowFormPage] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    motDePasse: '',
    email: '',
    role: '',
    telephone: '',
    modules: []
  });


const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedUsers = localStorage.getItem('utilisateurs');
  if (savedUsers) {
    setUtilisateurs(JSON.parse(savedUsers));
  }

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
  localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
}, [utilisateurs]);


  const handleAdd = () => {

    if (editIndex !== null) {
    // Modification
    const updatedUsers = [...utilisateurs];
    updatedUsers[editIndex] = formData;
    setUtilisateurs(updatedUsers);
    setEditIndex(null);
  } else {
    // Création
    setUtilisateurs([...utilisateurs, formData]);
  }

    
    setFormData({
      nom: '',
      motDePasse: '',
      email: '',
      role: '',
      telephone: '',
      modules: []
    });
    setShowFormPage(false);
  };

  

  const handleEdit = (index) => {
  setFormData(utilisateurs[index]);
  setEditIndex(index);
  setShowFormPage(true);
};

const handleDelete = (index) => {
    const updatedList = [...utilisateurs];
    updatedList.splice(index, 1);
    setUtilisateurs(updatedList);
  };

  

   const handleModuleChange = (newModules) => {
    setFormData(prev => ({ ...prev, modules: newModules }));
  };
    
  

   if (showFormPage) {
    return (
      <div className="form-page">
        <div className="form-container">
          <h2>Créer un utilisateur</h2>
          <div className="form">
            <input 
              placeholder="Nom d'utilisateur" 
              value={formData.nom} 
              onChange={e => setFormData({ ...formData, nom: e.target.value })} 
            />

            <input
            type="password"
            placeholder="Mot de passe"
            value={formData.motDePasse}
            onChange={e => setFormData({ ...formData, motDePasse: e.target.value })}
            />



            <input 
              placeholder="Email" 
              value={formData.email} 
              onChange={e => setFormData({ ...formData, email: e.target.value })} 
            />
            
            <select 
              value={formData.role} 
              onChange={e => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="">Sélectionner un rôle</option>
              <option value="Administrateur">Administrateur</option>
              <option value="Fournisseur">Gestionnaire</option>
            </select>

            <input 
              placeholder="Téléphone" 
              value={formData.telephone} 
              onChange={e => setFormData({ ...formData, telephone: e.target.value })} 
            />

            {/* Affichage des modules avec cases à cocher */}
            <ModuleCheckboxList 
              selectedModules={formData.modules} 
              onChange={handleModuleChange} 
            />
          </div>

          <div className="form-buttons">
            <button className="btn" onClick={handleAdd}>{editIndex !== null ? "Mettre à jour" : "Enregistrer"}</button>
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
          <div>{username}</div>
          <div className="status-dot"></div>
        </div>
        <button onClick={() => navigate('/page_d_accueil')}>Accueil</button>

        <button onClick={() => {
        setShowFormPage(false);
        setShowUserTable(true);
        }}>Utilisateur</button>

        {/* <button className="">Utilisateur</button> */}
      </div>

      <div className="main-content">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="company-name"><h1>G.E.S</h1></div>
        </div>

        <div className="content">
          <div className="top-bar">
            <h2>Configuration des utilisateurs</h2>
            <div className="actions">

              <button
              className="btn"
              onClick={() => {
              setShowFormPage(true);
              setShowUserTable(false); // 👈 Ajout
             }}
>
  Créer un utilisateur
</button>

              {/* <button className="btn" onClick={() => setShowFormPage(true)}>Créer un utilisateur</button> */}
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
