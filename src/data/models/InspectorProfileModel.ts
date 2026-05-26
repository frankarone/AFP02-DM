import type { InspectorProfile, InspectorRole, PlantType } from '../../domain/entities/InspectorProfile';

export interface InspectorProfileDTO {
  id: string;
  employee_code: string; // Ejemplo: mapeando snake_case de una API
  full_name: string;
  role: string;
  assigned_plant: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export const mapProfileToEntity = (dto: InspectorProfileDTO): InspectorProfile => ({
  id: dto.id,
  employeeCode: dto.employee_code,
  fullName: dto.full_name,
  role: dto.role as InspectorRole,
  assignedPlant: dto.assigned_plant as PlantType,
  avatarUrl: dto.avatar_url,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
});