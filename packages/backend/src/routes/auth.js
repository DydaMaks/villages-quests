import express from 'express';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Реєстрація
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Перевірка обов'язкових полів
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: '❌ Будь ласка, заповніть всі обов\'язкові поля'
      });
    }

    // Перевірка унікальності
    const existingUser = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '❌ Користувач з таким email або іменем вже існує'
      });
    }

    // Створення користувача
    const user = await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'user'
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: '✅ Користувача успішно зареєстровано!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('🔥 Помилка реєстрації:', error);
    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера при реєстрації'
    });
  }
});

// Логін
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '❌ Будь ласка, введіть email та пароль'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user || !(await user.correctPassword(password))) {
      return res.status(401).json({
        success: false,
        message: '❌ Невірний email або пароль'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: '❌ Обліковий запис деактивовано'
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: '✅ Вхід успішний!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('🔥 Помилка входу:', error);
    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера при вході'
    });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    // Повертаємо user без обгортки data для сумісності з фронтендом
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('🔥 Помилка отримання профілю:', error);
    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера'
    });
  }
});
export default router;