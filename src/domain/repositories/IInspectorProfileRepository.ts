/**
 * IInspectorProfileRepository
 *
 * Contrato que define las operaciones disponibles para gestionar
 * el perfil del Inspector de Control de Calidad.
 *
 * Este es el interfaz de la capa de dominio que sera implementado
 * en la capa de datos con lógica de sincronización remote/local.
 *
 * @domain Inspector Repository - Contrato
 */

import type {
  InspectorProfile,
  InspectorPreferences,
  InspectorAvatar,
  PlantType,
  FruitType,
} from '../entities/InspectorProfile';

/**
 * Contrato del Repositorio de Perfil del Inspector
 *
 * Define todos los casos de uso que la capa de datos debe implementar.
 * Cada método es una abstracción de uno o más use cases.
 */
export interface IInspectorProfileRepository {
  /**
   * Obtiene el perfil completo del inspector autenticado
   *
   * Estrategia de sincronización:
   * 1. Intenta obtener del servidor remoto
   * 2. Si falla, usa caché local de AsyncStorage
   * 3. Si no hay caché, retorna error
   *
   * @returns Perfil del inspector actual
   * @throws AppError si no hay conexión ni caché
   *
   * @example
   * const profile = await profileRepo.getProfile();
   * console.log(profile.fullName); // "Martín Cuadros"
   */
  getProfile(): Promise<InspectorProfile>;

  /**
   * Actualiza datos del perfil del inspector
   *
   * Campos actualizables:
   * - fullName
   * - role
   * - assignedPlant
   *
   * @param updates Objeto parcial con campos a actualizar
   * @returns Perfil actualizado
   *
   * @example
   * await profileRepo.updateProfile({
   *   assignedPlant: 'Planta Chancay'
   * });
   */
  updateProfile(updates: Partial<InspectorProfile>): Promise<InspectorProfile>;

  /**
   * Sube una nueva imagen de avatar para el inspector
   *
   * Funcionalidad:
   * - Comprime imagen a 70% quality si lowDataMode está activo
   * - Convierte a JPEG automáticamente
   * - Reintenta 3 veces si hay error temporal
   *
   * @param imageUri URI local de la imagen (ej: file://...)
   * @param mimeType MIME type de la imagen
   * @returns URL donde quedó guardada la imagen
   *
   * @example
   * const avatarUrl = await profileRepo.uploadAvatar(
   *   'file:///data/image.jpg',
   *   'image/jpeg'
   * );
   */
  uploadAvatar(imageUri: string, mimeType: string): Promise<string>;

  /**
   * Obtiene las preferencias personales del inspector
   *
   * @returns Objeto con todas las preferencias guardadas
   *
   * @example
   * const prefs = await profileRepo.getPreferences();
   * console.log(prefs.preferredFruitType); // "Mandarinas"
   */
  getPreferences(): Promise<InspectorPreferences>;

  /**
   * Actualiza las preferencias del inspector
   *
   * Actualizables:
   * - preferredPlant (usada en nuevos reportes)
   * - preferredFruitType (filtro por defecto en catálogo)
   * - offlineMode (sincronización automática)
   * - lowDataMode (compresión de imágenes)
   *
   * @param updates Preferencias a actualizar
   * @returns Preferencias actualizadas
   *
   * @example
   * await profileRepo.updatePreferences({
   *   preferredFruitType: 'Paltas',
   *   offlineMode: true
   * });
   */
  updatePreferences(updates: Partial<InspectorPreferences>): Promise<InspectorPreferences>;

  /**
   * Obtiene el avatar actual del inspector
   *
   * @returns Objeto con URL y metadata del avatar
   * @throws AppError si no existe avatar
   */
  getAvatar(): Promise<InspectorAvatar>;

  /**
   * Verifica si hay cambios no sincronizados (trabajo en modo offline)
   *
   * @returns true si hay cambios pendientes de sincronizar
   *
   * @example
   * if (await profileRepo.hasPendingSync()) {
   *   showBanner('Tienes cambios sin sincronizar');
   * }
   */
  hasPendingSync(): Promise<boolean>;

  /**
   * Sincroniza manualmente los cambios locales con el servidor
   *
   * Útil cuando inspector recupera conexión en campo
   *
   * @returns true si sincronización fue exitosa
   *
   * @example
   * await profileRepo.syncWithServer();
   * showNotification('Cambios sincronizados');
   */
  syncWithServer(): Promise<boolean>;

  /**
   * Limpia el caché local de perfil
   *
   * Se ejecuta al logout o para forzar recarga desde servidor
   *
   * @example
   * await profileRepo.clearCache();
   * await profileRepo.getProfile(); // Fuerza recarga desde servidor
   */
  clearCache(): Promise<void>;
}
