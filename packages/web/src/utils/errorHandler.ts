export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

export const handleApiError = (error: any): AppError => {
  console.error('API Error:', error);

  if (error.response) {
    // Сервер відповів з кодом помилки
    return {
      message: error.response.data?.message || 'Помилка сервера',
      code: error.response.status.toString(),
      details: error.response.data
    };
  } else if (error.request) {
    // Запит був зроблений, але відповіді не отримано
    return {
      message: 'Не вдалося з\'єднатися з сервером. Перевірте підключення до інтернету.',
      code: 'NETWORK_ERROR'
    };
  } else {
    // Щось сталося під час налаштування запиту
    return {
      message: error.message || 'Невідома помилка',
      code: 'UNKNOWN_ERROR'
    };
  }
};

export const showErrorToast = (error: AppError) => {
  // Тут може бути інтеграція з toast бібліотекою
  alert(`Помилка: ${error.message}`);
};

export const isNetworkError = (error: AppError): boolean => {
  return error.code === 'NETWORK_ERROR';
};

export const isAuthError = (error: AppError): boolean => {
  return error.code === '401';
};