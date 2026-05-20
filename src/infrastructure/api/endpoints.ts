export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    UPDATE_PASSWORD: '/auth/password',
    RECOVER_PASSWORD: '/auth/password/recover',
  },
  USER: {
    PROFILE: '/user/profile',
    AVATAR: '/user/avatar',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
  },
} as const;
