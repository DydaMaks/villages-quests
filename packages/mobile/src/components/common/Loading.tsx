import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingProps {
  size?: 'small' | 'large';
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'large', 
  text = 'Завантаження...' 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#22c55e" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
});