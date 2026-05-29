import { z } from 'zod';

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Reglas de seguridad para contraseñas: mínimo 8, 1 mayúscula, 1 minúscula,
// 1 número y 1 carácter especial.
export const isValidPassword = (password) =>
  typeof password === 'string' &&
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /[0-9]/.test(password) &&
  /[^A-Za-z0-9]/.test(password);

export const PASSWORD_RULES_MESSAGE =
  'Mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial';

// Esquema Zod reutilizable para validar contraseñas nuevas.
export const passwordSchema = z
  .string()
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Debe incluir al menos una mayúscula')
  .regex(/[a-z]/, 'Debe incluir al menos una minúscula')
  .regex(/[0-9]/, 'Debe incluir al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Debe incluir al menos un carácter especial');
