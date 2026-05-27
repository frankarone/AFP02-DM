export const APP_NAME = 'AFP02';

export const STORAGE_KEYS = {
  // Lista de usuarios registrados (AsyncStorage)
  USERS: 'afp_users',
  // Correo del usuario con sesión activa
  SESSION: 'afp_session',
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
};

// Roles disponibles en el sistema
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
