import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import{LONGLIST} from '../Data/const'; 

// FlatListScreen-komponenten viser en liste af opgaver ved hjælp af FlatList
export default function FlatListScreen() {
    // Mapper LONGLIST til et format, der kan bruges af FlatList
    const data = LONGLIST.map((LONGLIST, index) => ({
      id: String(index + 1),  
      title: LONGLIST,            
    }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Her vises en liste over alle opgaver:</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.listItem}>{item.title}</Text>}
      />
    </View>
  );
}

// Definerer stilarter for layoutet i FlatListScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f0f0f0',  
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: 'black', 
    },
    listItem: {
      backgroundColor: '#ffffff',  
      padding: 15,
      marginVertical: 5,
      borderRadius: 10, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,  
    },
    listText: {
      fontSize: 18,
    },
  });