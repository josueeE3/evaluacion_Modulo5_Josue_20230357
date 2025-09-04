import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';

const RegisterUser = ({ navigation }) => {
  const { control, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async data => {
    if (!data.name || !data.email || !data.password || !data.title || !data.graduationYear) {
      return alert('Todos los campos son obligatorios');
    }

    if (data.password.length < 6) {
      setError('password', { message: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await setDoc(doc(database, 'users', userCredential.user.uid), {
        name: data.name,
        email: data.email,
        title: data.title,
        graduationYear: data.graduationYear
      });
      navigation.replace('Home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      {['name', 'email', 'password', 'title', 'graduationYear'].map(field => (
        <Controller
          key={field}
          control={control}
          name={field}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={field}
              value={value}
              onChangeText={onChange}
              secureTextEntry={field === 'password'}
              style={styles.input}
              error={!!errors[field]}
            />
          )}
        />
      ))}

      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Registrar
      </Button>

      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        ¿Ya tienes cuenta? Inicia sesión
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
      fontSize: 24,
      fontWeight: 'bold',
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

export default RegisterUser;
