import express from 'express';
import Order from '../models/Order.js';
import Quest from '../models/Quest.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Створити замовлення
router.post('/', auth, async (req, res) => {
  try {
    const { questId, participants, scheduledDate, specialRequests } = req.body;

    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.status(404).json({
        success: false,
        message: '❌ Квест не знайдено'
      });
    }

    // Перевірка дати
    if (new Date(scheduledDate) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: '❌ Дата має бути в майбутньому'
      });
    }

    // Перевірка кількості учасників
    if (participants > quest.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: `❌ Максимальна кількість учасників: ${quest.maxParticipants}`
      });
    }

    const totalPrice = quest.price * participants;

    const order = await Order.create({
      user: req.user._id,
      quest: questId,
      participants,
      scheduledDate,
      totalPrice,
      specialRequests,
      status: 'pending'
    });

    await order.populate('quest', 'title location price organizer');
    await order.populate('user', 'username email');

    res.status(201).json({
      success: true,
      message: '✅ Замовлення створено успішно!',
      order
    });
  } catch (error) {
    console.error('🔥 Помилка створення замовлення:', error);
    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера при створенні замовлення'
    });
  }
});

// Отримати замовлення користувача
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('quest', 'title location price images organizer')
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('🔥 Помилка отримання замовлень:', error);
    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера при отриманні замовлень'
    });
  }
});

export default router;