import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// AppDetailsScreen-komponent viser detaljer om appen
export default function AppDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>App Details Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// StyleSheet til at definere stilarter for AppDetailsScreen-komponentens layout
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
