import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { authAPI } from '../services/api';

interface User {
  id: string;
  _id?: string;
  username: string;
  email: string;
  role: 'user' | 'organizer';
  avatar: string;
  bio?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const token = await AsyncStorage.getItem('userToken');
      
      if (userData && token) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Помилка перевірки авторизації:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login(email, password);
      const data = response.data;
      
      if (data.success && data.token && data.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        await AsyncStorage.setItem('userToken', data.token);
        setUser(data.user);
        return true;
      } else {
        Alert.alert('Помилка', data.message || 'Невірний email або пароль');
        return false;
      }
    } catch (error: any) {
      console.error('Помилка входу:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Помилка сервера';
      Alert.alert('Помилка входу', errorMessage);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const response = await authAPI.register(userData);
      const data = response.data;
      
      if (data.success && data.token && data.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        await AsyncStorage.setItem('userToken', data.token);
        setUser(data.user);
        return true;
      } else {
        Alert.alert('Помилка', data.message || 'Помилка реєстрації');
        return false;
      }
    } catch (error: any) {
      console.error('Помилка реєстрації:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Помилка сервера';
      Alert.alert('Помилка реєстрації', errorMessage);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(['userData', 'userToken']);
      setUser(null);
    } catch (error) {
      console.error('Помилка виходу:', error);
      Alert.alert('Помилка', 'Не вдалося вийти з акаунту');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};