import { VALIDATION } from '../constants/validation';

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL.PATTERN.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
    errors.push(VALIDATION.MESSAGES.PASSWORD_TOO_SHORT);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate username
 */
export const validateUsername = (username: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (username.length < VALIDATION.USERNAME.MIN_LENGTH) {
    errors.push(`Ім'я повинно містити принаймні ${VALIDATION.USERNAME.MIN_LENGTH} символи`);
  }

  if (username.length > VALIDATION.USERNAME.MAX_LENGTH) {
    errors.push(`Ім'я не може перевищувати ${VALIDATION.USERNAME.MAX_LENGTH} символів`);
  }

  if (!VALIDATION.USERNAME.PATTERN.test(username)) {
    errors.push(VALIDATION.MESSAGES.USERNAME_INVALID);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate quest data
 */
export const validateQuestData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title || data.title.length < VALIDATION.QUEST.TITLE.MIN_LENGTH) {
    errors.push(`Назва повинна містити принаймні ${VALIDATION.QUEST.TITLE.MIN_LENGTH} символів`);
  }

  if (!data.description || data.description.length < VALIDATION.QUEST.DESCRIPTION.MIN_LENGTH) {
    errors.push(`Опис повинен містити принаймні ${VALIDATION.QUEST.DESCRIPTION.MIN_LENGTH} символів`);
  }

  if (!data.location) {
    errors.push('Локація обов\'язкова');
  }

  if (data.price < VALIDATION.QUEST.PRICE.MIN || data.price > VALIDATION.QUEST.PRICE.MAX) {
    errors.push(VALIDATION.MESSAGES.PRICE_INVALID);
  }

  if (data.duration < VALIDATION.QUEST.DURATION.MIN || data.duration > VALIDATION.QUEST.DURATION.MAX) {
    errors.push(VALIDATION.MESSAGES.DURATION_INVALID);
  }

  if (data.maxParticipants < VALIDATION.QUEST.PARTICIPANTS.MIN || data.maxParticipants > VALIDATION.QUEST.PARTICIPANTS.MAX) {
    errors.push(`Кількість учасників повинна бути від ${VALIDATION.QUEST.PARTICIPANTS.MIN} до ${VALIDATION.QUEST.PARTICIPANTS.MAX}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate order data
 */
export const validateOrderData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.questId) {
    errors.push('Квест обов\'язковий');
  }

  if (!data.participants || data.participants < VALIDATION.ORDER.PARTICIPANTS.MIN) {
    errors.push(`Кількість учасників повинна бути принаймні ${VALIDATION.ORDER.PARTICIPANTS.MIN}`);
  }

  if (data.participants > VALIDATION.ORDER.PARTICIPANTS.MAX) {
    errors.push(`Максимальна кількість учасників: ${VALIDATION.ORDER.PARTICIPANTS.MAX}`);
  }

  if (!data.scheduledDate) {
    errors.push('Дата проведення обов\'язкова');
  } else if (new Date(data.scheduledDate) <= new Date()) {
    errors.push('Дата має бути в майбутньому');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate review data
 */
export const validateReviewData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.questId) {
    errors.push('Квест обов\'язковий');
  }

  if (!data.rating || data.rating < VALIDATION.REVIEW.RATING.MIN || data.rating > VALIDATION.REVIEW.RATING.MAX) {
    errors.push(`Рейтинг повинен бути від ${VALIDATION.REVIEW.RATING.MIN} до ${VALIDATION.REVIEW.RATING.MAX}`);
  }

  if (!data.comment || data.comment.length < VALIDATION.REVIEW.COMMENT.MIN_LENGTH) {
    errors.push(`Коментар повинен містити принаймні ${VALIDATION.REVIEW.COMMENT.MIN_LENGTH} символів`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Check if passwords match
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};