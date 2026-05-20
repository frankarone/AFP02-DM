import type { User } from '../entities/User';

export interface UpdateProfileData {
  name?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface IUserRepository {
  getProfile(): Promise<User>;
  updateProfile(data: UpdateProfileData): Promise<User>;
  uploadAvatar(uri: string): Promise<string>;
}
