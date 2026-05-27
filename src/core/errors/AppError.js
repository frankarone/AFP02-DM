// Códigos de error de la app:
// 'NETWORK_ERROR' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'UNKNOWN_ERROR'

export class AppError extends Error {
  constructor(code, message, statusCode) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}
