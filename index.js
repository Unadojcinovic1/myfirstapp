import { registerRootComponent } from 'expo';

import App from './App';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

function AppWrapper() {
  return (
    <NavigationContainer><App /></NavigationContainer>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppWrapper);
