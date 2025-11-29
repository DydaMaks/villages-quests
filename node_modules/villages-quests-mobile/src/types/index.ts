// Базові типи API
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Типи користувача
export interface User {
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

// Типи квестів
export interface QuestOrganizer {
  _id: string;
  username: string;
  avatar?: string;
  email?: string;
  bio?: string;
}

export interface QuestRating {
  average: number;
  count: number;
}

export interface QuestImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Quest {
  _id: string;
  title: string;
  description: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  price: number;
  duration: number;
  maxParticipants: number;
  organizer: QuestOrganizer;
  images: QuestImage[];
  rating: QuestRating;
  tags?: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Типи для авторизації
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  error?: string;
}

// Типи для відповідей квестів
export interface QuestsResponse {
  success: boolean;
  message: string;
  data?: {
    quests: Quest[];
    totalPages?: number;
    currentPage?: number;
    total?: number;
    isOrganizer?: boolean;
  };
  error?: string;
}

// Типи для фільтрів
export interface QuestFilters {
  difficulty?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  durationMin?: number;
  durationMax?: number;
  search?: string;
  tags?: string[];
  organizer?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Типи для замовлень
export interface Order {
  _id: string;
  user: string | User;
  quest: string | Quest;
  participants: number;
  scheduledDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderWithDetails extends Omit<Order, 'user' | 'quest'> {
  user: User;
  quest: Quest;
}

// Типи для відгуків
export interface Review {
  _id: string;
  user: string | User;
  quest: string | Quest;
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewWithDetails extends Omit<Review, 'user' | 'quest'> {
  user: User;
  quest: Quest;
}


// Оновити App.tsx
import { RootStackParamList } from './navigation';
