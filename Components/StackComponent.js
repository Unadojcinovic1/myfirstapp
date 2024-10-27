import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AppDetailsScreen from '../Screens/Details/AppDetailsScreen';
import UserProfileScreen from '../Screens/Details/UserProfileScreen';
import DetailScreen from '../Screens/Details/DetailScreen';
import React from 'react';

// Opretter en stack-navigator til navigation mellem skærmene
const Stack = createStackNavigator();

// StackComponent-komponent, som håndterer navigationen mellem appens skærme 
export default function StackComponent() {
  return (
    <Stack.Navigator initialRouteName="Details Screen">
    <Stack.Screen name="Details Screen" component={DetailScreen} />
    <Stack.Screen name="User Profile" component={UserProfileScreen} />
    <Stack.Screen name="App Details" component={AppDetailsScreen} />
</Stack.Navigator>
  );
}
