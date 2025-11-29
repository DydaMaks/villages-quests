import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Правильні URL для мобільного додатку
const API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:5000/api', // Android емулятор
  ios: 'http://localhost:5000/api',     // iOS емулятор
  default: 'http://localhost:5000/api'  // Фізичний пристрій
});

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Інтерцептор для додавання токена
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Помилка отримання токена:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Інтерцептор для обробки помилок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.multiRemove(['userData', 'userToken']);
      } catch (storageError) {
        console.error('Помилка очищення storage:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) => 
    api.post('/auth/register', userData),
};

export const questsAPI = {
  getAll: (params?: any) => api.get('/quests', { params }),
};

export default api;