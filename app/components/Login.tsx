import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSpinner } from '../context/SpinnerContext';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { hideSpinner, spinnerVisible } = useSpinner();
  const handleLogin = () => {
    // Demo credentials
    const demoUser = 'admin';
    const demoPass = '123456';

    if (username === demoUser && password === demoPass) {
      setError('');
      router.push('/components/Welcome'); // Navigate to the welcome screen
    } else if (!username || !password) {
      setError('Please enter both username and password');
    } else {
      setError('Invalid credentials. Try admin/123456');
    }
  };

    useEffect(() => {
    if (spinnerVisible) {
      hideSpinner();
    }
  }, [hideSpinner, spinnerVisible]);

  return (
    <ImageBackground
      source={require('../../assets/images/devhausECELoginBackgroundScreen.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.rays} />
        
        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter username"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="rgba(255, 255, 255, 0.5)"
                />
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomView}>
            <Image
              source={require('../../assets/images/iBlumLogo.svg')}
              style={{ width: 120, height: 40 }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(45, 0, 71, 0.75)',
  },
  rays: {
    position: 'absolute',
    width: width * 2,
    height: height * 2,
    top: -height * 0.5,
    left: -width * 0.5,
    backgroundColor: 'transparent',
    borderRadius: width,
    transform: [{ scale: 1.5 }],

  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  butterfly: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  form: {
    width: '85%',
    maxWidth: 400,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 15,
  },
  eyeIcon: {
    padding: 15,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#FF9F00',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 120,
    height: 40,
    marginTop: 40,
  },
  bottomView: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 50,
  },
});
