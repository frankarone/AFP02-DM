import type { IInspectorProfileRepository } from '../../repositories/IInspectorProfileRepository';
import type { PhotoUploadResponse } from '../entities/InspectorProfile';

/**
 * Use Case: Subir foto de perfil del inspector
 * - Sube la imagen al servidor
 * - Valida que la URI sea válida
 * - Retorna URL de la imagen guardada
 */
export class UploadAvatarUseCase {
  constructor(private readonly profileRepository: IInspectorProfileRepository) {}

  async execute(photoUri: string): Promise<PhotoUploadResponse> {
    // Validación: URI debe ser válida
    if (!photoUri || photoUri.trim() === '') {
      throw new Error('Invalid photo URI provided');
    }

    // Validación: debe ser una URI local o URL válida
    if (!photoUri.startsWith('file://') && !photoUri.startsWith('http')) {
      throw new Error('Photo URI must be a valid file path or URL');
    }

    return this.profileRepository.uploadAvatar(photoUri);
  }
}
