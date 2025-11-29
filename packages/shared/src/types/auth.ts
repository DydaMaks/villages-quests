import { ApiResponse } from './common';

export interface User {
  id: string;
  _id?: string;
  username: string;
  email: string;
  role: 'user' | 'organizer';
  avatar?: string;
  bio?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse extends ApiResponse {
  token?: string;
  user?: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: 'user' | 'organizer';
}

export interface UpdateProfileData {
  username?: string;
  bio?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: UpdateProfileData) => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

export interface UserStats {
  totalOrders?: number;
  totalReviews?: number;
  totalSpent?: number;
  totalQuests?: number;
  activeQuests?: number;
  averageRating?: number;
  ordersByStatus?: Array<{
    _id: string;
    count: number;
    totalRevenue?: number;
  }>;
}