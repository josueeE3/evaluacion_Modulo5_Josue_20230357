import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';
import { auth, database } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UserAccount = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    graduationYear: ''
  });

  useEffect(() => {
    const loadUser = async () => {
      const docRef = doc(database, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({
          name: data.name,
          title: data.title,
          graduationYear: data.graduationYear
        });
      }
    };
    loadUser();
  }, []);

  const handleUpdate = async () => {
    const docRef = doc(database, 'users', auth.currentUser.uid);
    await updateDoc(docRef, form);
    navigation.goBack(); // o navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon="close"
        size={24}
        onPress={() => navigation.navigate('Home')}
        style={styles.closeButton}
      />

      <Text variant="headlineMedium" style={styles.title}>Editar Cuenta</Text>

      <TextInput
        label="Nombre"
        value={form.name}
        onChangeText={text => setForm({ ...form, name: text })}
        style={styles.input}
      />
      <TextInput
        label="Título universitario"
        value={form.title}
        onChangeText={text => setForm({ ...form, title: text })}
        style={styles.input}
      />
      <TextInput
        label="Año de graduación"
        value={form.graduationYear}
        onChangeText={text => setForm({ ...form, graduationYear: text })}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Guardar cambios
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#FFE5B4' },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
    backgroundColor: '#FFB347'
  },
  title: { textAlign: 'center', marginBottom: 20, color: '#8B4513' },
  input: { marginBottom: 10, backgroundColor: '#FFF1D6' },
  button: { marginTop: 10, backgroundColor: '#FFB347' }
});

export default UserAccount;
