import { create } from 'zustand';
import { container } from '../../../../infrastructure/di/container';

// Estructura del usuario logueado (referencia):
// { id, email, name, lastName, role, securityQuestion, photo?, notifications?, simpleMode? }

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,

  // Restaura la sesión guardada (y siembra el admin por defecto).
  checkSession: async () => {
    const user = await container.checkSessionUseCase.execute();
    if (user) set({ isAuthenticated: true, user });
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await container.loginUseCase.execute({ email, password });
      set({ isAuthenticated: true, isLoading: false, user });
    } catch (e) {
      set({ isLoading: false, error: e?.message ?? 'Usuario o contraseña incorrectos' });
    }
  },

  // Registra un usuario normal. No inicia sesión automáticamente.
  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await container.registerUseCase.execute(data);
      set({ isLoading: false });
      return true;
    } catch (e) {
      set({ isLoading: false, error: e?.message ?? 'Error al registrar usuario' });
      return false;
    }
  },

  // Recuperación paso 1: obtener la pregunta de seguridad del correo.
  requestSecurityQuestion: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const question = await container.getSecurityQuestionUseCase.execute(email);
      set({ isLoading: false });
      return question;
    } catch (e) {
      set({ isLoading: false, error: e?.message ?? 'No se pudo obtener la pregunta' });
      return null;
    }
  },

  // Recuperación paso 2: validar respuesta y fijar nueva contraseña.
  resetPassword: async (email, answer, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      await container.resetPasswordUseCase.execute(email, answer, newPassword);
      set({ isLoading: false });
      return true;
    } catch (e) {
      set({ isLoading: false, error: e?.message ?? 'No se pudo restablecer la contraseña' });
      return false;
    }
  },

  // Cambio de contraseña del usuario logueado.
  updatePassword: async (current, next) => {
    const email = get().user?.email;
    if (!email) {
      set({ error: 'Debes iniciar sesión para cambiar la contraseña' });
      return false;
    }
    set({ isLoading: true, error: null });
    try {
      await container.updatePasswordUseCase.execute(email, current, next);
      set({ isLoading: false });
      return true;
    } catch (e) {
      set({ isLoading: false, error: e?.message ?? 'Error al actualizar contraseña' });
      return false;
    }
  },

  logout: async () => {
    await container.authRepository.logout();
    set({ isAuthenticated: false, user: null });
  },

  // Actualiza y persiste datos no sensibles del perfil.
  updateProfile: async (data) => {
    const email = get().user?.email;
    if (!email) return;
    const updated = await container.authRepository.updateProfile(email, data);
    if (updated) set({ user: updated });
  },

  // ─── Administración de usuarios (solo admin) ───────────────
  users: [],

  // Carga la lista de usuarios en el estado.
  loadUsers: async () => {
    const users = await container.authRepository.getAllUsers();
    set({ users });
  },

  // Activa o desactiva (da de baja) una cuenta y recarga la lista.
  setUserActive: async (email, active) => {
    await container.authRepository.setUserActive(email, active);
    await get().loadUsers();
  },

  clearError: () => set({ error: null }),
}));
