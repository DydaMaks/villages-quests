export const NAVIGATION = {
  // Web Routes
  WEB_ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    QUESTS: '/quests',
    QUEST_DETAIL: '/quests/:id',
    PROFILE: '/profile',
    ADD_QUEST: '/add-quest',
    EDIT_QUEST: '/edit-quest/:id',
    ORDERS: '/orders',
    ORDER_DETAIL: '/orders/:id',
    REVIEWS: '/reviews',
    ORGANIZER_DASHBOARD: '/organizer',
  },

  // Mobile Screens
  MOBILE_SCREENS: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    QUESTS: 'Quests',
    QUEST_DETAIL: 'QuestDetail',
    PROFILE: 'Profile',
    ADD_QUEST: 'AddQuest',
    EDIT_QUEST: 'EditQuest',
    ORDERS: 'Orders',
    ORDER_DETAIL: 'OrderDetail',
    REVIEWS: 'Reviews',
    ORGANIZER_DASHBOARD: 'OrganizerDashboard',
    SETTINGS: 'Settings',
  },

  // Tab Names
  TABS: {
    EXPLORE: 'Explore',
    MY_QUESTS: 'MyQuests',
    ORDERS: 'Orders',
    PROFILE: 'Profile',
  },
} as const;