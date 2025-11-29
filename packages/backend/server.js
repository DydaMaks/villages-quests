import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes from src folder
import authRoutes from './src/routes/auth.js';
import questsRoutes from './src/routes/quests.js';
import usersRoutes from './src/routes/users.js';
import ordersRoutes from './src/routes/orders.js';
import reviewsRoutes from './src/routes/reviews.js';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'exp://localhost:8081'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Підключено до MongoDB'))
.catch(err => {
  console.error('❌ Помилка підключення до MongoDB:', err);
  process.exit(1);
});

// Import models
import User from './src/models/User.js';
import Quest from './src/models/Quest.js';
import Order from './src/models/Order.js';
import Review from './src/models/Review.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quests', questsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reviews', reviewsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: "Villages Quests Backend працює!",
    timestamp: new Date().toISOString()
  });
});

// Seed endpoint
app.post('/api/seed', async (req, res) => {
  try {
    // Очищення бази даних
    await User.deleteMany({});
    await Quest.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});

    // Створення тестових користувачів
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const user = await User.create({
      username: 'testuser',
      email: 'user@example.com',
      password: hashedPassword,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
    });

    const organizer = await User.create({
      username: 'questmaster',
      email: 'organizer@example.com',
      password: hashedPassword,
      role: 'organizer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
    });

    // Створення тестових квестів
    const quests = await Quest.create([
      {
        title: 'Таємниці Карпатського замку',
        description: 'Захоплюючий квест з історичними загадками та мальовничими видами Карпат.',
        location: 'Карпати, Замкова гора',
        difficulty: 'medium',
        price: 450,
        duration: 180,
        maxParticipants: 12,
        images: [{
          url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
          alt: 'Карпатський замок'
        }],
        organizer: organizer._id,
        rating: { average: 4.7, count: 23 }
      },
      {
        title: 'Селянські пригоди',
        description: 'Веселий сімейний квест з традиційними українськими забавами.',
        location: 'Село Веселе, Вінницька область',
        difficulty: 'easy',
        price: 250,
        duration: 120,
        maxParticipants: 20,
        images: [{
          url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=600&fit=crop',
          alt: 'Українське село'
        }],
        organizer: organizer._id,
        rating: { average: 4.9, count: 45 }
      }
    ]);

    res.json({
      success: true,
      message: '✅ Тестові дані створено!',
      data: {
        users: 2,
        quests: 2
      }
    });

  } catch (error) {
    console.error('❌ Помилка створення тестових даних:', error);
    res.status(500).json({
      success: false,
      message: '❌ Помилка створення тестових даних'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Сервер працює на порті ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`📊 Seed: http://localhost:${PORT}/api/seed (POST)`);
});