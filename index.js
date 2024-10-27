import { registerRootComponent } from 'expo';
import App from './App';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// AppWrapper-komponenten omslutter App-komponenten i en NavigationContainer
// Dette sikrer, at navigationen fungerer korrekt i hele appen
function AppWrapper() {
  return (
    <NavigationContainer><App /></NavigationContainer>
  );
}

// registerRootComponent registrerer AppWrapper som rodkomponenten i applikationen
// Dette sikrer, at appens miljø er korrekt konfigureret, uanset om den køres i Expo Go eller som en native build
registerRootComponent(AppWrapper);
