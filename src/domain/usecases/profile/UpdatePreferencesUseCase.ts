import type { IInspectorProfileRepository } from '../../repositories/IInspectorProfileRepository';
import type { InspectorProfile } from '../entities/InspectorProfile';

/**
 * Use Case: Actualizar preferencias del inspector
 * - Permite configuración de:
 *   * Planta/Sede por defecto
 *   * Tipo de fruta a evaluar por defecto
 *   * Modo offline
 *   * Modo de bajo consumo de datos
 * - Guarda localmente y sincroniza con servidor
 * - Mantiene funcionamiento incluso sin conexión
 */
export class UpdatePreferencesUseCase {
  constructor(private readonly profileRepository: IInspectorProfileRepository) {}

  async execute(
    preferences: Partial<InspectorProfile['preferences']>,
  ): Promise<InspectorProfile['preferences']> {
    // Validación: al menos una preferencia debe estar presente
    if (!preferences || Object.keys(preferences).length === 0) {
      throw new Error('At least one preference must be provided');
    }

    // Validación de tipos enum
    if (preferences.defaultPlant) {
      const validPlants = ['Planta Huaral', 'Almacén Central', 'Centro de Acopio', 'Planta Procesamiento'];
      if (!validPlants.includes(preferences.defaultPlant)) {
        throw new Error(`Invalid plant: ${preferences.defaultPlant}`);
      }
    }

    if (preferences.defaultFruit) {
      const validFruits = ['Mandarinas', 'Paltas', 'Naranjas', 'Limones', 'Granadillas'];
      if (!validFruits.includes(preferences.defaultFruit)) {
        throw new Error(`Invalid fruit type: ${preferences.defaultFruit}`);
      }
    }

    if (preferences.language) {
      if (!['es', 'en'].includes(preferences.language)) {
        throw new Error(`Invalid language: ${preferences.language}`);
      }
    }

    return this.profileRepository.savePreferences(preferences);
  }
}
