import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Ændret til signInWithEmailAndPassword
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQT_g8vsJbeb0zMv3uYZuahtX_x7rreQQ",
    authDomain: "godkendelsesopgave2024-8572c.firebaseapp.com",
    projectId: "godkendelsesopgave2024-8572c",
    storageBucket: "godkendelsesopgave2024-8572c.appspot.com",
    messagingSenderId: "799223231023",
    appId: "1:799223231023:web:6910ca9a2aa757f604ccda"
  };

// Initialiser Firebase, hvis der ikke allerede er en app initialiseret
let app;
let auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = getAuth();
}

export default function LogInForm() { // Ændret navn til LogInForm
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCompleted, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // LogIn metode til Firebase
  const handleSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Brug signInWithEmailAndPassword i stedet
      const user = userCredential.user;
      setCompleted(true);  // Sæt login-processen som fuldført
      Alert.alert('Succes', `Du er logget ind som: ${user.email}`);
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);  // Sæt fejlbeskeden hvis der opstår en fejl
    }
  };

  // Funktion til at render knappen
  const renderButton = () => {
    return <Button onPress={handleSubmit} title="Login" />; // Ændret til Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log ind</Text> 

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}  // Dynamisk opdatering af email
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}  // Dynamisk opdatering af password
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
  },
});