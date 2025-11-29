export const CONFIG = {
  // API Configuration
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000/api',
  API_TIMEOUT: 15000,

  // App Configuration
  APP_NAME: 'Villages Quests',
  APP_VERSION: '2.0.0',
  APP_DESCRIPTION: 'Крос-платформний додаток для квестів у селах України',

  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  DEFAULT_PAGE: 1,
  MAX_PAGE_SIZE: 50,

  // Quests
  MAX_PARTICIPANTS: 50,
  MIN_PARTICIPANTS: 1,
  MAX_DURATION: 480, // 8 hours in minutes
  MIN_DURATION: 15, // 15 minutes
  MAX_PRICE: 10000, // 10,000 UAH
  MIN_PRICE: 0,

  // Orders
  MAX_ORDER_PARTICIPANTS: 20,
  MIN_ORDER_PARTICIPANTS: 1,

  // Reviews
  MIN_RATING: 1,
  MAX_RATING: 5,

  // Images
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],

  // Local Storage Keys
  STORAGE_KEYS: {
    USER_DATA: 'userData',
    USER_TOKEN: 'userToken',
    THEME_PREFERENCE: 'themePreference',
    LANGUAGE: 'language',
  },

  // Features
  FEATURES: {
    ENABLE_REVIEWS: true,
    ENABLE_ORDERS: true,
    ENABLE_ORGANIZER_DASHBOARD: true,
    ENABLE_ADVANCED_FILTERS: true,
  },
} as const;

export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;