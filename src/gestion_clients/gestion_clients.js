import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import styles from './gestion_clients_style';

const GestionDesClients = () => {
  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ nom: '', prenom: '', telephone: '', habitation: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddClient = () => {
    if (formData.nom && formData.prenom && formData.telephone && formData.habitation) {
      if (editingIndex !== null) {
        const updatedClients = [...clients];
        updatedClients[editingIndex] = formData;
        setClients(updatedClients);
        setEditingIndex(null);
      } else {
        setClients([...clients, formData]);
      }
      setFormData({ nom: '', prenom: '', telephone: '', habitation: '' });
      setShowForm(false);
    }
  };

  const handleEditClient = (index) => {
    setFormData(clients[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteClient = (index) => {
    const updatedClients = clients.filter((_, i) => i !== index);
    setClients(updatedClients);
  };

  const handleDetails = (client) => {
    alert(`Détails:\nNom: ${client.nom}\nPrénom: ${client.prenom}\nTéléphone: ${client.telephone}\nHabitation: ${client.habitation}\nCaissière: Caissière Ex.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.profileSection}>
          <Image source={require('./logo.png')} style={styles.profileIcon} />
          <Text style={styles.username}>Nom d’utilisateur</Text>
          <View style={styles.statusDot} />
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>Accueil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>GESTION CLIENT</Text>
          </View>
          <Text style={styles.companyName}>GES</Text>
        </View>

        <Text style={styles.moduleText}>Choisissez votre module</Text>

        <View style={styles.clientBox}>
          <Text style={styles.boxLogo}>LOGO DE GESTION</Text>
          <Text style={styles.clientTitle}>Gestion client</Text>
          <Text style={styles.clientDesc}>La gestion des clients</Text>
        </View>

        <TouchableOpacity style={styles.menuButton} onPress={() => setShowForm(!showForm)}>
          <Text style={styles.menuText}>Ajouter un client</Text>
        </TouchableOpacity>

        {showForm && (
          <View style={{ marginTop: 20 }}>
            <TextInput placeholder="Nom" value={formData.nom} onChangeText={(text) => setFormData({ ...formData, nom: text })} style={{ borderWidth: 1, marginBottom: 5, padding: 8 }} />
            <TextInput placeholder="Prénom" value={formData.prenom} onChangeText={(text) => setFormData({ ...formData, prenom: text })} style={{ borderWidth: 1, marginBottom: 5, padding: 8 }} />
            <TextInput placeholder="Téléphone" value={formData.telephone} onChangeText={(text) => setFormData({ ...formData, telephone: text })} style={{ borderWidth: 1, marginBottom: 5, padding: 8 }} />
            <TextInput placeholder="Lieu d'habitation" value={formData.habitation} onChangeText={(text) => setFormData({ ...formData, habitation: text })} style={{ borderWidth: 1, marginBottom: 5, padding: 8 }} />
            <TouchableOpacity style={styles.menuButton} onPress={handleAddClient}>
              <Text style={styles.menuText}>Valider</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView style={{ width: '100%', marginTop: 20 }}>
          {clients.map((client, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1 }}>
              <Text>{client.nom} {client.prenom}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => handleEditClient(index)} style={{ marginRight: 5 }}>
                  <Text style={{ color: 'blue' }}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteClient(index)} style={{ marginRight: 5 }}>
                  <Text style={{ color: 'red' }}>Supprimer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDetails(client)}>
                  <Text style={{ color: 'green' }}>Détails</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default GestionDesClients;
