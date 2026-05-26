/**
 * UpdateInspectorProfileUseCase
 *
 * Caso de uso: Actualizar datos del perfil del inspector
 *
 * Responsabilidades:
 * 1. Validar los datos a actualizar con Zod
 * 2. Llamar al repositorio para guardar cambios
 * 3. Manejo de errores de validación y conexión
 * 4. Logging de cambios realizados
 */

import { z, ZodError } from 'zod';
import type { IInspectorProfileRepository } from '../../repositories/IInspectorProfileRepository';
import type { InspectorProfile, PlantType } from '../../entities/InspectorProfile';
import { AppError } from '../../../core/errors/AppError';


/**
 * Validador Zod para actualizaciones de perfil
 *
 * Define qué campos son actualizables y sus restricciones:
 * - fullName: string de 2-100 caracteres
 * - assignedPlant: debe ser uno de los valores permitidos
 */
const UpdateProfileSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  assignedPlant: z.enum(['Planta Huaral', 'Almacén Central', 'Planta Chancay'] as [PlantType, PlantType, PlantType]).optional(),
}).strict();

type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

/**
 * Use case para actualizar el perfil del inspector
 */
export class UpdateInspectorProfileUseCase {
  constructor(private readonly profileRepository: IInspectorProfileRepository) {}

  async execute(updates: UpdateProfileInput): Promise<InspectorProfile> {
    try {
      const validatedUpdates = UpdateProfileSchema.parse(updates);

      const updated = await this.profileRepository.updateProfile(validatedUpdates);

      console.log(`[UpdateProfile] Cambios guardados para: ${updated.employeeCode}`);
      console.log('[UpdateProfile] Cambios:', JSON.stringify(validatedUpdates));

      return updated;
    } catch (error) {
            if (error instanceof z.ZodError) {
        const messages = error.issues
            .map((e) => `${e.path.join('.')}: ${e.message}`)
            .join(', ');
        throw new AppError('VALIDATION_ERROR', `Datos inválidos: ${messages}`, 400);
        }
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('UNKNOWN_ERROR', 'No se pudo actualizar el perfil', 500);
    }
  }
}