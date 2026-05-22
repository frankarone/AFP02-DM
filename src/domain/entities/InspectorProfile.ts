/** Tipos de plantas disponibles en Agrihusa */
export type PlantType = 'Planta Huaral' | 'Almacén Central' | 'Centro de Acopio' | 'Planta Procesamiento';

/** Tipos de frutas que maneja Agrihusa */
export type FruitType = 'Mandarinas' | 'Paltas' | 'Naranjas' | 'Limones' | 'Granadillas';

/** Roles del inspector dentro de Agrihusa */
export type InspectorRole = 'Inspector de Calidad' | 'Supervisor' | 'Jefe de Turno' | 'Gerente de Calidad';

/** Preferencias del inspector para agilizar el llenado de reportes */
export interface InspectorPreferences {
  /** Planta o ubicación por defecto */
  defaultPlant: PlantType;
  /** Tipo de fruta a evaluar por defecto */
  defaultFruit: FruitType;
  /** Modo offline habilitado (guarda datos localmente) */
  offlineModeEnabled: boolean;
  /** Almacenar fotos en compresión para ahorrar datos */
  lowDataModeEnabled: boolean;
  /** Preferencia de idioma (futuro) */
  language: 'es' | 'en';
}

/** Perfil completo del inspector de control de calidad */
export interface InspectorProfile {
  /** ID único del inspector */
  id: string;
  /** Correo electrónico del inspector */
  email: string;
  /** Nombre completo */
  firstName: string;
  /** Apellido */
  lastName: string;
  /** Código único de empleado (ej: INS-001, QA-002) */
  employeeCode: string;
  /** Rol dentro de Agrihusa */
  role: InspectorRole;
  /** Área asignada (ej: Almacén, Campo, Procesamiento) */
  assignedArea: string;
  /** URL del avatar del inspector */
  avatarUrl?: string;
  /** Fecha de contratación */
  hireDate: string;
  /** Fecha de creación del perfil en el app */
  createdAt: string;
  /** Fecha de última actualización */
  updatedAt: string;
  /** Preferencias personalizadas del inspector */
  preferences: InspectorPreferences;
}

/** Datos para actualizar el perfil del inspector */
export interface UpdateInspectorProfileData {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  preferences?: Partial<InspectorPreferences>;
}

/** Modelo para respuesta de subida de foto */
export interface PhotoUploadResponse {
  success: boolean;
  url: string;
  message: string;
}
