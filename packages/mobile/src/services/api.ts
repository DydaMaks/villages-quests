import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { 
  ApiResponse, 
  User, 
  Quest, 
  AuthResponse, 
  QuestsResponse,
  QuestFilters,
  Order,
  Review 
} from '../types';

// Правильні URL для різних середовищ
const getApiBaseUrl = () => {
  if (__DEV__) {
    return Platform.select({
      android: 'http://10.0.2.2:5000/api',
      ios: 'http://localhost:5000/api',
      default: 'http://localhost:5000/api'
    });
  } else {
    return 'https://your-production-api.com/api';
  }
};

const API_BASE_URL = getApiBaseUrl();

console.log('🔗 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
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
  (error) => {
    console.error('Помилка запиту:', error);
    return Promise.reject(error);
  }
);

// Інтерцептор для обробки помилок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Помилка:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });

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

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post<AuthResponse>('/auth/login', { email, password }),
  
  register: (userData: any) => 
    api.post<AuthResponse>('/auth/register', userData),
  
  getProfile: () => 
    api.get<ApiResponse<User>>('/auth/me'),
  
  updateProfile: (userData: Partial<User>) => 
    api.put<ApiResponse<User>>('/auth/profile', userData),
};

// Quests API
export const questsAPI = {
  getAll: (params?: QuestFilters) => 
    api.get<QuestsResponse>('/quests', { params }),
  
  getById: (id: string) => 
    api.get<ApiResponse<Quest>>(`/quests/${id}`),
  
  create: (questData: any) => 
    api.post<ApiResponse<Quest>>('/quests', questData),
  
  update: (id: string, questData: any) => 
    api.put<ApiResponse<Quest>>(`/quests/${id}`, questData),
  
  delete: (id: string) => 
    api.delete<ApiResponse>(`/quests/${id}`),
};

// Orders API
export const ordersAPI = {
  create: (orderData: any) => 
    api.post<ApiResponse<Order>>('/orders', orderData),
  
  getMyOrders: (params?: any) => 
    api.get<ApiResponse<Order[]>>('/orders/my-orders', { params }),
  
  getById: (id: string) => 
    api.get<ApiResponse<Order>>(`/orders/${id}`),
  
  updateStatus: (id: string, status: string) => 
    api.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status }),
};

// Reviews API
export const reviewsAPI = {
  create: (reviewData: any) => 
    api.post<ApiResponse<Review>>('/reviews', reviewData),
  
  getMyReviews: (params?: any) => 
    api.get<ApiResponse<Review[]>>('/reviews/my-reviews', { params }),
  
  getQuestReviews: (questId: string, params?: any) => 
    api.get<ApiResponse<Review[]>>(`/reviews/quest/${questId}`, { params }),
};

// System API
export const systemAPI = {
  health: () => 
    api.get<ApiResponse>('/health'),
  
  seed: () => 
    api.post<ApiResponse>('/seed'),
};

export default api;