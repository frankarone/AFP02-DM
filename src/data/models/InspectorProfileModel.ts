import type { InspectorProfile, InspectorPreferences } from '../../domain/entities/InspectorProfile';

/** Modelo de respuesta del backend para preferencias del inspector */
export interface PreferencesModel {
  default_plant: string;
  default_fruit: string;
  offline_mode_enabled: boolean;
  low_data_mode_enabled: boolean;
  language: 'es' | 'en';
}

/** Modelo de respuesta del backend para el perfil del inspector */
export interface InspectorProfileModel {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  employee_code: string;
  role: string;
  assigned_area: string;
  avatar_url?: string;
  hire_date: string;
  created_at: string;
  updated_at: string;
  preferences?: PreferencesModel;
}

/**
 * Convierte el modelo del backend a la entidad de dominio
 */
export const toInspectorProfileEntity = (model: InspectorProfileModel): InspectorProfile => ({
  id: model.id,
  email: model.email,
  firstName: model.first_name,
  lastName: model.last_name,
  employeeCode: model.employee_code,
  role: model.role as any,
  assignedArea: model.assigned_area,
  avatarUrl: model.avatar_url,
  hireDate: model.hire_date,
  createdAt: model.created_at,
  updatedAt: model.updated_at,
  preferences: {
    defaultPlant: (model.preferences?.default_plant as any) || 'Planta Huaral',
    defaultFruit: (model.preferences?.default_fruit as any) || 'Mandarinas',
    offlineModeEnabled: model.preferences?.offline_mode_enabled ?? false,
    lowDataModeEnabled: model.preferences?.low_data_mode_enabled ?? false,
    language: model.preferences?.language ?? 'es',
  },
});

/**
 * Convierte la entidad de dominio al modelo para el backend
 */
export const toInspectorProfileModel = (entity: InspectorProfile): InspectorProfileModel => ({
  id: entity.id,
  email: entity.email,
  first_name: entity.firstName,
  last_name: entity.lastName,
  employee_code: entity.employeeCode,
  role: entity.role,
  assigned_area: entity.assignedArea,
  avatar_url: entity.avatarUrl,
  hire_date: entity.hireDate,
  created_at: entity.createdAt,
  updated_at: entity.updatedAt,
  preferences: {
    default_plant: entity.preferences.defaultPlant,
    default_fruit: entity.preferences.defaultFruit,
    offline_mode_enabled: entity.preferences.offlineModeEnabled,
    low_data_mode_enabled: entity.preferences.lowDataModeEnabled,
    language: entity.preferences.language,
  },
});
