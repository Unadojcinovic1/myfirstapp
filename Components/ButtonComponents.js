import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Pressable } from 'react-native';

// ButtonComponents er en komponent, der skaber en trykbar knap med en tekst
// title er teksten der skal vises på knappen
// onPress er funktion, der kaldes, når knappen trykkes
export default function ButtonComponents({ title, onPress }) {
  return (

    // Pressable er en touch-komponent fra React Native, der reagerer på tryk
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

// StyleSheet definerer stilarterne for knap og tekst i ButtonComponents
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: 'green',
    margin: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
