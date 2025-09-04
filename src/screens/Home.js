import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { auth, database } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    try {
      const docRef = doc(database, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    } catch (error) {
      console.log('Error al obtener datos del usuario:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        ¡Welcome, {userData?.name}!
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>University Title:</Text>
          <Text style={styles.value}>{userData?.title}</Text>

          <Text style={styles.label}>Year of graduation:</Text>
          <Text style={styles.value}>{userData?.graduationYear}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('UserAccount')}
        style={styles.button}
      >
        Update information
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5B4',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#8B4513',
    fontWeight: 'bold',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#FFF1D6',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#8B4513',
  },
  value: {
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FFB347',
  },
});

export default Home;
