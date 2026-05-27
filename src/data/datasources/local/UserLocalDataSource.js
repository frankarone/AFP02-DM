import { AppStorage } from '../../../infrastructure/storage/AppStorage';
import { STORAGE_KEYS } from '../../../core/constants';

// Acceso a los usuarios y a la sesión guardados en AsyncStorage.
// Solo persiste/lee datos; el hashing y las reglas viven en el repositorio.
export class UserLocalDataSource {
  async getAll() {
    return (await AppStorage.getJSON(STORAGE_KEYS.USERS)) ?? [];
  }

  async saveAll(users) {
    await AppStorage.setJSON(STORAGE_KEYS.USERS, users);
  }

  async findByEmail(email) {
    const users = await this.getAll();
    const target = email.trim().toLowerCase();
    return users.find((u) => u.email.toLowerCase() === target) ?? null;
  }

  async create(user) {
    const users = await this.getAll();
    users.push(user);
    await this.saveAll(users);
    return user;
  }

  async update(email, changes) {
    const users = await this.getAll();
    const target = email.trim().toLowerCase();
    const index = users.findIndex((u) => u.email.toLowerCase() === target);
    if (index === -1) return null;
    users[index] = { ...users[index], ...changes };
    await this.saveAll(users);
    return users[index];
  }

  // ─── Sesión ────────────────────────────────────────────────
  // session = { token, email, role }
  async setSession(session) {
    await AppStorage.setJSON(STORAGE_KEYS.SESSION, session);
  }

  async getSession() {
    return AppStorage.getJSON(STORAGE_KEYS.SESSION);
  }

  async clearSession() {
    await AppStorage.removeItem(STORAGE_KEYS.SESSION);
  }
}
