import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../components/LoadingSpinner';

const SplashScreen = () => {
  const router = useRouter();
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');

  useEffect(() => {
    checkAuthAndNavigate();
  }, []);

  const checkAuthAndNavigate = async () => {
    try {
      // Show different loading states
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingMessage('Checking authentication...');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (userToken) {
        router.replace('/screens/WelcomeScreen');
      } else {
        router.replace('/screens/LoginScreen');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      router.replace('/screens/LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/react-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.companyName}>SCAN APP</Text>
        <Text style={styles.title}>Welcome to Your Digital Check-in</Text>
      </View>
      <View style={styles.spinnerContainer}>
        <LoadingSpinner message={loadingMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5', // Light purple background
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100, // Add some top padding
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  companyName: {
    fontSize: 36,
    fontWeight: '900', // Extra bold
    color: '#000000', // Black for maximum visibility
    marginBottom: 15,
    letterSpacing: 1, // Add letter spacing
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: '#000000', // Black for maximum visibility
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600', // Semi-bold
  },
  spinnerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
  },
});

export default SplashScreen;
