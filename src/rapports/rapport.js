import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const RapportInterface = () => {
  return (
    <View style={styles.container}>
      {/* Barre latérale */}
      <View style={styles.sidebar}>
        <View style={styles.profileSection}>
          <View style={styles.profileIcon} />
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

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <Text style={styles.companyName}>NOM DE L'ENTREPRISE</Text>
        </View>

        <Text style={styles.moduleText}>Choisissez votre module</Text>

        <View style={styles.moduleBox}>
          <Text style={styles.boxLogo}>LOGO DE RAPPORT</Text>
          <Text style={styles.moduleTitle}>Rapport</Text>
          <Text style={styles.moduleDesc}>Les rapports</Text>
        </View>
      </View>
    </View>
  );
};

export default RapportInterface;
