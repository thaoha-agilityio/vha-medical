export const API_ENDPOINT = {
  AUTH: '/auth/local',
  SIGN_UP: '/auth/local/register',
  APPOINTMENTS: '/appointments',
  NOTIFICATIONS: '/notifications',
  SPECIALTIES: '/specialties',
  USERS: '/users',
  UPLOAD: '/upload',
  CHEMISTS: '/chemists',
  PERMISSIONS: '/users-permissions',
  TRANSACTIONS: '/transactions',
};

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const IMGBB_URL = `${process.env.NEXT_PUBLIC_IMGBB_URL}?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

export const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

export const API_ROUTE_ENDPOINT = {
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/signup',
  NOTIFICATIONS: '/api/notifications',
  CHEMISTS: '/api/chemists',
  USERS: '/api/users',
  APPOINTMENTS: '/api/appointments',
  TRANSACTIONS: '/api/transactions',
  USER_LOGGED: '/api/users/user-logged',
  USER_ROLE: '/api/users/user-role',
  SEND_MONEY: '/api/users/send-money',
};

export const DOMAIN = process.env.DOMAIN;
