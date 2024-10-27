import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Definerer og eksporterer UserProfileScreen-komponenten
// Denne komponent viser en simpel profilskærm med en titel og statuslinje
export default function UserProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>User Profile Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// StyleSheet til at definere stilarter for UserProfileScreen-komponentens layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: 'green',
  },
});
