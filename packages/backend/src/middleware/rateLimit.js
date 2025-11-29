import rateLimit from 'express-rate-limit';

// Загальний rate limiting
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 100, // максимум 100 запитів за 15 хвилин
  message: {
    success: false,
    message: '❌ Забагато запитів з цієї IP адреси, спробуйте через 15 хвилин'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting для авторизації
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 5, // максимум 5 спроб входу за 15 хвилин
  message: {
    success: false,
    message: '❌ Забагато спроб входу, спробуйте через 15 хвилин'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting для створення контенту
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 година
  max: 10, // максимум 10 створень за годину
  message: {
    success: false,
    message: '❌ Забагато створень контенту, спробуйте через годину'
  },
  standardHeaders: true,
  legacyHeaders: false,
});