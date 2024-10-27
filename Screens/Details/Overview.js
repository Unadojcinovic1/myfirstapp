import { View, Text } from 'react-native';
import ButtonComponent from '../../Components/ButtonComponents';

// Funktion, der styrer navigationen til en bestemt skærm
// navigation: Navigation-objekt, der bruges til at håndtere navigationen
// route: Navnet på den skærm, som der navigeres til
const navController = (navigation, route) => {
    navigation.navigate(route)
}

// Overview-komponenten viser to knapper, som navigerer brugeren til andre skærme
// navigation: Navigation-objektet, der gives som prop til at styre navigationen
export function Overview({navigation}) {
    return (
        <View>
            <ButtonComponent onPress={() => navController(navigation, 'User Profile')} title="User Profile" />
            <ButtonComponent onPress={() => navController(navigation, 'App Details')} title="App Details" />
        </View>
    )
}