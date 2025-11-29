import { User } from './auth';
import { ImageAsset, Coordinates, PaginationParams, ApiResponse, PaginatedResponse } from './common';

export interface QuestRating {
  average: number;
  count: number;
}

export interface Quest {
  _id: string;
  title: string;
  description: string;
  location: string;
  coordinates?: Coordinates;
  difficulty: 'easy' | 'medium' | 'hard';
  price: number;
  duration: number; // in minutes
  maxParticipants: number;
  images: ImageAsset[];
  organizer: string | User;
  isActive: boolean;
  rating: QuestRating;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface QuestWithOrganizer extends Omit<Quest, 'organizer'> {
  organizer: User;
}

export interface QuestFilters extends PaginationParams {
  difficulty?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  durationMin?: number;
  durationMax?: number;
  search?: string;
  tags?: string[];
  organizer?: string;
}

export interface CreateQuestData {
  title: string;
  description: string;
  location: string;
  coordinates?: Coordinates;
  difficulty: 'easy' | 'medium' | 'hard';
  price: number;
  duration: number;
  maxParticipants: number;
  images?: ImageAsset[];
  tags?: string[];
}

export interface UpdateQuestData extends Partial<CreateQuestData> {
  isActive?: boolean;
}

export interface QuestStats {
  maxPrice: number;
  minPrice: number;
  maxDuration: number;
  minDuration: number;
  totalQuests: number;
}

export interface QuestResponse extends ApiResponse {
  quest?: QuestWithOrganizer;
  quests?: QuestWithOrganizer[];
  totalPages?: number;
  currentPage?: number;
  total?: number;
  isOrganizer?: boolean;
  stats?: QuestStats;
}

export interface QuestsListResponse extends ApiResponse {
  quests: QuestWithOrganizer[];
  pagination: PaginatedResponse<QuestWithOrganizer>;
  stats: QuestStats;
  isOrganizer: boolean;
}