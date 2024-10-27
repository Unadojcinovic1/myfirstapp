import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ASSIGNMENTS } from '../Data/const';

// ArrayListScreen-komponent viser en liste over nuværende opgaver i en rulleliste
export default function ArrayListScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Her vises de nuværende opgaver:</Text>
        <ScrollView>
          {ASSIGNMENTS.map((country, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listText}>{index + 1}. {country}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Definerer stilarter til ArrayListScreen-komponentens layout
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',  // Baggrundsfarve for skærmen
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    listItem: {
      backgroundColor: '#ffffff',  // Baggrundsfarve for hvert element
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,  // Afrundede kanter
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    listText: {
      fontSize: 18,
    },
  });