import type { InspectorProfile, UpdateInspectorProfileData, PhotoUploadResponse } from '../entities/InspectorProfile';

export interface IInspectorProfileRepository {
  /**
   * Obtiene el perfil completo del inspector autenticado
   */
  getProfile(): Promise<InspectorProfile>;

  /**
   * Actualiza datos básicos del perfil del inspector
   */
  updateProfile(data: UpdateInspectorProfileData): Promise<InspectorProfile>;

  /**
   * Sube y actualiza la foto de perfil del inspector
   * @param photoUri - URI local de la foto (ej: file:///data/...)
   */
  uploadAvatar(photoUri: string): Promise<PhotoUploadResponse>;

  /**
   * Obtiene las preferencias guardadas localmente
   */
  getPreferencesLocal(): Promise<InspectorProfile['preferences'] | null>;

  /**
   * Guarda preferencias de forma local y sincroniza con servidor
   */
  savePreferences(preferences: Partial<InspectorProfile['preferences']>): Promise<InspectorProfile['preferences']>;

  /**
   * Sincroniza datos del perfil con el servidor (para modo offline)
   */
  syncProfile(): Promise<void>;
}
