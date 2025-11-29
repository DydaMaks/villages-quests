// packages/mobile/src/components/QRGenerator.tsx
import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/styles';

export const QRGenerator: React.FC = () => {
  const openExpoGo = () => {
    Linking.openURL('exp://127.0.0.1:8081');
  };

  const openWebInterface = () => {
    Linking.openURL('http://localhost:8081');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏞️ Villages Quests</Text>
      <Text style={styles.subtitle}>Підключення до додатку</Text>
      
      <Text style={styles.instruction}>
        Для підключення до мобільного додатку:
      </Text>

      <View style={styles.steps}>
        <Text style={styles.step}>1️⃣ Відкрийте Expo Go на телефоні</Text>
        <Text style={styles.step}>2️⃣ Відскануйте QR-код з веб-інтерфейсу</Text>
        <Text style={styles.step}>3️⃣ Або використайте кнопки нижче</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={openExpoGo}>
        <Text style={styles.buttonText}>📱 Відкрити в Expo Go</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={openWebInterface}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>🌐 Відкрити веб-інтерфейс</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Адреси для підключення:{"\n"}
        • exp://127.0.0.1:8081{"\n"}
        • http://localhost:8081
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  steps: {
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  step: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
    minWidth: 250,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
  note: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
  },
});