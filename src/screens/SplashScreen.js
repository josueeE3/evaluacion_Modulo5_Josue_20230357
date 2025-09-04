import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { auth } from '../config/firebase';

const SplashScreen = ({ navigation }) => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    // Animación de entrada
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

    // Espera 3 segundos y navega
    const timer = setTimeout(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.replace('Home');
        } else {
          navigation.replace('RegisterUser');
        }
      });
      return unsubscribe;
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>¡Bienvenido a la App!</Text>
      <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5B4', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#8B4513',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFB347',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  loadingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SplashScreen;
