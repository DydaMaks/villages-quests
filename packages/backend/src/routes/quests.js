import express from 'express';
import Quest from '../models/Quest.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Отримати всі квести
router.get('/', auth, async (req, res) => {
  try {
    const { difficulty, location, search, page = 1, limit = 12 } = req.query;
    
    const filter = { isActive: true };
    
    if (difficulty && difficulty !== 'all') {
      filter.difficulty = difficulty;
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Якщо організатор - показуємо тільки його квести
    if (req.user.role === 'organizer') {
      filter.organizer = req.user._id;
    }

    const quests = await Quest.find(filter)
      .populate('organizer', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Quest.countDocuments(filter);

    res.json({
      success: true,
      quests,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
      isOrganizer: req.user.role === 'organizer'
    });
  } catch (error) {
    console.error('🔥 Помилка отримання квестів:', error);
    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера при отриманні квестів'
    });
  }
});

// Отримати один квест
router.get('/:id', auth, async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id)
      .populate('organizer', 'username avatar email bio');
    
    if (!quest) {
      return res.status(404).json({
        success: false,
        message: '❌ Квест не знайдено'
      });
    }

    res.json({
      success: true,
      quest
    });
  } catch (error) {
    console.error('🔥 Помилка отримання квесту:', error);
    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера при отриманні квесту'
    });
  }
});

// Створити новий квест
router.post('/', auth, requireRole(['organizer']), async (req, res) => {
  try {
    const quest = await Quest.create({
      ...req.body,
      organizer: req.user._id
    });

    await quest.populate('organizer', 'username avatar');

    res.status(201).json({
      success: true,
      message: '✅ Квест успішно створено!',
      quest
    });
  } catch (error) {
    console.error('🔥 Помилка створення квесту:', error);
    res.status(500).json({
      success: false,
      message: '🚨 Помилка сервера при створенні квесту'
    });
  }
});

export default router;