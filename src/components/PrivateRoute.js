// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedModules, moduleName }) => {
  const username = localStorage.getItem('username');
  const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];
  const user = utilisateurs.find(u => u.nom === username);

  // if (!user || !user.modules.includes(moduleName)) {
  //   alert("Accès non autorisé !");
  //   return <Navigate to="/home" />;
  // }

  return children;
};

export default PrivateRoute;
