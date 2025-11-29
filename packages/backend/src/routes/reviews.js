import express from 'express';
import Review from '../models/Review.js';
import Order from '../models/Order.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Створити відгук
router.post('/', auth, async (req, res) => {
  try {
    const { questId, rating, comment } = req.body;

    // Перевірка чи користувач завершив цей квест
    const completedOrder = await Order.findOne({
      user: req.user._id,
      quest: questId,
      status: 'completed'
    });

    if (!completedOrder) {
      return res.status(403).json({
        success: false,
        message: '❌ Ви можете залишити відгук тільки після завершення квесту'
      });
    }

    // Перевірка чи відгук вже існує
    const existingReview = await Review.findOne({
      user: req.user._id,
      quest: questId
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: '❌ Ви вже залишили відгук для цього квесту'
      });
    }

    const review = await Review.create({
      user: req.user._id,
      quest: questId,
      rating,
      comment,
      isVerified: true
    });

    await review.populate('user', 'username avatar');

    res.status(201).json({
      success: true,
      message: '✅ Відгук успішно додано!',
      review
    });
  } catch (error) {
    console.error('🔥 Помилка створення відгуку:', error);
    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера при створенні відгуку'
    });
  }
});

export default router;