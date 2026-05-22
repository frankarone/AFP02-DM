import type { IInspectorProfileRemoteDataSource } from './InspectorProfileRemoteDataSource';
import type { InspectorProfileModel } from '../../models/InspectorProfileModel';
import type { PhotoUploadResponse } from '../../models/InspectorProfileModel';
import type { UpdateInspectorProfileData } from '../../../domain/entities/InspectorProfile';
import { apiClient } from '../../../infrastructure/api/ApiClient';
import { ENDPOINTS } from '../../../infrastructure/api/endpoints';

/**
 * Implementación real del datasource remoto para InspectorProfile
 * Se conecta con la API REST del backend
 */
export class InspectorProfileRemoteDataSourceImpl implements IInspectorProfileRemoteDataSource {
  async getProfile(): Promise<InspectorProfileModel> {
    return apiClient.get<InspectorProfileModel>(ENDPOINTS.USER.PROFILE);
  }

  async updateProfile(data: UpdateInspectorProfileData): Promise<InspectorProfileModel> {
    return apiClient.put<InspectorProfileModel>(ENDPOINTS.USER.PROFILE, data);
  }

  async uploadAvatar(photoUri: string): Promise<PhotoUploadResponse> {
    // Crear FormData para enviar la imagen
    const formData = new FormData();
    formData.append('avatar', {
      uri: photoUri,
      type: 'image/jpeg',
      name: `avatar_${Date.now()}.jpg`,
    } as any);

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${ENDPOINTS.USER.AVATAR}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${await this.getToken()}`,
      },
    });

    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  }

  async updatePreferences(preferences: any): Promise<InspectorProfileModel> {
    return apiClient.put<InspectorProfileModel>(`${ENDPOINTS.USER.PROFILE}/preferences`, { preferences });
  }

  private async getToken(): Promise<string> {
    // Placeholder - obtendría del SecureStorage
    return 'token';
  }
}

/**
 * Mock del datasource remoto para desarrollo sin backend
 * Simula respuestas reales del servidor
 */
export class InspectorProfileRemoteDataSourceMock implements IInspectorProfileRemoteDataSource {
  private mockProfile: InspectorProfileModel = {
    id: 'inspector-001',
    email: 'martin.cuadros@agrihusa.com.pe',
    first_name: 'Martín',
    last_name: 'Cuadros Mañuico',
    employee_code: 'INS-001',
    role: 'Inspector de Calidad',
    assigned_area: 'Almacén Central',
    avatar_url: 'https://via.placeholder.com/150',
    hire_date: '2023-01-15',
    created_at: '2023-01-15T10:30:00Z',
    updated_at: new Date().toISOString(),
    preferences: {
      default_plant: 'Planta Huaral',
      default_fruit: 'Paltas',
      offline_mode_enabled: true,
      low_data_mode_enabled: false,
      language: 'es',
    },
  };

  async getProfile(): Promise<InspectorProfileModel> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.mockProfile), 500);
    });
  }

  async updateProfile(data: UpdateInspectorProfileData): Promise<InspectorProfileModel> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.firstName) this.mockProfile.first_name = data.firstName;
        if (data.lastName) this.mockProfile.last_name = data.lastName;
        if (data.avatarUrl) this.mockProfile.avatar_url = data.avatarUrl;
        this.mockProfile.updated_at = new Date().toISOString();
        resolve(this.mockProfile);
      }, 500);
    });
  }

  async uploadAvatar(photoUri: string): Promise<PhotoUploadResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockProfile.avatar_url = photoUri;
        resolve({
          success: true,
          url: photoUri,
          message: 'Avatar uploaded successfully',
        });
      }, 1000);
    });
  }

  async updatePreferences(preferences: any): Promise<InspectorProfileModel> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockProfile.preferences = {
          ...this.mockProfile.preferences,
          ...preferences,
        };
        this.mockProfile.updated_at = new Date().toISOString();
        resolve(this.mockProfile);
      }, 500);
    });
  }
}
