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

// Import models
import User from './src/models/User.js';
import Quest from './src/models/Quest.js';
import Order from './src/models/Order.js';
import Review from './src/models/Review.js';

// Import middleware
import errorHandler from './src/middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'exp://localhost:8081', 'http://localhost:8081'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB з async/await
const connectDB = async () => {
  try {
    console.log('🔗 Підключення до MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Підключено до MongoDB');
  } catch (error) {
    console.error('❌ Помилка підключення до MongoDB:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quests', questsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reviews', reviewsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    success: true,
    message: "Villages Quests Backend працює!",
    timestamp: new Date().toISOString(),
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Enhanced seed endpoint
app.post('/api/seed', async (req, res) => {
  try {
    console.log('🧹 Очищення бази даних...');
    
    // Очищення в правильному порядку (з урахуванням залежностей)
    await Review.deleteMany({});
    await Order.deleteMany({});
    await Quest.deleteMany({});
    await User.deleteMany({});

    console.log('👥 Створення тестових користувачів...');
    
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const user = await User.create({
      username: 'testuser',
      email: 'user@example.com',
      password: hashedPassword,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      bio: 'Люблю активний відпочинок та квести!'
    });

    const organizer = await User.create({
      username: 'questmaster',
      email: 'organizer@example.com',
      password: hashedPassword,
      role: 'organizer',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      bio: 'Професійний організатор квестів з 5-річним досвідом'
    });

    console.log('🗺️ Створення тестових квестів...');
    
    const quests = await Quest.create([
      {
        title: 'Таємниці Карпатського замку',
        description: 'Захоплюючий квест з історичними загадками та мальовничими видами Карпат. Дослідіть стародавні руїни, розгадайте таємниці лицарського ордену та знайдете приховані скарби.',
        location: 'Карпати, Замкова гора',
        coordinates: { lat: 48.2913, lng: 24.4479 },
        difficulty: 'medium',
        price: 450,
        duration: 180,
        maxParticipants: 12,
        images: [{
          url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
          alt: 'Карпатський замок'
        }],
        organizer: organizer._id,
        tags: ['історичний', 'пригоди', 'сходи', 'командна робота'],
        rating: { average: 4.7, count: 23 }
      },
      {
        title: 'Селянські пригоди',
        description: 'Веселий сімейний квест з традиційними українськими забавами. Навчіться готувати борщ, майструвати ляльки-мотанки та співати народні пісні.',
        location: 'Село Веселе, Вінницька область',
        coordinates: { lat: 49.2331, lng: 28.4682 },
        difficulty: 'easy',
        price: 250,
        duration: 120,
        maxParticipants: 20,
        images: [{
          url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=600&fit=crop',
          alt: 'Українське село'
        }],
        organizer: organizer._id,
        tags: ['сімейний', 'традиції', 'кулінарія', 'фольклор'],
        rating: { average: 4.9, count: 45 }
      }
    ]);

    console.log('📋 Створення тестових замовлень...');
    
    const orders = await Order.create([
      {
        user: user._id,
        quest: quests[0]._id,
        participants: 4,
        scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 днів
        totalPrice: 450 * 4,
        status: 'confirmed',
        specialRequests: 'Будь ласка, підготуйте вегетаріанські опції для перекусу'
      }
    ]);

    console.log('⭐ Створення тестових відгуків...');
    
    const reviews = await Review.create([
      {
        user: user._id,
        quest: quests[0]._id,
        rating: 5,
        comment: 'Неймовірний квест! Організація на високому рівні, цікаві завдання та чудові види. Обов\'язково повернемось!',
        isVerified: true
      }
    ]);

    res.json({
      success: true,
      message: '✅ Тестові дані успішно створено!',
      data: {
        users: 2,
        quests: quests.length,
        orders: orders.length,
        reviews: reviews.length
      }
    });

  } catch (error) {
    console.error('❌ Помилка створення тестових даних:', error);
    res.status(500).json({
      success: false,
      message: '❌ Помилка створення тестових даних',
      error: error.message
    });
  }
});

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  await connectDB();
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🎯 Сервер працює на порті ${PORT}`);
    console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
    console.log(`📊 Seed: http://localhost:${PORT}/api/seed (POST)`);
    console.log(`📚 MongoDB: ${mongoose.connection.readyState === 1 ? '✅ Підключено' : '❌ Відключено'}`);
  });
};

startServer().catch(console.error);