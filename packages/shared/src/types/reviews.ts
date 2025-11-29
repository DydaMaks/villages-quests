import { User } from './auth';
import { Quest, QuestWithOrganizer } from './quests';
import { ApiResponse, PaginationParams, PaginatedResponse } from './common';

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
  quest: QuestWithOrganizer;
}

export interface CreateReviewData {
  questId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

export interface ReviewFilters extends PaginationParams {
  quest?: string;
  user?: string;
  rating?: number;
  minRating?: number;
  maxRating?: number;
}

export interface ReviewStats {
  average: number;
  count: number;
  distribution: {
    rating: number;
    count: number;
    percentage: number;
  }[];
}

export interface ReviewResponse extends ApiResponse {
  review?: ReviewWithDetails;
  reviews?: ReviewWithDetails[];
  totalPages?: number;
  currentPage?: number;
  total?: number;
  stats?: ReviewStats;
}

export interface ReviewsListResponse extends ApiResponse {
  reviews: ReviewWithDetails[];
  pagination: PaginatedResponse<ReviewWithDetails>;
  stats: ReviewStats;
}