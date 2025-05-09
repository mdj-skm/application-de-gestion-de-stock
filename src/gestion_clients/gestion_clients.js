import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const GestionDesClients = () => {
  return (
    <View style={styles.container}>
      {/* Barre latérale */}
      <View style={styles.sidebar}>
        <View style={styles.profileSection}>
          <Image source={require('./user_icon.png')} style={styles.profileIcon} />
          <Text style={styles.username}>Nom d’utilisateur</Text>
          <View style={styles.statusDot} />
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>Accueil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>se deconnecter</Text>
        </TouchableOpacity>
      </View>

      {/* Zone principale */}
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <Text style={styles.companyName}>GES</Text>
        </View>

        <Text style={styles.moduleTitle}>Choisissez votre module</Text>

        <TouchableOpacity style={styles.clientBox}>
          <Text style={styles.boxLogo}>LOGO DE GESTION</Text>
          <Text style={styles.clientTitle}>Gestion client</Text>
          <Text style={styles.clientDesc}>La gestion des clients</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GestionDesClients;
