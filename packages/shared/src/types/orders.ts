import { User } from './auth';
import { Quest, QuestWithOrganizer } from './quests';
import { ApiResponse, PaginationParams, PaginatedResponse } from './common';

export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Order {
  _id: string;
  user: string | User;
  quest: string | Quest;
  participants: number;
  scheduledDate: string;
  totalPrice: number;
  status: OrderStatus;
  specialRequests?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderWithDetails extends Omit<Order, 'user' | 'quest'> {
  user: User;
  quest: QuestWithOrganizer;
}

export interface CreateOrderData {
  questId: string;
  participants: number;
  scheduledDate: string;
  specialRequests?: string;
}

export interface UpdateOrderStatusData {
  status: OrderStatus;
}

export interface OrderFilters extends PaginationParams {
  status?: OrderStatus | 'all';
  quest?: string;
  user?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderResponse extends ApiResponse {
  order?: OrderWithDetails;
  orders?: OrderWithDetails[];
  totalPages?: number;
  currentPage?: number;
  total?: number;
}

export interface OrdersListResponse extends ApiResponse {
  orders: OrderWithDetails[];
  pagination: PaginatedResponse<OrderWithDetails>;
}