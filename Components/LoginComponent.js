import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Ændret til signInWithEmailAndPassword
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';

// Firebase-konfiguration med API-oplysninger
const firebaseConfig = {
    apiKey: "AIzaSyCQT_g8vsJbeb0zMv3uYZuahtX_x7rreQQ",
    authDomain: "godkendelsesopgave2024-8572c.firebaseapp.com",
    projectId: "godkendelsesopgave2024-8572c",
    storageBucket: "godkendelsesopgave2024-8572c.appspot.com",
    messagingSenderId: "799223231023",
    appId: "1:799223231023:web:6910ca9a2aa757f604ccda"
  };

// Initialiser Firebase, hvis det ikke allerede er gjort
let app;
let auth;

// Tjekker, om der allerede findes en Firebase-app-initialisering
// Initialiserer Firebase-appen med konfigurationen, hvis ingen instanser findes
// Initialiserer Firebase Authentication med persistence, så brugerens login-status gemmes lokalt
// Henter eksisterende Firebase-authentication-instans, hvis appen allerede er initialiseret
if (!getApps().length) {
  app = initializeApp(firebaseConfig); 
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = getAuth();
}

// Ændret navn til LogInForm
// Definerer state-variabler til email, adgangskode, login-status og fejlmeddelelser
export default function LogInForm() { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCompleted, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // LogIn metode til Firebase
  // Metode til at håndtere login ved at bruge Firebase Authentication
  // Brug signInWithEmailAndPassword i stedet
  // Sæt login-processen som fuldført
  // Sæt fejlbeskeden hvis der opstår en fejl
  const handleSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); 
      const user = userCredential.user;
      setCompleted(true);  
      Alert.alert('Succes', `Du er logget ind som: ${user.email}`);
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);  
    }
  };

  // Funktion til at skabe knappen for login med titlen "Log ind"
  const renderButton = () => {
    return <Button onPress={handleSubmit} title="Log ind" />;
  };

  return (
    // Yderste container for loginskærmen, som anvender stilarterne defineret i styles.container længere nede 
    <View style={styles.container}>
      <Text style={styles.header}>Log ind:</Text> 

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        // Dynamisk opdatering af email
        onChangeText={setEmail}  
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Adgangskode"
        value={password}
        // Dynamisk opdatering af password
        onChangeText={setPassword}  
        secureTextEntry
      />

      {errorMessage ? (
        <Text style={styles.error}>Error: {errorMessage}</Text>
      ) : null}

      {renderButton()}

      {isCompleted ? (
        <Text style={styles.success}>Du er logget ind!</Text>
      ) : null}
    </View>
  );
}

// Definerer stilarter til forskellige komponenter i LogInForm
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },

  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
});