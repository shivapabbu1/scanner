import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Welcome({ name }: { name: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D0047',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
