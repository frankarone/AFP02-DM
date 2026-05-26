/**
 * IInspectorProfileRemoteDataSource
 *
 * Interfaz que define las operaciones remotas (API) para
 * gestionar el perfil del inspector.
 *
 * Esta capa abstrae la comunicación con el servidor,
 * permitiendo mock fácil para desarrollo sin backend.
 */

import type {
  InspectorProfile,
  InspectorPreferences,
  InspectorAvatar,
} from '../../../domain/entities/InspectorProfile';

/**
 * Contrato del Datasource Remoto de Perfil del Inspector
 *
 * Cada método representa una llamada HTTP a la API
 */
export interface IInspectorProfileRemoteDataSource {
  /**
   * GET /api/inspector/profile
   * Obtiene el perfil completo del inspector autenticado
   */
  getProfile(): Promise<InspectorProfile>;

  /**
   * PUT /api/inspector/profile
   * Actualiza datos del perfil (nombre, planta asignada, etc)
   */
  updateProfile(updates: Partial<InspectorProfile>): Promise<InspectorProfile>;

  /**
   * POST /api/inspector/avatar
   * Sube una nueva imagen de avatar (multipart/form-data)
   *
   * @param imageUri URI local de la imagen
   * @param mimeType Tipo MIME (image/jpeg, image/png)
   * @returns URL donde quedó guardada la imagen
   */
  uploadAvatar(imageUri: string, mimeType: string): Promise<string>;

  /**
   * GET /api/inspector/preferences
   * Obtiene las preferencias guardadas
   */
  getPreferences(): Promise<InspectorPreferences>;

  /**
   * PUT /api/inspector/preferences
   * Actualiza las preferencias del inspector
   */
  updatePreferences(
    updates: Partial<InspectorPreferences>,
  ): Promise<InspectorPreferences>;

  /**
   * GET /api/inspector/avatar
   * Obtiene metadata del avatar actual
   */
  getAvatar(): Promise<InspectorAvatar>;
}
