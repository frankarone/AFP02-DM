import type { InspectorProfile } from '../../../domain/entities/InspectorProfile';

export interface IInspectorProfileLocalDataSource {
  /**
   * Guarda el perfil completo localmente (caché)
   */
  saveProfile(profile: InspectorProfile): Promise<void>;

  /**
   * Obtiene el perfil del caché local
   */
  getProfile(): Promise<InspectorProfile | null>;

  /**
   * Guarda preferencias localmente
   */
  savePreferences(preferences: InspectorProfile['preferences']): Promise<void>;

  /**
   * Obtiene preferencias del almacenamiento local
   */
  getPreferences(): Promise<InspectorProfile['preferences'] | null>;

  /**
   * Limpia el caché local (logout)
   */
  clearCache(): Promise<void>;
}
