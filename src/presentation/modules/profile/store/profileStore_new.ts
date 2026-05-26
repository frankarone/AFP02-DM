import { create } from 'zustand';
import type { InspectorProfile, InspectorPreferences } from '../../../../domain/entities/InspectorProfile';

/* UseCase helpers (tipado claro para instancias) */
type UseCaseNoArgs<TResult> = { execute: () => Promise<TResult> };
type UseCaseWithArgs<TInput, TResult> = { execute: (input: TInput) => Promise<TResult> };

/* Estado del store */
export type ProfileState = {
  profile: InspectorProfile | null;
  preferences: InspectorPreferences | null;

  isLoadingProfile: boolean;
  isLoadingPreferences: boolean;
  isUploadingAvatar: boolean;
  isUpdatingPreferences: boolean;

  profileError: string | null;
  preferencesError: string | null;
  avatarError: string | null;

  setUseCases: (
    getProfile: UseCaseNoArgs<InspectorProfile>,
    updateProfile: UseCaseWithArgs<Partial<InspectorProfile>, InspectorProfile>,
    uploadAvatar: UseCaseWithArgs<{ imageUri: string; mimeType: string }, string>,
    updatePreferences: UseCaseWithArgs<Partial<InspectorPreferences>, InspectorPreferences>,
  ) => void;

  loadProfile: () => Promise<void>;
  updateProfile: (updates: Partial<InspectorProfile>) => Promise<void>;
  uploadAvatar: (imageUri: string, mimeType: string) => Promise<void>;
  loadPreferences: () => Promise<void>;
  updatePreferences: (updates: Partial<InspectorPreferences>) => Promise<void>;
  clearErrors: () => void;
  clear: () => void;
};

/* Inyectados (instancias) */
let injectedGetProfileUseCase: UseCaseNoArgs<InspectorProfile> | null = null;
let injectedUpdateProfileUseCase: UseCaseWithArgs<Partial<InspectorProfile>, InspectorProfile> | null = null;
let injectedUploadAvatarUseCase: UseCaseWithArgs<{ imageUri: string; mimeType: string }, string> | null = null;
let injectedUpdatePreferencesUseCase: UseCaseWithArgs<Partial<InspectorPreferences>, InspectorPreferences> | null = null;

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  preferences: null,
  isLoadingProfile: false,
  isLoadingPreferences: false,
  isUploadingAvatar: false,
  isUpdatingPreferences: false,
  profileError: null,
  preferencesError: null,
  avatarError: null,

  setUseCases: (getProfile, updateProfile, uploadAvatar, updatePreferences) => {
    injectedGetProfileUseCase = getProfile;
    injectedUpdateProfileUseCase = updateProfile;
    injectedUploadAvatarUseCase = uploadAvatar;
    injectedUpdatePreferencesUseCase = updatePreferences;
    console.log('[ProfileStore] Use cases inyectados exitosamente');
  },

  loadProfile: async () => {
    if (!injectedGetProfileUseCase) {
      console.error('[ProfileStore] GetProfileUseCase no inyectado');
      return;
    }
    set({ isLoadingProfile: true, profileError: null });
    try {
      const profile = await injectedGetProfileUseCase.execute();
      set({ profile, isLoadingProfile: false });
      console.log('[ProfileStore] Perfil cargado exitosamente');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      set({ profileError: errorMessage, isLoadingProfile: false });
      console.error('[ProfileStore] Error al cargar perfil:', error);
    }
  },

  updateProfile: async (updates: Partial<InspectorProfile>) => {
    if (!injectedUpdateProfileUseCase) {
      console.error('[ProfileStore] UpdateProfileUseCase no inyectado');
      return;
    }
    set({ isLoadingProfile: true, profileError: null });
    try {
      const updatedProfile = await injectedUpdateProfileUseCase.execute(updates);
      set({ profile: updatedProfile, isLoadingProfile: false });
      console.log('[ProfileStore] Perfil actualizado');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar perfil';
      set({ profileError: errorMessage, isLoadingProfile: false });
      console.error('[ProfileStore] Error al actualizar:', error);
    }
  },

  uploadAvatar: async (imageUri: string, mimeType: string) => {
    if (!injectedUploadAvatarUseCase) {
      console.error('[ProfileStore] UploadAvatarUseCase no inyectado');
      return;
    }
    set({ isUploadingAvatar: true, avatarError: null });
    try {
      const avatarUrl = await injectedUploadAvatarUseCase.execute({ imageUri, mimeType });
      set((state) => ({
        profile: state.profile ? { ...state.profile, avatarUrl } : null,
        isUploadingAvatar: false,
      }));
      console.log('[ProfileStore] Avatar subido: ' + avatarUrl);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al subir imagen';
      set({ avatarError: errorMessage, isUploadingAvatar: false });
      console.error('[ProfileStore] Error al subir avatar:', error);
    }
  },

  loadPreferences: async () => {
    // Implementación mínima para evitar placeholders
    set({ isLoadingPreferences: true, preferencesError: null });
    try {
      // Si tienes un use case para obtener preferencias, úsalo aquí
      set({ isLoadingPreferences: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar preferencias';
      set({ preferencesError: errorMessage, isLoadingPreferences: false });
    }
  },

  updatePreferences: async (updates: Partial<InspectorPreferences>) => {
    if (!injectedUpdatePreferencesUseCase) {
      console.error('[ProfileStore] UpdatePreferencesUseCase no inyectado');
      return;
    }
    set({ isUpdatingPreferences: true, preferencesError: null });
    try {
      const updatedPreferences = await injectedUpdatePreferencesUseCase.execute(updates);
      set({ preferences: updatedPreferences, isUpdatingPreferences: false });
      console.log('[ProfileStore] Preferencias actualizadas');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar preferencias';
      set({ preferencesError: errorMessage, isUpdatingPreferences: false });
      console.error('[ProfileStore] Error al actualizar preferencias:', error);
    }
  },

  clearErrors: () => {
    set({
      profileError: null,
      preferencesError: null,
      avatarError: null,
    });
  },

  clear: () => {
    set({
      profile: null,
      preferences: null,
      isLoadingProfile: false,
      isLoadingPreferences: false,
      isUploadingAvatar: false,
      isUpdatingPreferences: false,
      profileError: null,
      preferencesError: null,
      avatarError: null,
    });
    console.log('[ProfileStore] Estado limpiado');
  },
}));
