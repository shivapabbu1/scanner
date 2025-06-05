import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../components/LoadingSpinner';

interface CenterInfo {
  name: string;
  address: string;
  operatingHours: string;
}

const WelcomeScreen = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [centerInfo, setCenterInfo] = useState<CenterInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading user data...');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoadingMessage('Setting up your workspace...');
      const name = await AsyncStorage.getItem('userName');
      if (name) setUserName(name);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingMessage('Fetching center information...');
      await fetchCenterInfo();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoadingMessage('Preparing your dashboard...');
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCenterInfo = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulated API call to fetch center info
    const dummyCenter = {
      name: 'Main Center',
      address: '123 Business Street',
      operatingHours: '9:00 AM - 6:00 PM',
    };
    setCenterInfo(dummyCenter);
  };

  const handleScanQR = () => {
    router.push('/screens/QRScannerScreen');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
      router.replace('/screens/LoginScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/react-logo.png')}
              style={styles.loadingLogo}
              resizeMode="contain"
            />
            <Text style={styles.companyName}>SCAN APP</Text>
            <Text style={styles.title}>Welcome to Your Digital Check-in</Text>
          </View>
          <LoadingSpinner message={loadingMessage} />
        </View>
      ) : (
        <>
          <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
          
          {centerInfo && (
            <View style={styles.centerInfo}>
              <Text style={styles.centerTitle}>Center Information</Text>
              <Text style={styles.centerText}>Name: {centerInfo.name}</Text>
              <Text style={styles.centerText}>Address: {centerInfo.address}</Text>
              <Text style={styles.centerText}>Hours: {centerInfo.operatingHours}</Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.scanButton} 
            onPress={handleScanQR}
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3E5F5', // Light purple background to match splash screen
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingLogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  companyName: {
    fontSize: 36,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 15,
    letterSpacing: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  centerInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#673AB7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },
  centerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centerText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },
  scanButton: {
    backgroundColor: '#673AB7',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#673AB7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButton: {
    backgroundColor: '#9575CD',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#9575CD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
