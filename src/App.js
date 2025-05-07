
import './App.css';
import React from 'react';
import LoginPage from './connexion/LoginPage';  
import HomePage from './accueil/HomePage'; 
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
