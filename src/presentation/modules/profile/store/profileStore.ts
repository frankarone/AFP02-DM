import { create } from 'zustand';
import type { InspectorProfile, PhotoUploadResponse, InspectorPreferences } from '../../../domain/entities/InspectorProfile';

/**
 * Estado global del módulo de perfil del inspector
 * Gestiona:
 * - Datos del perfil autenticado
 * - Preferencias personalizadas
 * - Estado de carga y errores
 * - Sincronización con servidor
 */
export interface ProfileStore {
  // ─── Estado ───────────────────────────────────
  profile: InspectorProfile | null;
  isLoading: boolean;
  error: string | null;
  isUpdating: boolean;
  isUploadingAvatar: boolean;

  // ─── Acciones ─────────────────────────────────
  /**
   * Carga el perfil del inspector autenticado
   */
  loadProfile: () => Promise<void>;

  /**
   * Actualiza datos básicos del perfil
   */
  updateProfile: (data: Partial<InspectorProfile>) => Promise<void>;

  /**
   * Sube una nueva foto de perfil
   */
  uploadAvatar: (photoUri: string) => Promise<PhotoUploadResponse>;

  /**
   * Actualiza las preferencias del inspector
   */
  updatePreferences: (preferences: Partial<InspectorPreferences>) => Promise<void>;

  /**
   * Sincroniza el perfil con el servidor
   */
  syncProfile: () => Promise<void>;

  /**
   * Limpia el estado (logout)
   */
  clearProfile: () => void;

  /**
   * Limpia el mensaje de error
   */
  clearError: () => void;
}

// Placeholder - se inyectará en container.ts
let profileRepository: any;

export const setProfileRepository = (repo: any) => {
  profileRepository = repo;
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,
  isUpdating: false,
  isUploadingAvatar: false,

  loadProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      if (!profileRepository) {
        throw new Error('Profile repository not initialized');
      }
      const profile = await profileRepository.getProfile();
      set({ profile, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error loading profile';
      set({ error: message, isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdating: true, error: null });
    try {
      if (!profileRepository) {
        throw new Error('Profile repository not initialized');
      }
      const updated = await profileRepository.updateProfile(data);
      set({ profile: updated, isUpdating: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error updating profile';
      set({ error: message, isUpdating: false });
      throw error;
    }
  },

  uploadAvatar: async (photoUri) => {
    set({ isUploadingAvatar: true, error: null });
    try {
      if (!profileRepository) {
        throw new Error('Profile repository not initialized');
      }
      const response = await profileRepository.uploadAvatar(photoUri);
      
      // Recarga perfil después de subir avatar
      if (response.success) {
        const profile = await profileRepository.getProfile();
        set({ profile, isUploadingAvatar: false });
      }
      
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error uploading avatar';
      set({ error: message, isUploadingAvatar: false });
      throw error;
    }
  },

  updatePreferences: async (preferences) => {
    set({ isUpdating: true, error: null });
    try {
      if (!profileRepository) {
        throw new Error('Profile repository not initialized');
      }
      
      const updated = await profileRepository.savePreferences(preferences);
      const currentProfile = get().profile;
      
      if (currentProfile) {
        set({
          profile: {
            ...currentProfile,
            preferences: updated,
          },
          isUpdating: false,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error updating preferences';
      set({ error: message, isUpdating: false });
      throw error;
    }
  },

  syncProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      if (!profileRepository) {
        throw new Error('Profile repository not initialized');
      }
      await profileRepository.syncProfile();
      
      // Recarga después de sincronizar
      const profile = await profileRepository.getProfile();
      set({ profile, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error syncing profile';
      set({ error: message, isLoading: false });
    }
  },

  clearProfile: () => {
    set({ profile: null, error: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
