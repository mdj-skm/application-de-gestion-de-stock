import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './rapport_style';

const RapportInterface = () => {
  const [showSubReports, setShowSubReports] = useState(false);

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
          <Text style={styles.companyName}>GES</Text>
        </View>

        <Text style={styles.moduleText}>Choisissez votre module</Text>

        <TouchableOpacity
          style={styles.moduleBox}
          onPress={() => setShowSubReports(!showSubReports)}
        >
          <Text style={styles.boxLogo}>LOGO DE RAPPORT</Text>
          <Text style={styles.moduleTitle}>Rapport</Text>
          <Text style={styles.moduleDesc}>Les rapports</Text>
        </TouchableOpacity>

        {showSubReports && (
          <View style={styles.subReportsContainer}>
            <TouchableOpacity style={styles.subReportButton}>
              <Text style={styles.subReportText}>Rapport de gestion des clients</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.subReportButton}>
              <Text style={styles.subReportText}>Rapport de gestion des commandes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.subReportButton}>
              <Text style={styles.subReportText}>Rapport de gestion des fournisseurs</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default RapportInterface;
