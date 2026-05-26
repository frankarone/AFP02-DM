/**
 * InspectorProfileRemoteDataSourceImpl
 *
 * Implementación del Datasource Remoto para Perfil del Inspector
 *
 * Contiene:
 * 1. InspectorProfileRemoteDataSourceImpl - Llamadas reales a API
 * 2. InspectorProfileRemoteDataSourceMock - Mock para desarrollo
 *
 * Para cambiar de Mock a Real, editar container.ts
 * @data Datasource Remoto - Implementación
 */

import type { IInspectorProfileRemoteDataSource } from './InspectorProfileRemoteDataSource';
import type {
  InspectorProfile,
  InspectorPreferences,
  InspectorAvatar,
} from '../../../domain/entities/InspectorProfile';
import { apiClient } from '../../../infrastructure/api/ApiClient';
import { ENDPOINTS } from '../../../infrastructure/api/endpoints';
import { AppError } from '../../../core/errors/AppError';

/**
 * Implementación REAL del Datasource Remoto
 * Se activa cuando la API de AGRIHUSA esté lista en producción.
 * Actualmente sin usar (Mock está activado en container.ts)
 */
export class InspectorProfileRemoteDataSourceImpl implements IInspectorProfileRemoteDataSource {
  async getProfile(): Promise<InspectorProfile> {
    try {
      return await apiClient.get<InspectorProfile>(`${ENDPOINTS.USER.PROFILE}/inspector`);
    } catch (error) {
      throw new AppError('NETWORK_ERROR', 'No se pudo cargar el perfil del servidor', 500);
    }
  }

  async updateProfile(updates: Partial<InspectorProfile>): Promise<InspectorProfile> {
    try {
      return await apiClient.put<InspectorProfile>(`${ENDPOINTS.USER.PROFILE}/inspector`, updates);
    } catch (error) {
      throw new AppError('NETWORK_ERROR', 'No se pudo actualizar el perfil', 500);
    }
  }

  async uploadAvatar(imageUri: string, mimeType: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri: imageUri,
        type: mimeType,
        name: 'avatar.jpg',
      } as unknown as Blob);

      const response = await apiClient.post<{ url: string }>(ENDPOINTS.USER.AVATAR, formData);
      return response.url;
    } catch (error) {
      throw new AppError('NETWORK_ERROR', 'No se pudo subir la imagen', 500);
    }
  }

  async getPreferences(): Promise<InspectorPreferences> {
    try {
      return await apiClient.get<InspectorPreferences>(`${ENDPOINTS.USER.PROFILE}/inspector/preferences`);
    } catch (error) {
      throw new AppError('NETWORK_ERROR', 'No se pudieron cargar las preferencias', 500);
    }
  }

  async updatePreferences(updates: Partial<InspectorPreferences>): Promise<InspectorPreferences> {
    try {
      return await apiClient.put<InspectorPreferences>(`${ENDPOINTS.USER.PROFILE}/inspector/preferences`, updates);
    } catch (error) {
      throw new AppError('NETWORK_ERROR', 'No se pudieron guardar las preferencias', 500);
    }
  }

  async getAvatar(): Promise<InspectorAvatar> {
    try {
      return await apiClient.get<InspectorAvatar>(`${ENDPOINTS.USER.AVATAR}/inspector`);
    } catch (error) {
      throw new AppError('NETWORK_ERROR', 'No se pudo cargar el avatar', 404);
    }
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🧪 MOCK PARA DESARROLLO (Sin backend)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Simula respuestas del servidor para permitir desarrollo sin API.
 * Inspector ficticio: Martín Cuadros (INS-001)
 *
 * Para cambiar a Real:
 * 1. Ir a: src/infrastructure/di/container.ts
 * 2. Cambiar: const profileRemote = new InspectorProfileRemoteDataSourceMock();
 * 3. Por: const profileRemote = new InspectorProfileRemoteDataSourceImpl();
 */
export class InspectorProfileRemoteDataSourceMock implements IInspectorProfileRemoteDataSource {
  private mockProfile: InspectorProfile = {
    id: 'inspector-1',
    employeeCode: 'INS-001',
    fullName: 'Martín Cuadros García',
    role: 'Inspector de Calidad',
    assignedPlant: 'Planta Huaral',
    avatarUrl: 'https://via.placeholder.com/150?text=MC',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: new Date().toISOString(),
  };

  private mockPreferences: InspectorPreferences = {
    inspectorId: 'inspector-1',
    preferredPlant: 'Planta Huaral',
    preferredFruitType: 'Mandarinas',
    offlineMode: false,
    lowDataMode: false,
    lastSyncAt: new Date().toISOString(),
  };

  private mockAvatar: InspectorAvatar = {
    inspectorId: 'inspector-1',
    imageUrl: 'https://via.placeholder.com/150?text=MC',
    uploadedAt: new Date().toISOString(),
    mimeType: 'image/jpeg',
    sizeKb: 48,
  };

  private delay = () => new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 100));

  async getProfile(): Promise<InspectorProfile> {
    await this.delay();
    return { ...this.mockProfile };
  }

  async updateProfile(updates: Partial<InspectorProfile>): Promise<InspectorProfile> {
    await this.delay();
    this.mockProfile = { ...this.mockProfile, ...updates, updatedAt: new Date().toISOString() };
    return { ...this.mockProfile };
  }

  async uploadAvatar(_imageUri: string, mimeType: string): Promise<string> {
    await this.delay();
    const newUrl = `https://via.placeholder.com/150?text=${Date.now()}`;
    this.mockAvatar.imageUrl = newUrl;
    this.mockAvatar.uploadedAt = new Date().toISOString();
    this.mockAvatar.mimeType = mimeType;
    return newUrl;
  }

  async getPreferences(): Promise<InspectorPreferences> {
    await this.delay();
    return { ...this.mockPreferences };
  }

  async updatePreferences(updates: Partial<InspectorPreferences>): Promise<InspectorPreferences> {
    await this.delay();
    this.mockPreferences = { ...this.mockPreferences, ...updates, lastSyncAt: new Date().toISOString() };
    return { ...this.mockPreferences };
  }

  async getAvatar(): Promise<InspectorAvatar> {
    await this.delay();
    return { ...this.mockAvatar };
  }
}
