import { Stack } from "expo-router";
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen after the resources are loaded
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens/LoginScreen"
        options={{
          headerShown: false,
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="screens/WelcomeScreen"
        options={{
          headerShown: false,
          title: 'Welcome',
        }}
      />
      <Stack.Screen
        name="screens/QRScannerScreen"
        options={{
          title: 'Scan QR Code',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="screens/ConfirmationScreen"
        options={{
          title: 'Confirm Check-in',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
