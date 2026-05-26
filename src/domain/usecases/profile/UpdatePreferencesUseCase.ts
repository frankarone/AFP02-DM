/**
 * UpdatePreferencesUseCase
 *
 * Caso de uso: Actualizar preferencias del inspector
 *
 * Responsabilidades:
 * 1. Validar preferencias con Zod
 * 2. Guardar cambios en servidor y caché local
 * 3. Sincronizar preferencias entre dispositivos
 * 4. Logging de cambios para auditoría
 *
 * Preferencias actualizables:
 * - preferredPlant: "Planta Huaral" | "Almacén Central" | "Planta Chancay"
 * - preferredFruitType: "Mandarinas" | "Paltas" | "Naranjas" | "Limones"
 * - offlineMode: boolean (permite trabajo sin conexión)
 * - lowDataMode: boolean (comprime imágenes automáticamente)
 */

import { z } from 'zod';
import type { IInspectorProfileRepository } from '../../repositories/IInspectorProfileRepository';
import type { InspectorPreferences } from '../../entities/InspectorProfile';
import { AppError } from '../../../core/errors/AppError';

/**
 * Validador Zod para actualización de preferencias
 *
 * Todos los campos son opcionales (actualización parcial)
 * pero si se proporcionan, deben ser válidos.
 */
const UpdatePreferencesSchema = z.object({
  preferredPlant: z.enum(['Planta Huaral', 'Almacén Central', 'Planta Chancay']).optional(),
  preferredFruitType: z.enum(['Mandarinas', 'Paltas', 'Naranjas', 'Limones']).optional(),
  offlineMode: z.boolean().optional(),
  lowDataMode: z.boolean().optional(),
}).strict();

type UpdatePreferencesInput = z.infer<typeof UpdatePreferencesSchema>;

/**
 * Use case para actualizar preferencias del inspector
 */
export class UpdatePreferencesUseCase {
  constructor(private readonly profileRepository: IInspectorProfileRepository) {}

  async execute(updates: UpdatePreferencesInput): Promise<InspectorPreferences> {
    try {
      const validatedUpdates = UpdatePreferencesSchema.parse(updates);

      const preferences = await this.profileRepository.updatePreferences(validatedUpdates);

      console.log('[UpdatePreferences] Cambios realizados:');

      if (validatedUpdates.preferredPlant) {
        console.log(`  - Planta: ${validatedUpdates.preferredPlant}`);
      }
      if (validatedUpdates.preferredFruitType) {
        console.log(`  - Fruta: ${validatedUpdates.preferredFruitType}`);
      }
      if (validatedUpdates.offlineMode !== undefined) {
        console.log(`  - Modo Offline: ${validatedUpdates.offlineMode ? 'ACTIVADO' : 'DESACTIVADO'}`);
      }
      if (validatedUpdates.lowDataMode !== undefined) {
        console.log(`  - Ahorro de Datos: ${validatedUpdates.lowDataMode ? 'ACTIVADO' : 'DESACTIVADO'}`);
      }

      return preferences;
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