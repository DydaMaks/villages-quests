import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import QuestsScreen from './src/screens/quests/QuestsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Quests: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#22c55e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#f8fafc',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ 
              title: 'Вхід до Villages Quests',
              headerShown: true
            }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ 
              title: 'Реєстрація',
              headerShown: true
            }}
          />
          <Stack.Screen 
            name="Quests" 
            component={QuestsScreen}
            options={{ 
              title: 'Квести',
              headerShown: true
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ 
              title: 'Профіль',
              headerShown: true
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default function App() {
  return <AppNavigator />;
}