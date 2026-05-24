import type { IInspectorProfileRepository } from '../../repositories/IInspectorProfileRepository';
import type { InspectorProfile } from '../entities/InspectorProfile';

/**
 * Use Case: Obtener el perfil completo del inspector autenticado
 * - Obtiene datos desde el servidor
 * - Cachea localmente para acceso offline
 * - Retorna error si no hay conexión y no hay caché
 */
export class GetInspectorProfileUseCase {
  constructor(private readonly profileRepository: IInspectorProfileRepository) {}

  async execute(): Promise<InspectorProfile> {
    return this.profileRepository.getProfile();
  }
}
