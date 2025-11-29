// Middleware для обробки помилок
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Помилка сервера:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    user: req.user ? req.user._id : 'anonymous',
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      success: false,
      message: '❌ Помилка валідації даних',
      errors: errors
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `❌ Користувач з таким ${field} вже існує`
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: '🔐 Невалідний токен'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: '🔐 Токен прострочено'
    });
  }

  // CastError (неправильний ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: '❌ Неправильний формат ID'
    });
  }

  // Default error
  const statusCode = err.status || 500;
  const message = err.message || '🚨 Внутрішня помилка сервера';
  
  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? '🚨 Внутрішня помилка сервера' : message
  });
};

export default errorHandler;