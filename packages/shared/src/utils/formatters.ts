import { COLORS } from '../constants/colors';

/**
 * Format price in Ukrainian currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format date in Ukrainian locale
 */
export const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('uk-UA', defaultOptions).format(new Date(dateString));
};

/**
 * Format date and time
 */
export const formatDateTime = (dateString: string): string => {
  return new Intl.DateTimeFormat('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};

/**
 * Format duration from minutes to readable string
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) {
    return `${hours} год ${mins} хв`;
  } else if (hours > 0) {
    return `${hours} год`;
  } else {
    return `${mins} хв`;
  }
};

/**
 * Format distance in meters to kilometers
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} м`;
  }
  return `${(meters / 1000).toFixed(1)} км`;
};

/**
 * Get difficulty text in Ukrainian
 */
export const getDifficultyText = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'Легко';
    case 'medium':
      return 'Середньо';
    case 'hard':
      return 'Складно';
    default:
      return difficulty;
  }
};

/**
 * Get difficulty color
 */
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return COLORS.success;
    case 'medium':
      return COLORS.warning;
    case 'hard':
      return COLORS.error;
    default:
      return COLORS.gray500;
  }
};

/**
 * Format rating with one decimal place
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
  if (bytes === 0) return '0 Б';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};