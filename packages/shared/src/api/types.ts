import { AxiosResponse } from 'axios';
import { ApiResponse } from '../types/common';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export type ApiPromise<T = any> = Promise<AxiosResponse<ApiResponse<T>>>;

export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}

export interface PaginatedQueryParams extends QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}