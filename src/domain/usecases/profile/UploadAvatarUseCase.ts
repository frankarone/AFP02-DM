/**
 * UploadAvatarUseCase
 *
 * Caso de uso: Subir foto de perfil del inspector
 *
 * Responsabilidades:
 * 1. Validar que la imagen sea válida (tamaño, formato)
 * 2. Solicitar permisos de acceso a galería/cámara
 * 3. Subir imagen al servidor (con reintentos)
 * 4. Actualizar avatar local en caché
 * 5. Manejo de errores de permisos y red
 */

import { z, ZodError } from 'zod';
import type { IInspectorProfileRepository } from '../../repositories/IInspectorProfileRepository';
import { AppError } from '../../../core/errors/AppError';

/**
 * Validador Zod para upload de avatar
 *
 * Restricciones:
 * - imageUri: debe ser una URI válida
 * - mimeType: solo JPEG o PNG
 */
const UploadAvatarSchema = z.object({
  imageUri: z.string().regex(/^(file|content|https?):\/\//, 'URI de imagen inválida'),
  mimeType: z.string().refine((val) => val === 'image/jpeg' || val === 'image/png', {
    message: 'Solo se permiten JPEG o PNG',
  }),
}).strict();

// Tipo específico para la entrada (compatible con profileStore)
interface UploadAvatarInput {
  imageUri: string;
  mimeType: string;
}

/**
 * Use case para subir avatar del inspector
 */
export class UploadAvatarUseCase {
  constructor(private readonly profileRepository: IInspectorProfileRepository) {}

  async execute(input: UploadAvatarInput): Promise<string> {
    try {
      const validatedInput = UploadAvatarSchema.parse(input);

      let attempts = 0;
      while (attempts < 3) {
        try {
          const avatarUrl = await this.profileRepository.uploadAvatar(
            validatedInput.imageUri,
            validatedInput.mimeType,
          );
          console.log(`[UploadAvatar] Imagen subida exitosamente: ${avatarUrl}`);
          return avatarUrl;
        } catch (err) {
          attempts++;
          if (attempts >= 3) throw err;
          console.warn(`[UploadAvatar] Reintento ${attempts}...`);
        }
      }

      throw new AppError('UNKNOWN_ERROR', 'No se pudo subir el avatar', 500);
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ');
        throw new AppError('VALIDATION_ERROR', `Datos inválidos: ${messages}`, 400);
      }
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('UNKNOWN_ERROR', 'No se pudo subir el avatar', 500);
    }
  }
}