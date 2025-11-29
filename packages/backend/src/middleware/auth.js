import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '🔐 Доступ заборонено. Токен не надано.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: '🔐 Користувача не знайдено або обліковий запис деактивовано.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('🔐 Помилка авторизації:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: '🔐 Невалідний токен.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '🔐 Токен прострочено.'
      });
    }

    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера при авторизації.'
    });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: '⛔ Недостатньо прав для виконання цієї дії.'
      });
    }
    next();
  };
};

export { auth, requireRole };