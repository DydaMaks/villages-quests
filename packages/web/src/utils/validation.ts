// Константи валідації
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128
  },
  QUEST: {
    TITLE: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100
    },
    DESCRIPTION: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 2000
    },
    PRICE: {
      MIN: 0,
      MAX: 10000
    },
    DURATION: {
      MIN: 15,
      MAX: 480
    },
    PARTICIPANTS: {
      MIN: 1,
      MAX: 50
    }
  },
  ORDER: {
    PARTICIPANTS: {
      MIN: 1,
      MAX: 20
    }
  },
  MESSAGES: {
    REQUIRED: 'Це поле обов\'язкове',
    EMAIL_INVALID: 'Введіть коректний email',
    PASSWORD_TOO_SHORT: 'Пароль повинен містити принаймні 6 символів',
    USERNAME_INVALID: 'Ім\'я повинно містити від 3 до 30 символів (лише літери, цифри та _)',
    PASSWORDS_DONT_MATCH: 'Паролі не співпадають',
    PRICE_INVALID: 'Ціна повинна бути від 0 до 10000',
    DURATION_INVALID: 'Тривалість повинна бути від 15 до 480 хвилин'
  }
} as const;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push(VALIDATION.MESSAGES.REQUIRED);
  } else if (!VALIDATION.EMAIL.PATTERN.test(email)) {
    errors.push(VALIDATION.MESSAGES.EMAIL_INVALID);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push(VALIDATION.MESSAGES.REQUIRED);
  } else if (password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
    errors.push(VALIDATION.MESSAGES.PASSWORD_TOO_SHORT);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUsername = (username: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!username) {
    errors.push(VALIDATION.MESSAGES.REQUIRED);
  } else if (username.length < VALIDATION.USERNAME.MIN_LENGTH) {
    errors.push(`Ім'я повинно містити принаймні ${VALIDATION.USERNAME.MIN_LENGTH} символи`);
  } else if (username.length > VALIDATION.USERNAME.MAX_LENGTH) {
    errors.push(`Ім'я не може перевищувати ${VALIDATION.USERNAME.MAX_LENGTH} символів`);
  } else if (!VALIDATION.USERNAME.PATTERN.test(username)) {
    errors.push(VALIDATION.MESSAGES.USERNAME_INVALID);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateQuest = (questData: any): ValidationResult => {
  const errors: string[] = [];
  
  if (!questData.title || questData.title.length < VALIDATION.QUEST.TITLE.MIN_LENGTH) {
    errors.push(`Назва повинна містити принаймні ${VALIDATION.QUEST.TITLE.MIN_LENGTH} символів`);
  }
  
  if (!questData.description || questData.description.length < VALIDATION.QUEST.DESCRIPTION.MIN_LENGTH) {
    errors.push(`Опис повинен містити принаймні ${VALIDATION.QUEST.DESCRIPTION.MIN_LENGTH} символів`);
  }
  
  if (!questData.location) {
    errors.push('Локація обов\'язкова');
  }
  
  if (questData.price < VALIDATION.QUEST.PRICE.MIN || questData.price > VALIDATION.QUEST.PRICE.MAX) {
    errors.push(VALIDATION.MESSAGES.PRICE_INVALID);
  }
  
  if (questData.duration < VALIDATION.QUEST.DURATION.MIN || questData.duration > VALIDATION.QUEST.DURATION.MAX) {
    errors.push(VALIDATION.MESSAGES.DURATION_INVALID);
  }
  
  if (questData.maxParticipants < VALIDATION.QUEST.PARTICIPANTS.MIN || questData.maxParticipants > VALIDATION.QUEST.PARTICIPANTS.MAX) {
    errors.push(`Кількість учасників повинна бути від ${VALIDATION.QUEST.PARTICIPANTS.MIN} до ${VALIDATION.QUEST.PARTICIPANTS.MAX}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};