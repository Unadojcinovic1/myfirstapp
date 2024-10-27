import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

// API URL til at hente brugerdata
const GET_USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// FetchListScreen-komponenten henter og viser en liste over brugere
// State bruges til at gemme den hentede brugerdata
export default function FetchListScreen() {
  const [users, setUsers] = useState([]);

    // Funktion til at hente brugerdata fra GET_USERS_URL
  const fetchUsers = async () => { //spørg get_user_url om data (12)
    try {
      const response = await fetch(GET_USERS_URL);
      const data = await response.json();
      setUsers(data); //Ryger op i linje 8 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

    // useEffect kalder fetchUsers, når komponenten først skabes
    //In-line funktion - defineres med det samme, smart når man kun skal bruge funktionen ét sted
  useEffect(() => { 
    fetchUsers();
  }, []); 

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Her er en liste over alle brugere:</Text>
      <StatusBar style="auto" />
      <ScrollView>
        {users.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <Image
              style={styles.userImage}
              // Midlertidig brugeravatar - spørger serverens id eller e-mail
              source={{ uri: `https://robohash.org/${user.id}?set=set5` }} 
            />
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// StyleSheet til at definere stilarter for FetchListScreen-komponentens layout
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    userCard: {
      backgroundColor: '#ffffff',
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    userImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    title: {
        fontSize: 24,               
        fontWeight: 'bold',         
        color: '#333',              
        textAlign: 'center',        
        marginVertical: 20,         
        paddingHorizontal: 10,      
        backgroundColor: '#f0f0f0', 
        borderRadius: 10,          
      },
  });