import * as Crypto from 'expo-crypto';
import { PasswordHasher } from '../../infrastructure/crypto/PasswordHasher';
import { AppError } from '../../core/errors/AppError';
import { ROLES } from '../../core/constants';

const ADMIN_EMAIL = 'admin@afp.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_SECURITY_QUESTION = '¿Nombre de la empresa?';
const ADMIN_SECURITY_ANSWER = 'afp';

// Repositorio de autenticación 100% local (AsyncStorage + hashing).
export class AuthRepositoryImpl {
  constructor(users) {
    this.users = users; // UserLocalDataSource
  }

  // Convierte el registro guardado a un usuario "público" (sin hashes ni sales).
  toPublicUser(record) {
    if (!record) return null;
    return {
      id: record.id,
      email: record.email,
      name: record.name,
      lastName: record.lastName,
      role: record.role,
      active: record.active !== false,
      securityQuestion: record.securityQuestion,
      photo: record.photo ?? null,
      notifications: record.notifications ?? true,
      simpleMode: record.simpleMode ?? false,
    };
  }

  // Crea el usuario admin por defecto la primera vez que se abre la app.
  async seedAdmin() {
    const existing = await this.users.findByEmail(ADMIN_EMAIL);
    if (existing) return;

    const password = await PasswordHasher.hash(ADMIN_PASSWORD);
    const answer = await PasswordHasher.hash(ADMIN_SECURITY_ANSWER);

    await this.users.create({
      id: 'admin',
      email: ADMIN_EMAIL,
      name: 'Administrador',
      lastName: '',
      role: ROLES.ADMIN,
      active: true,
      passwordSalt: password.salt,
      passwordHash: password.hash,
      securityQuestion: ADMIN_SECURITY_QUESTION,
      securitySalt: answer.salt,
      securityHash: answer.hash,
      createdAt: new Date().toISOString(),
    });
  }

  async register(data) {
    const exists = await this.users.findByEmail(data.email);
    if (exists) {
      throw new AppError('VALIDATION_ERROR', 'Ya existe una cuenta con ese correo');
    }

    const password = await PasswordHasher.hash(data.password);
    const answer = await PasswordHasher.hash(data.securityAnswer.trim().toLowerCase());

    const record = {
      id: Date.now().toString(),
      email: data.email.trim(),
      name: data.name,
      lastName: data.lastName,
      role: ROLES.USER, // todo registro nuevo es usuario normal
      active: true,
      passwordSalt: password.salt,
      passwordHash: password.hash,
      securityQuestion: data.securityQuestion,
      securitySalt: answer.salt,
      securityHash: answer.hash,
      createdAt: new Date().toISOString(),
    };

    await this.users.create(record);
    const publicUser = this.toPublicUser(record);
    console.log('[Auth] register:', JSON.stringify(publicUser, null, 2));
    return publicUser;
  }

  async login({ email, password }) {
    const record = await this.users.findByEmail(email);
    if (!record) {
      throw new AppError('UNAUTHORIZED', 'Usuario o contraseña incorrectos');
    }

    const ok = await PasswordHasher.verify(password, record.passwordSalt, record.passwordHash);
    if (!ok) {
      throw new AppError('UNAUTHORIZED', 'Usuario o contraseña incorrectos');
    }

    if (record.active === false) {
      throw new AppError('FORBIDDEN', 'Tu cuenta está desactivada. Contacta al administrador.');
    }

    // Genera un token de sesión y lo guarda junto al rol en AsyncStorage.
    const token = await Crypto.randomUUID();
    await this.users.setSession({ token, email: record.email, role: record.role });

    const publicUser = this.toPublicUser(record);
    console.log('[Auth] login:', JSON.stringify(publicUser, null, 2));
    return publicUser;
  }

  async logout() {
    await this.users.clearSession();
  }

  // Devuelve el usuario de la sesión guardada (o null) validando que siga activo.
  async getCurrentUser() {
    const session = await this.users.getSession();
    if (!session?.email) return null;

    const record = await this.users.findByEmail(session.email);
    if (!record || record.active === false) {
      await this.users.clearSession();
      return null;
    }
    return this.toPublicUser(record);
  }

  // Recuperación de contraseña: paso 1, obtener la pregunta de seguridad.
  async getSecurityQuestion(email) {
    const record = await this.users.findByEmail(email);
    if (!record) {
      throw new AppError('NOT_FOUND', 'No existe una cuenta con ese correo');
    }
    return record.securityQuestion;
  }

  // Recuperación de contraseña: paso 2, validar respuesta y fijar nueva contraseña.
  async resetPassword(email, answer, newPassword) {
    const record = await this.users.findByEmail(email);
    if (!record) {
      throw new AppError('NOT_FOUND', 'No existe una cuenta con ese correo');
    }

    const ok = await PasswordHasher.verify(
      answer.trim().toLowerCase(),
      record.securitySalt,
      record.securityHash,
    );
    if (!ok) {
      throw new AppError('VALIDATION_ERROR', 'La respuesta de seguridad es incorrecta');
    }

    const password = await PasswordHasher.hash(newPassword);
    await this.users.update(email, {
      passwordSalt: password.salt,
      passwordHash: password.hash,
    });
  }

  // Cambio de contraseña estando logueado (requiere la contraseña actual).
  async updatePassword(email, currentPassword, newPassword) {
    const record = await this.users.findByEmail(email);
    if (!record) {
      throw new AppError('NOT_FOUND', 'Sesión no válida');
    }

    const ok = await PasswordHasher.verify(currentPassword, record.passwordSalt, record.passwordHash);
    if (!ok) {
      throw new AppError('VALIDATION_ERROR', 'La contraseña actual es incorrecta');
    }

    const password = await PasswordHasher.hash(newPassword);
    await this.users.update(email, {
      passwordSalt: password.salt,
      passwordHash: password.hash,
    });
  }

  // Actualiza solo datos no sensibles del perfil.
  async updateProfile(email, changes) {
    const safe = {
      name: changes.name,
      lastName: changes.lastName,
      photo: changes.photo,
      notifications: changes.notifications,
      simpleMode: changes.simpleMode,
    };
    const updated = await this.users.update(email, safe);
    return this.toPublicUser(updated);
  }

  // ─── Administración (solo admin) ───────────────────────────
  // Lista de usuarios sin datos sensibles.
  async getAllUsers() {
    const all = await this.users.getAll();
    return all.map((u) => this.toPublicUser(u));
  }

  // Activa o desactiva una cuenta (dar de baja = active:false).
  async setUserActive(email, active) {
    const updated = await this.users.update(email, { active });
    return this.toPublicUser(updated);
  }
}
