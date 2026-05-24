import type { IInspectorProfileRepository } from '../../domain/repositories/IInspectorProfileRepository';
import type { IInspectorProfileRemoteDataSource } from '../datasources/remote/InspectorProfileRemoteDataSource';
import type { IInspectorProfileLocalDataSource } from '../datasources/local/InspectorProfileLocalDataSource';
import { toInspectorProfileEntity } from '../models/InspectorProfileModel';
import type { InspectorProfile, UpdateInspectorProfileData, PhotoUploadResponse } from '../../domain/entities/InspectorProfile';

/**
 * Implementación del repositorio de InspectorProfile
 * Orquesta entre datasources local (caché) y remoto (servidor)
 * Implementa patrón de fallback: intenta remoto, cae a local si falla
 */
export class InspectorProfileRepositoryImpl implements IInspectorProfileRepository {
  constructor(
    private readonly remote: IInspectorProfileRemoteDataSource,
    private readonly local: IInspectorProfileLocalDataSource,
  ) {}

  async getProfile(): Promise<InspectorProfile> {
    try {
      // Intenta obtener del servidor primero
      const model = await this.remote.getProfile();
      const entity = toInspectorProfileEntity(model);

      // Guarda en caché local
      await this.local.saveProfile(entity);

      return entity;
    } catch (error) {
      // Si falla, intenta del caché local
      console.warn('Failed to fetch profile from remote, trying local cache:', error);
      const cachedProfile = await this.local.getProfile();

      if (cachedProfile) {
        return cachedProfile;
      }

      // Si tampoco hay caché, lanza error
      throw new Error('Unable to fetch profile from remote or local storage');
    }
  }

  async updateProfile(data: UpdateInspectorProfileData): Promise<InspectorProfile> {
    try {
      // Intenta actualizar en el servidor
      const model = await this.remote.updateProfile(data);
      const entity = toInspectorProfileEntity(model);

      // Actualiza caché local
      await this.local.saveProfile(entity);

      return entity;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }

  async uploadAvatar(photoUri: string): Promise<PhotoUploadResponse> {
    try {
      // Sube la foto al servidor
      const response = await this.remote.uploadAvatar(photoUri);

      // Si es exitoso, obtiene el perfil actualizado
      if (response.success) {
        await this.getProfile();
      }

      return response;
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      throw error;
    }
  }

  async getPreferencesLocal(): Promise<InspectorProfile['preferences'] | null> {
    return this.local.getPreferences();
  }

  async savePreferences(
    preferences: Partial<InspectorProfile['preferences']>,
  ): Promise<InspectorProfile['preferences']> {
    try {
      // Obtiene preferencias actuales
      const current = await this.local.getPreferences();
      const profile = await this.local.getProfile();

      // Fusiona con nuevas preferencias
      const updated = {
        ...current,
        ...profile?.preferences,
        ...preferences,
      };

      // Guarda localmente
      await this.local.savePreferences(updated);

      // Intenta sincronizar con servidor
      try {
        await this.remote.updatePreferences(updated);
      } catch (error) {
        // Si falla la sincronización, al menos guardó localmente
        console.warn('Failed to sync preferences with server, but saved locally:', error);
      }

      return updated;
    } catch (error) {
      console.error('Failed to save preferences:', error);
      throw error;
    }
  }

  async syncProfile(): Promise<void> {
    try {
      // Obtiene el perfil más actualizado del servidor
      await this.getProfile();
    } catch (error) {
      console.error('Failed to sync profile:', error);
      throw error;
    }
  }
}
