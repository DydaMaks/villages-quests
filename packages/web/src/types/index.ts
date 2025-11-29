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

export interface Quest {
  _id: string;
  title: string;
  description: string;
  location: string;
  difficulty: string;
  price: number;
  duration: number;
  maxParticipants: number;
  organizer: {
    _id: string;
    username: string;
    avatar?: string;
  };
  images: Array<{ url: string; alt: string }>;
  rating: {
    average: number;
    count: number;
  };
  tags?: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  error?: string;
}

export interface QuestsResponse {
  success: boolean;
  message: string;
  quests?: Quest[];
  totalPages?: number;
  currentPage?: number;
  total?: number;
  isOrganizer?: boolean;
  error?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

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