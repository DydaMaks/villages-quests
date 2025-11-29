import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'organizer';
  avatar: string;
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
      if (userData) {
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
      // Тимчасово для тесту
      const testUser: User = {
        id: '1',
        username: 'testuser',
        email: email,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
      };
      
      await AsyncStorage.setItem('userData', JSON.stringify(testUser));
      setUser(testUser);
      return true;
    } catch (error: any) {
      console.error('Помилка входу:', error.message);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        role: userData.role || 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
      };
      
      await AsyncStorage.setItem('userData', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error: any) {
      console.error('Помилка реєстрації:', error.message);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      console.error('Помилка виходу:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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