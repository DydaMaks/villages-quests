import axios from 'axios';
import { AuthResponse, QuestsResponse, ApiResponse, Quest, User, QuestFilters } from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userData');
      localStorage.removeItem('userToken');
      window.location.href = '/login';
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
  
  getProfile: () => api.get<ApiResponse<User>>('/auth/me'),
};

// Quests API
export const questsAPI = {
  getAll: (params?: QuestFilters) => api.get<QuestsResponse>('/quests', { params }),
  getById: (id: string) => api.get<ApiResponse<Quest>>(`/quests/${id}`),
  create: (questData: any) => api.post<ApiResponse<Quest>>('/quests', questData),
};

// Orders API
export const ordersAPI = {
  create: (orderData: any) => api.post<ApiResponse>('/orders', orderData),
  getMyOrders: () => api.get<ApiResponse>('/orders/my-orders'),
};

// Reviews API
export const reviewsAPI = {
  create: (reviewData: any) => api.post<ApiResponse>('/reviews', reviewData),
};

// Seed API
export const seedAPI = {
  createTestData: () => api.post<ApiResponse>('/seed')
};

export default api;