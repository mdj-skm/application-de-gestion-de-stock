
import React, { useState, useEffect  } from 'react';
import './configuration.css';

import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';



const modules = [
  "Gestion fournisseurs",
  "Gestion commande",
  "gestion caisse",
  "Gestion client",
  "Gestion stocks",
  "Gestion corbeil",
  "Rapport",
  "Gestion statistiques",
  "Configuration",
  "Gestion utilisateurs",
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
  fetch('http://localhost:8000/api/configuration/utilisateurs/')
    .then(res => res.json())
    .then(data => {
  // Si data est un tableau (pas d'objet avec results)
  if (Array.isArray(data)) {
    setUtilisateurs(data);
  } else {
    setUtilisateurs(data.results || []);
  }
})

    .catch(err => console.error(err));

  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    setUsername(savedUsername);
  }
}, []);



  const handleAdd = async () => {
  const isEdit = editIndex !== null;
  const method = isEdit ? 'PUT' : 'POST';
  const url = isEdit
    ? `http://localhost:8000/api/configuration/utilisateurs/${utilisateurs[editIndex].id}/`
    : 'http://localhost:8000/api/configuration/utilisateurs/';

  const payload = {
    ...formData,
    mot_de_passe: formData.motDePasse // toujours en clair
  };

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
    const errorData = await response.json();  // 👈 Affiche le vrai message d'erreur
    console.error("Erreur backend :", errorData);
    throw new Error("Erreur d'enregistrement");
  }

    const newUser = await response.json();

    if (isEdit) {
      const updatedUsers = [...utilisateurs];
      updatedUsers[editIndex] = newUser;
      setUtilisateurs(updatedUsers);
      setEditIndex(null);
    } else {
      setUtilisateurs([...utilisateurs, newUser]);
    }

    setFormData({
      nom: '',
      motDePasse: '',
      email: '',
      role: '',
      telephone: '',
      modules: [],
    });
    setShowFormPage(false);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
  }
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
    <div className="containerCON">
      <div className="sidebarCON">
        <div className="user-info">
          <div className="user-iconCON">👤</div>
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
        <div className="headerCON">
          <img src={logo} alt="Logo" className="logoCON" />
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
              <button className="btn" onClick={() => {
  fetch('http://localhost:8000/api/configuration/utilisateurs/')
    .then(res => res.json())
    .then(data => setUtilisateurs(data.results || []))
}}>Rafraîchir</button>

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
