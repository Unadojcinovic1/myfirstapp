import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';

// Firebase-konfiguration med API-nøgler og oplysninger
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

if (!getApps().length) {
    // Initialiserer en ny Firebase-app
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = getAuth();
}

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCompleted, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Logind værdier for at tjekke om de er korrekte
  ("Email: ", email);
  ("Password: ", password);
  ("ErrorMessage: ", errorMessage);
  ("IsCompleted: ", isCompleted);

  // Funktion til at håndtere brugeroprettelse via Firebase Authentication (godkendelse)
  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Sæt oprettelsen som fuldført
      setCompleted(true);  
      Alert.alert('Succes', `Bruger oprettet: ${user.email}`);
    } catch (error) {
      const errorMessage = error.message;
      // Sæt fejlbeskeden hvis der opstår en fejl
      setErrorMessage(errorMessage);  
    }
  };

  // Funktion til at skabe oprettelsesknappen
  const renderButton = () => {
    return <Button onPress={handleSubmit} title="Opret bruger" />;
  };

  return (
    // Yderste container for ssignupkærmen, som anvender stilarterne defineret i styles.container
    <View style={styles.container}>
      <Text style={styles.header}>Opret bruger her:</Text>

      {console.log("Rendering TextInput for email and password")}

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
        <Text style={styles.success}>Bruger oprettet succesfuldt!</Text>
      ) : null}
    </View>
  );
}

// Definerer stilarter til komponenter i SignUpForm
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