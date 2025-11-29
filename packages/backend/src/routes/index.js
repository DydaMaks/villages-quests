import authRoutes from './auth.js';
import questsRoutes from './quests.js';
import usersRoutes from './users.js';
import ordersRoutes from './orders.js';
import reviewsRoutes from './reviews.js';

export {
  authRoutes,
  questsRoutes,
  usersRoutes,
  ordersRoutes,
  reviewsRoutes
};

export default [
  { path: '/auth', routes: authRoutes },
  { path: '/quests', routes: questsRoutes },
  { path: '/users', routes: usersRoutes },
  { path: '/orders', routes: ordersRoutes },
  { path: '/reviews', routes: reviewsRoutes },
];