import { Text, View } from "react-native";

// HomeScreen-komponent, der fungerer som appens startside og viser en velkomstmeddelelse
// navigation: Et objekt der håndterer navigationen mellem skærme (ikke brugt her men kan udnyttes senere)
export function HomeScreen({navigation}) {
    return(
        // Yderste container for komponentens layout
        <View>
            <Text>Velkommen til din hjemmeskærm!</Text>
        </View>
    )
}