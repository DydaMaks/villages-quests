// packages/mobile/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import QuestsScreen from './src/screens/quests/QuestsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import { Loading } from './src/components/common/Loading';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Quests: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading text="Перевірка авторизації..." />;
  }

  return (
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
        initialRouteName={user ? 'Quests' : 'Login'}
      >
        {user ? (
          // Авторизовані користувачі
          <>
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
          </>
        ) : (
          // Неавторизовані користувачі
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}