import type { InspectorProfileModel, PhotoUploadResponse } from '../../models/InspectorProfileModel';
import type { UpdateInspectorProfileData } from '../../../domain/entities/InspectorProfile';

export interface IInspectorProfileRemoteDataSource {
  /**
   * Obtiene el perfil del inspector del servidor
   */
  getProfile(): Promise<InspectorProfileModel>;

  /**
   * Actualiza datos del perfil en el servidor
   */
  updateProfile(data: UpdateInspectorProfileData): Promise<InspectorProfileModel>;

  /**
   * Sube foto de perfil al servidor
   * @param photoUri - URI local de la foto
   */
  uploadAvatar(photoUri: string): Promise<PhotoUploadResponse>;

  /**
   * Actualiza las preferencias en el servidor
   */
  updatePreferences(preferences: any): Promise<InspectorProfileModel>;
}
