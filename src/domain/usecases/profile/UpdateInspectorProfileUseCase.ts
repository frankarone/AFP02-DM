import type { IInspectorProfileRepository } from '../../repositories/IInspectorProfileRepository';
import type { InspectorProfile, UpdateInspectorProfileData } from '../entities/InspectorProfile';

/**
 * Use Case: Actualizar datos básicos del perfil del inspector
 * - Valida que al menos un campo esté presente
 * - Actualiza en el servidor
 * - Sincroniza caché local
 */
export class UpdateInspectorProfileUseCase {
  constructor(private readonly profileRepository: IInspectorProfileRepository) {}

  async execute(data: UpdateInspectorProfileData): Promise<InspectorProfile> {
    // Validación: al menos un campo debe ser actualizado
    if (!data.firstName && !data.lastName && !data.avatarUrl && !data.preferences) {
      throw new Error('At least one field must be provided for update');
    }

    return this.profileRepository.updateProfile(data);
  }
}
