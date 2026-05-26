/**
 * IInspectorProfileLocalDataSource
 *
 * Interfaz que define las operaciones locales (AsyncStorage)
 * para caché del perfil del inspector.
 *
 * Esta capa permite:
 * 1. Trabajar sin conexión (offline-first)
 * 2. Reducir latencia (caché rápido)
 * 3. Sincronizar cambios cuando recupere conexión
 *
 * @data Datasource Local - Contrato
 */

import type {
  InspectorProfile,
  InspectorPreferences,
  InspectorAvatar,
} from '../../../domain/entities/InspectorProfile';

/**
 * Contrato del Datasource Local de Perfil del Inspector
 *
 * Implementación: AsyncStorage (persistent key-value store)
 *
 * Claves usadas:
 * - inspector_profile_{inspectorId} → InspectorProfile
 * - inspector_preferences_{inspectorId} → InspectorPreferences
 * - inspector_avatar_{inspectorId} → InspectorAvatar
 * - inspector_sync_queue → Array<PendingSync> (cambios offline)
 */
export interface IInspectorProfileLocalDataSource {
  /**
   * Obtiene perfil del caché local
   *
   * @returns Perfil guardado o null si no existe
   */
  getProfile(): Promise<InspectorProfile | null>;

  /**
   * Guarda perfil en caché local
   *
   * @param profile Perfil a guardar
   */
  saveProfile(profile: InspectorProfile): Promise<void>;

  /**
   * Obtiene preferencias del caché local
   *
   * @returns Preferencias guardadas o null
   */
  getPreferences(): Promise<InspectorPreferences | null>;

  /**
   * Guarda preferencias en caché local
   *
   * @param preferences Preferencias a guardar
   */
  savePreferences(preferences: InspectorPreferences): Promise<void>;

  /**
   * Obtiene avatar del caché local
   *
   * @returns Avatar guardado o null
   */
  getAvatar(): Promise<InspectorAvatar | null>;

  /**
   * Guarda avatar en caché local
   *
   * @param avatar Avatar a guardar
   */
  saveAvatar(avatar: InspectorAvatar): Promise<void>;

  /**
   * Verifica si hay cambios pendientes de sincronizar
   *
   * En modo offline, los cambios se guardan localmente
   * y se marcan como "pending sync".
   *
   * @returns true si hay cambios sin sincronizar
   */
  hasPendingSync(): Promise<boolean>;

  /**
   * Limpia el caché completamente
   *
   * Se ejecuta al logout
   */
  clearCache(): Promise<void>;

  /**
   * Obtiene timestamp de última sincronización exitosa
   *
   * @returns ISO timestamp o null si nunca se sincronizó
   */
  getLastSyncTime(): Promise<string | null>;

  /**
   * Guarda timestamp de sincronización
   *
   * @param timestamp ISO timestamp
   */
  setLastSyncTime(timestamp: string): Promise<void>;
}
