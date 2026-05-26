import { create } from 'zustand';
import { container } from '../../../../infrastructure/di/container';
import type { RegisterData } from '../../../../domain/repositories/IAuthRepository';

// datos del usuario logueado
type AuthUser = {
  email: string;
  name: string;
  photo?: string | null;
  notifications?: boolean;
  simpleMode?: boolean;
};

type AuthStore = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  recoverPassword: (email: string) => Promise<boolean>;
  updatePassword: (current: string, next: string) => Promise<boolean>;
  checkSession: () => Promise<void>;
  clearError: () => void;

  // función para actualizar datos del perfil
  updateProfile: (data: Partial<AuthUser>) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,

  checkSession: async () => {
    const hasSession = await container.checkSessionUseCase.execute();
    if (hasSession) set({ isAuthenticated: true });
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await container.loginUseCase.execute({ email, password });
      set({ isAuthenticated: true, isLoading: false, user: { email, name: email.split('@')[0] } });
    } catch (e: any) {
      set({ isLoading: false, error: e?.message ?? 'Usuario o contraseña incorrectos' });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const user = await container.registerUseCase.execute(data);
      set({
        isLoading: false,
        user: { email: user.email, name: `${user.name} ${user.lastName}` },
      });
    } catch (e: any) {
      set({ isLoading: false, error: e?.message ?? 'Error al registrar usuario' });
    }
  },

  recoverPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await container.recoverPasswordUseCase.execute(email);
      set({ isLoading: false });
      return true;
    } catch (e: any) {
      set({ isLoading: false, error: e?.message ?? 'Error al enviar correo de recuperación' });
      return false;
    }
  },

  updatePassword: async (current, next) => {
    set({ isLoading: true, error: null });
    try {
      await container.updatePasswordUseCase.execute(current, next);
      set({ isLoading: false });
      return true;
    } catch (e: any) {
      set({ isLoading: false, error: e?.message ?? 'Error al actualizar contraseña' });
      return false;
    }
  },

  logout: async () => {
    set({ isAuthenticated: false, user: null });
  },

   // actualiza datos del perfil
  updateProfile: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),

  clearError: () => set({ error: null }),
}));
