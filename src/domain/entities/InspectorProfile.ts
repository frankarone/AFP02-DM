/**
 * InspectorProfile Entity
 *
 * Entidad que modela el perfil del Inspector de Control de Calidad.
 * Contiene datos personales, rol y preferencias de inspección.
 *
 * @domain Inspector de Control de Calidad - AGRIHUSA
 * @module domain/entities
 */

/**
 * Tipo de Planta/Sede disponibles
 * Definidas según estructura operativa de AGRIHUSA
 */
export type PlantType = 'Planta Huaral' | 'Almacén Central' | 'Planta Chancay';

/**
 * Tipos de Frutas que el inspector puede evaluar
 * Productos principales de AGRIHUSA
 */
export type FruitType = 'Mandarinas' | 'Paltas' | 'Naranjas' | 'Limones';

/**
 * Rol del Inspector dentro de AGRIHUSA
 */
export type InspectorRole = 'Inspector de Calidad' | 'Inspector Senior' | 'Supervisor';

/**
 * Entidad de dominio: Perfil del Inspector de Control de Calidad
 *
 * Propiedades:
 * - id: Identificador único generado por API
 * - employeeCode: Código único del empleado (ej: INS-001)
 * - fullName: Nombre completo del inspector
 * - role: Posición dentro de AGRIHUSA
 * - assignedPlant: Planta/sede asignada por defecto
 * - avatarUrl: URL de la foto de perfil (opcional)
 * - createdAt: Timestamp de creación de perfil
 * - updatedAt: Timestamp de última actualización
 */
export interface InspectorProfile {
  id: string;
  employeeCode: string;
  fullName: string;
  role: InspectorRole;
  assignedPlant: PlantType;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Entidad de dominio: Preferencias del Inspector
 *
 * Define configuraciones personales para agilizar el trabajo en campo:
 * - preferredPlant: Planta por defecto para nuevos reportes
 * - preferredFruitType: Fruta por defecto para filtrar en catálogo
 * - offlineMode: Permite trabajo sin conexión (sincroniza cuando vuelva)
 * - lowDataMode: Comprime imágenes para ahorrar datos móviles
 *
 * Estas preferencias se sincronizan entre dispositivos y se persisten localmente.
 */
export interface InspectorPreferences {
  inspectorId: string;
  preferredPlant: PlantType;
  preferredFruitType: FruitType;
  offlineMode: boolean;        // ✅ Clave para trabajo en parcelas
  lowDataMode: boolean;         // ✅ Compresión automática de imágenes
  lastSyncAt: string;           // ISO timestamp
}

/**
 * Entidad de dominio: Avatar del Inspector
 *
 * Modela la subida y gestión de foto de perfil
 */
export interface InspectorAvatar {
  inspectorId: string;
  imageUrl: string;
  uploadedAt: string;
  mimeType: string;             // "image/jpeg", "image/png"
  sizeKb: number;               // Tamaño para monitoreo de almacenamiento
}

/**
 * Tipo de respuesta de actualización de perfil
 */
export type ProfileUpdateResult =
  | { success: true; profile: InspectorProfile }
  | { success: false; error: string };

/**
 * Tipo de respuesta de subida de avatar
 */
export type AvatarUploadResult =
  | { success: true; avatarUrl: string }
  | { success: false; error: string };
