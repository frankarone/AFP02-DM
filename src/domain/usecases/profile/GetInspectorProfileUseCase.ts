/**
 * GetInspectorProfileUseCase
 *
 * Caso de uso: Obtener perfil del inspector autenticado
 *
 * Responsabilidades:
 * 1. Solicitar el perfil al repositorio
 * 2. Manejo de errores de conexión
 * 3. Logging de operación para auditoría
 *
 * @domain Perfil del Inspector
 * @usecase Lectura de perfil
 */

import type { IInspectorProfileRepository } from '../../repositories/IInspectorProfileRepository';
import type { InspectorProfile } from '../../entities/InspectorProfile';
import { AppError } from '../../../core/errors/AppError';

/**
 * Use case para obtener el perfil del inspector
 *
 * Flujo:
 * 1. Constructor: recibe el repositorio inyectado
 * 2. execute(): llama a repositorio.getProfile()
 * 3. Retorna perfil o lanza AppError
 *
 * @example
 * const useCase = new GetInspectorProfileUseCase(profileRepository);
 * const profile = await useCase.execute();
 * // profile = { id: '1', fullName: 'Martín Cuadros', ... }
 */
export class GetInspectorProfileUseCase {
  constructor(private readonly profileRepository: IInspectorProfileRepository) {}

  /**
   * Ejecuta el caso de uso
   *
   * @returns Perfil del inspector actual
   * @throws AppError si no hay conexión ni caché disponible
   */
  async execute(): Promise<InspectorProfile> {
    try {
      // 📡 Delega al repositorio (que maneja remote/local automáticamente)
      const profile = await this.profileRepository.getProfile();

      // ✅ Logging para auditoría (opcional)
      console.log(`[GetInspectorProfile] Perfil cargado: ${profile.employeeCode}`);

      return profile;
    } catch (error) {
      // ❌ Re-lanza como AppError para manejo uniforme
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        'UNKNOWN_ERROR',
        'No se pudo cargar el perfil del inspector',
        500,
      );
    }
  }
}
