import type { User } from '../../domain/entities/User';

export interface UserModel {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  created_at: string;
}

export const toUserEntity = (model: UserModel): User => ({
  id: model.id,
  email: model.email,
  name: model.first_name,
  lastName: model.last_name,
  avatarUrl: model.avatar_url,
  createdAt: model.created_at,
});
