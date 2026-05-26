/**
 * InspectorProfileRepositoryImpl
 *
 * Orquestador de acceso a datos del perfil del inspector.
 * Estrategia: Remote-First con fallback local
 */

import type { IInspectorProfileRepository } from '../../domain/repositories/IInspectorProfileRepository';
import type {
  InspectorProfile,
  InspectorPreferences,
  InspectorAvatar,
} from '../../domain/entities/InspectorProfile';
import type { IInspectorProfileRemoteDataSource } from '../datasources/remote/InspectorProfileRemoteDataSource';
import type { IInspectorProfileLocalDataSource } from '../datasources/local/InspectorProfileLocalDataSource';
import { AppError } from '../../core/errors/AppError';

export class InspectorProfileRepositoryImpl implements IInspectorProfileRepository {
  constructor(
    private readonly remoteDataSource: IInspectorProfileRemoteDataSource,
    private readonly localDataSource: IInspectorProfileLocalDataSource,
  ) {}

  /** 📡 Remote-First con fallback local */
  async getProfile(): Promise<InspectorProfile> {
    try {
      const profile = await this.remoteDataSource.getProfile();
      await this.localDataSource.saveProfile(profile);
      return profile;
    } catch (error) {
      const cached = await this.localDataSource.getProfile();
      if (cached) return cached;
      throw new AppError('UNKNOWN_ERROR', 'No se pudo cargar el perfil', 500);
    }
  }

  /** 📡 Online-First con soporte offline */
  async updateProfile(updates: Partial<InspectorProfile>): Promise<InspectorProfile> {
    try {
      const updated = await this.remoteDataSource.updateProfile(updates);
      await this.localDataSource.saveProfile(updated);
      return updated;
    } catch (error) {
      const preferences = await this.localDataSource.getPreferences();
      if (preferences?.offlineMode) {
        const current = await this.localDataSource.getProfile();
        if (current) {
          const merged = { ...current, ...updates };
          await this.localDataSource.saveProfile(merged);
          return merged;
        }
      }
      throw new AppError('NETWORK_ERROR', 'No se pudo actualizar el perfil', 500);
    }
  }

  /** 📸 Upload avatar (sin fallback offline) */
  async uploadAvatar(imageUri: string, mimeType: string): Promise<string> {
    try {
      return await this.remoteDataSource.uploadAvatar(imageUri, mimeType);
    } catch (error) {
      throw new AppError('NETWORK_ERROR', 'No se pudo subir el avatar', 500);
    }
  }

  /** 📡 Remote-First con fallback local */
  async getPreferences(): Promise<InspectorPreferences> {
    try {
      const prefs = await this.remoteDataSource.getPreferences();
      await this.localDataSource.savePreferences(prefs);
      return prefs;
    } catch (error) {
      const cached = await this.localDataSource.getPreferences();
      if (cached) return cached;
      throw new AppError('UNKNOWN_ERROR', 'No se pudieron cargar las preferencias', 500);
    }
  }

  /** 📡 Online-First con soporte offline */
  async updatePreferences(updates: Partial<InspectorPreferences>): Promise<InspectorPreferences> {
    try {
      const updated = await this.remoteDataSource.updatePreferences(updates);
      await this.localDataSource.savePreferences(updated);
      return updated;
    } catch (error) {
      const current = await this.localDataSource.getPreferences();
      if (current?.offlineMode) {
        const merged = { ...current, ...updates };
        await this.localDataSource.savePreferences(merged);
        return merged;
      }
      throw new AppError('NETWORK_ERROR', 'No se pudieron guardar las preferencias', 500);
    }
  }

  /** 📡 Remote-First con fallback local */
  async getAvatar(): Promise<InspectorAvatar> {
    try {
      const avatar = await this.remoteDataSource.getAvatar();
      await this.localDataSource.saveAvatar(avatar);
      return avatar;
    } catch (error) {
      const cached = await this.localDataSource.getAvatar();
      if (cached) return cached;
      throw new AppError('NOT_FOUND', 'No se encontró avatar', 404);
    }
  }

  /** 🔄 Verifica si hay cambios pendientes */
  async hasPendingSync(): Promise<boolean> {
    return this.localDataSource.hasPendingSync();
  }

  /** 🔄 Sincroniza manualmente con el servidor */
  async syncWithServer(): Promise<boolean> {
    try {
      const profile = await this.localDataSource.getProfile();
      const prefs = await this.localDataSource.getPreferences();
      if (!profile) return false;

      await this.remoteDataSource.updateProfile({
        fullName: profile.fullName,
        assignedPlant: profile.assignedPlant,
      });

      if (prefs) {
        await this.remoteDataSource.updatePreferences({
          preferredPlant: prefs.preferredPlant,
          preferredFruitType: prefs.preferredFruitType,
          offlineMode: prefs.offlineMode,
          lowDataMode: prefs.lowDataMode,
        });
      }

      await this.localDataSource.setLastSyncTime(new Date().toISOString());
      return true;
    } catch (error) {
      return false;
    }
  }

  /** 🗑️ Limpia caché local */
  async clearCache(): Promise<void> {
    await this.localDataSource.clearCache();
  }
}
