import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const client = () => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
      </View>

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <Text style={styles.companyName}>GES</Text>
        </View>

        <View style={styles.topBar}>
          <Text style={styles.sectionTitle}>GESTION CLIENTS</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <Text>Rafraîchir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filters}>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
            <Text>Date début</Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartPicker(false);
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}

          <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
            <Text>Date fin</Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndPicker(false);
                if (selectedDate) setEndDate(selectedDate);
              }}
            />
          )}

          <TouchableOpacity style={styles.searchButton}>
            <Text>Recherche</Text>
          </TouchableOpacity>
        </View>

        {/* Résultats ici plus tard */}
        <View style={styles.results}>
          {/* Placeholder pour la liste ou graphique */}
        </View>
      </View>
    </View>
  );
};

export default client;
