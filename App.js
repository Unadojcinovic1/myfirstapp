import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { StyleSheet, View, Text, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importerer skærmkomponenter og formularer til brug i navigationen
import SignUpForm from './Components/SignUpComponent';
import LogInForm from './Components/LoginComponent';
import MainScreen from './Screens/MainScreen';
import {DetailScreen} from './Screens/Details/DetailScreen';
import {HomeScreen} from './Screens/HomeScreen';
import {SettingsScreen} from './Screens/SettingsScreen';
import ArrayListScreen from './Screens/ArrayListScreen';
import FetchListScreen from './Screens/FetchListScreen';
import FlatListScreen from './Screens/FlatListScreen';

// Firebase-konfiguration med oplysninger
const firebaseConfig = {
  apiKey: "AIzaSyCQT_g8vsJbeb0zMv3uYZuahtX_x7rreQQ",
  authDomain: "godkendelsesopgave2024-8572c.firebaseapp.com",
  projectId: "godkendelsesopgave2024-8572c",
  storageBucket: "godkendelsesopgave2024-8572c.appspot.com",
  messagingSenderId: "799223231023",
  appId: "1:799223231023:web:6910ca9a2aa757f604ccda"
};

// Initialiserer bottom tab-navigatoren til at håndtere bundnavigation i appen
const Tab = createBottomTabNavigator();

// Hovedkomponent App, der initialiserer Firebase, overvåger login-status og skaber appens navigation
// State bruges til at gemme brugerens login-status og oplysninger
export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  // Initialiserer Firebase, hvis der ikke allerede findes en Firebase-app
  useEffect(() => {
    try {
      if (getApps().length < 1) {
        const app = initializeApp(firebaseConfig);
        // Initialiser autentificering
        const auth = getAuth(app); 
        console.log("Firebase initialized");
      } else {
        console.log("Firebase already initialized");
      }
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  }, []);

  // Overvåger ændringer i brugerens login-status
  // Sætter brugerstatus til logget ind og opdaterer email-oplysninger
  // Opdaterer brugerstatus til logget ud
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

  // Debugging: Logger ændringer i user-state til konsollen
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  // Returnerer tab-navigator med forskellige skærme for ikke-loggede brugere
  return (
    <Tab.Navigator>
     {/* 

     //Disse vises ikke so <tab> i bunden af appen pga. mangel på plads (max. 5 tabs i alt)
      <Tab.Screen name="Log ind" component={LogInForm} />
      <Tab.Screen name="Sign Up" component={SignUpForm} />
      <Tab.Screen name='Home' component={HomeScreen} />
    */}
      <Tab.Screen name="Details" component={DetailScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
      <Tab.Screen name='Array List' component={ArrayListScreen} />
      <Tab.Screen name='Fetch List' component={FetchListScreen} />
      <Tab.Screen name='Flat List' component={FlatListScreen} />
    </Tab.Navigator>
  )

  // Kontrollerer brugerens login-status og viser relevant skærm
  // Viser hovedskærmen, hvis brugeren er logget ind
  if (user.loggedIn) {
    return (
      <View style={styles.container}>
        <MainScreen />
        <StatusBar style="auto" />
      </View>
    );
  } else {

    // Viser login- og tilmeldingsformularer, hvis brugeren ikke er logget ind
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

// StyleSheet til at definere stilarter for layout og tekst
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
