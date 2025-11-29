// User Validation
const USERNAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
  PATTERN: /^[a-zA-Z0-9_]+$/,
} as const;

const EMAIL = {
  PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

const PASSWORD = {
  MIN_LENGTH: 6,
  MAX_LENGTH: 128,
} as const;

const BIO = {
  MAX_LENGTH: 500,
} as const;

// Quest Validation
const QUEST = {
  TITLE: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 100,
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 2000,
  },
  LOCATION: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 200,
  },
  PRICE: {
    MIN: 0,
    MAX: 10000,
  },
  DURATION: {
    MIN: 15,
    MAX: 480,
  },
  PARTICIPANTS: {
    MIN: 1,
    MAX: 50,
  },
  TAGS: {
    MAX_COUNT: 10,
    MAX_LENGTH: 20,
  },
} as const;

// Order Validation
const ORDER = {
  PARTICIPANTS: {
    MIN: 1,
    MAX: 20,
  },
  SPECIAL_REQUESTS: {
    MAX_LENGTH: 500,
  },
} as const;

// Review Validation
const REVIEW = {
  COMMENT: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
  },
  RATING: {
    MIN: 1,
    MAX: 5,
  },
} as const;

// Error Messages
const MESSAGES = {
  REQUIRED: 'Це поле обов\'язкове',
  EMAIL_INVALID: 'Введіть коректний email',
  PASSWORD_TOO_SHORT: `Пароль повинен містити принаймні ${PASSWORD.MIN_LENGTH} символів`,
  USERNAME_INVALID: `Ім'я повинно містити від ${USERNAME.MIN_LENGTH} до ${USERNAME.MAX_LENGTH} символів (лише літери, цифри та _)`,
  PASSWORDS_DONT_MATCH: 'Паролі не співпадають',
  PRICE_INVALID: `Ціна повинна бути від ${QUEST.PRICE.MIN} до ${QUEST.PRICE.MAX}`,
  DURATION_INVALID: `Тривалість повинна бути від ${QUEST.DURATION.MIN} до ${QUEST.DURATION.MAX} хвилин`,
} as const;

export const VALIDATION = {
  USERNAME,
  EMAIL,
  PASSWORD,
  BIO,
  QUEST,
  ORDER,
  REVIEW,
  MESSAGES,
} as const;