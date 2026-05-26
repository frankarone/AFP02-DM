/**
 * InspectorProfileLocalDataSourceImpl
 *
 * Implementación del Datasource Local para caché del perfil.
 *
 * Utiliza AsyncStorage (persistent key-value store) para:
 * 1. Caché de perfil (acceso rápido sin red)
 * 2. Preferencias del inspector (offline-first)
 * 3. Cola de sincronización (cambios offline)
 * 4. Timestamp de última sincronización
 *
 * @data Datasource Local - Implementación
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IInspectorProfileLocalDataSource } from './InspectorProfileLocalDataSource';
import type {
  InspectorProfile,
  InspectorPreferences,
  InspectorAvatar,
} from '../../../domain/entities/InspectorProfile';
import { AppError } from '../../../core/errors/AppError';

const STORAGE_PREFIX = 'profile';

const STORAGE_KEYS = {
  PROFILE: `${STORAGE_PREFIX}:inspector:profile`,
  PREFERENCES: `${STORAGE_PREFIX}:inspector:preferences`,
  AVATAR: `${STORAGE_PREFIX}:inspector:avatar`,
  SYNC_TIME: `${STORAGE_PREFIX}:inspector:sync_time`,
  PENDING_SYNC: `${STORAGE_PREFIX}:inspector:pending_sync`,
} as const;

/**
 * Implementación del Datasource Local usando AsyncStorage
 */
export class InspectorProfileLocalDataSourceImpl implements IInspectorProfileLocalDataSource {
  /**
   * Obtiene el perfil del caché local
   */
  async getProfile(): Promise<InspectorProfile | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!data) {
        console.log('[LocalStorage] Profile no encontrado en caché');
        return null;
      }

      const profile = JSON.parse(data) as InspectorProfile;
      console.log(`[LocalStorage] Profile cargado: ${profile.employeeCode}`);
      return profile;
    } catch (error) {
      console.error('[LocalStorage] Error al leer perfil:', error);
      return null;
    }
  }

  /**
   * Guarda el perfil en caché local
   */
  async saveProfile(profile: InspectorProfile): Promise<void> {
    try {
      const data = JSON.stringify(profile);
      await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, data);
      console.log(`[LocalStorage] Profile guardado: ${profile.employeeCode}`);
    } catch (error) {
      console.error('[LocalStorage] Error al guardar perfil:', error);
      throw new AppError(
        'UNKNOWN_ERROR',
        'No se pudo guardar el perfil localmente',
        500,
      );
    }
  }

  /**
   * Obtiene las preferencias del caché local
   */
  async getPreferences(): Promise<InspectorPreferences | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (!data) {
        console.log('[LocalStorage] Preferences no encontradas en caché');
        return null;
      }

      const preferences = JSON.parse(data) as InspectorPreferences;
      console.log('[LocalStorage] Preferences cargadas');
      return preferences;
    } catch (error) {
      console.error('[LocalStorage] Error al leer preferencias:', error);
      return null;
    }
  }

  /**
   * Guarda las preferencias en caché local
   */
  async savePreferences(preferences: InspectorPreferences): Promise<void> {
    try {
      const data = JSON.stringify(preferences);
      await AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, data);
      console.log('[LocalStorage] Preferences guardadas');

      await this.markPendingSync();
    } catch (error) {
      console.error('[LocalStorage] Error al guardar preferencias:', error);
      throw new AppError(
        'UNKNOWN_ERROR',
        'No se pudieron guardar las preferencias localmente',
        500,
      );
    }
  }

  /**
   * Obtiene el avatar del caché local
   */
  async getAvatar(): Promise<InspectorAvatar | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.AVATAR);
      if (!data) {
        console.log('[LocalStorage] Avatar no encontrado en caché');
        return null;
      }

      const avatar = JSON.parse(data) as InspectorAvatar;
      console.log('[LocalStorage] Avatar cargado');
      return avatar;
    } catch (error) {
      console.error('[LocalStorage] Error al leer avatar:', error);
      return null;
    }
  }

  /**
   * Guarda el avatar en caché local
   */
  async saveAvatar(avatar: InspectorAvatar): Promise<void> {
    try {
      const data = JSON.stringify(avatar);
      await AsyncStorage.setItem(STORAGE_KEYS.AVATAR, data);
      console.log('[LocalStorage] Avatar guardado');

      await this.markPendingSync();
    } catch (error) {
      console.error('[LocalStorage] Error al guardar avatar:', error);
      throw new AppError(
        'UNKNOWN_ERROR',
        'No se pudo guardar el avatar localmente',
        500,
      );
    }
  }

  /**
   * Verifica si hay cambios pendientes de sincronizar
   */
  async hasPendingSync(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.PENDING_SYNC);
      return value === 'true';
    } catch (error) {
      console.error('[LocalStorage] Error al verificar sync pendiente:', error);
      return false;
    }
  }

  /**
   * Marca como que hay cambios pendientes de sincronizar
   */
  private async markPendingSync(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PENDING_SYNC, 'true');
    } catch (error) {
      console.error('[LocalStorage] Error al marcar sync pendiente:', error);
    }
  }

  /**
   * Limpia el caché completamente
   */
  async clearCache(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.PROFILE,
        STORAGE_KEYS.PREFERENCES,
        STORAGE_KEYS.AVATAR,
        STORAGE_KEYS.SYNC_TIME,
        STORAGE_KEYS.PENDING_SYNC,
      ]);
      console.log('[LocalStorage] Caché limpiado');
    } catch (error) {
      console.error('[LocalStorage] Error al limpiar caché:', error);
      throw new AppError(
        'UNKNOWN_ERROR',
        'No se pudo limpiar el caché',
        500,
      );
    }
  }

  /**
   * Obtiene timestamp de última sincronización exitosa
   */
  async getLastSyncTime(): Promise<string | null> {
    try {
      const timestamp = await AsyncStorage.getItem(STORAGE_KEYS.SYNC_TIME);
      return timestamp;
    } catch (error) {
      console.error('[LocalStorage] Error al leer sync time:', error);
      return null;
    }
  }

  /**
   * Guarda timestamp de sincronización
   */
  async setLastSyncTime(timestamp: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SYNC_TIME, timestamp);
      await AsyncStorage.setItem(STORAGE_KEYS.PENDING_SYNC, 'false');
      console.log(`[LocalStorage] Sync time actualizado: ${timestamp}`);
    } catch (error) {
      console.error('[LocalStorage] Error al guardar sync time:', error);
    }
  }
}
