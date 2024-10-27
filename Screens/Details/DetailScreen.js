import { View, Text } from 'react-native';
import ButtonComponent from '../../Components/ButtonComponents';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Overview } from './Overview';
import UserProfileScreen from './UserProfileScreen';
import AppDetailsScreen from './AppDetailsScreen';

// Opretter en ny stack-navigator, der bruges til at navigere mellem forskellige skærme
const Stack = createNativeStackNavigator();

// Funktion, der styrer navigationen til en specificeret skærm
// navigation: Navigation-objekt, som bruges til at navigere
// route: Navnet på skærmen, som der navigeres til
const navController = (navigation, route) => {
    navigation.navigate(route)
}

// DetailScreen-komponent, der definerer navigationsstakken og de skærme, der kan tilgås i den
export function DetailScreen({navigation}) {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="User Profile" component={UserProfileScreen} />
        <Stack.Screen name="App Details" component={AppDetailsScreen} />
      </Stack.Navigator>
    )
}