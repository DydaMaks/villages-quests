import { QuestFilters, OrderFilters, ReviewFilters } from '../types';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
  },
  
  // Quests
  QUESTS: {
    BASE: '/quests',
    BY_ID: (id: string) => `/quests/${id}`,
    SEARCH: (filters: QuestFilters) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      return `/quests?${params.toString()}`;
    },
  },
  
  // Orders
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id: string) => `/orders/${id}`,
    MY_ORDERS: (filters?: OrderFilters) => {
      if (!filters) return '/orders/my-orders';
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      return `/orders/my-orders?${params.toString()}`;
    },
    ORGANIZER_ORDERS: (filters?: OrderFilters) => {
      if (!filters) return '/orders/organizer-orders';
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      return `/orders/organizer-orders?${params.toString()}`;
    },
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },
  
  // Reviews
  REVIEWS: {
    BASE: '/reviews',
    BY_ID: (id: string) => `/reviews/${id}`,
    QUEST_REVIEWS: (questId: string, filters?: ReviewFilters) => {
      if (!filters) return `/reviews/quest/${questId}`;
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      return `/reviews/quest/${questId}?${params.toString()}`;
    },
    MY_REVIEWS: (filters?: ReviewFilters) => {
      if (!filters) return '/reviews/my-reviews';
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      return `/reviews/my-reviews?${params.toString()}`;
    },
  },
  
  // Users
  USERS: {
    PROFILE: '/users/profile',
    STATS: '/users/stats',
  },
  
  // System
  SYSTEM: {
    HEALTH: '/health',
    SEED: '/seed',
  },
} as const;