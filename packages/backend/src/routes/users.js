import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Отримати профіль користувача
router.get('/profile', auth, async (req, res) => {
  try {
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