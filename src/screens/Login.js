import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>
      <Text onPress={() => navigation.navigate('RegisterUser')} style={styles.link}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#FFE5B4' 
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
      color: '#8B4513' 
    },
    input: {
      marginBottom: 10,
      backgroundColor: '#FFF1D6' 
    },
    button: {
      marginTop: 10,
      backgroundColor: '#FFB347' 
    },
    link: {
      marginTop: 20,
      textAlign: 'center',
      color: '#0094FF' 
    }
  });
  
export default Login;
