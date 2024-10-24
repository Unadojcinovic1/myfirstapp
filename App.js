import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignUpForm from './Components/SignUpComponent';
import LogInForm from './Components/LoginComponent';
import MainScreen from './Screens/MainScreen';
import { DetailScreen } from './Screens/DetailScreen';
import { HomeScreen } from './Screens/HomeScreen';


// Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyCQT_g8vsJbeb0zMv3uYZuahtX_x7rreQQ",
  authDomain: "godkendelsesopgave2024-8572c.firebaseapp.com",
  projectId: "godkendelsesopgave2024-8572c",
  storageBucket: "godkendelsesopgave2024-8572c.appspot.com",
  messagingSenderId: "799223231023",
  appId: "1:799223231023:web:6910ca9a2aa757f604ccda"
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  // Initialiser Firebase, hvis der ikke allerede er en app initialiseret
  useEffect(() => {
    try {
      if (getApps().length < 1) {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app); // Initialiser autentificering
        console.log("Firebase initialized");
      } else {
        console.log("Firebase already initialized");
      }
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  }, []);

  // Overvåg ændringer i brugerens login-status med Firebase's onAuthStateChanged
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ loggedIn: true, email: firebaseUser.email });
        console.log("Logged in:", firebaseUser.email);
      } else {
        setUser({ loggedIn: false });
        console.log("User logged out");
      }
    });
    return () => unsubscribe();
  }, []);

  // Debugging: Overvåg ændringer i user-state for fejlfinding
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name="Log ind" component={LogInForm} />
      <Tab.Screen name="Sign Up" component={SignUpForm} />
      <Tab.Screen name='Details' component={DetailScreen} />
    </Tab.Navigator>
  )

  // Tjek om brugeren er logget ind, og vis den relevante skærm
  if (user.loggedIn) {
    return (
      <View style={styles.container}>
        <MainScreen />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Opret Bruger</Text>
        <SignUpForm />
        <View style={styles.spacer} />
        <Text style={styles.title}>Log Ind</Text>
        <LogInForm />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  spacer: {
    height: 40,
  },
});
