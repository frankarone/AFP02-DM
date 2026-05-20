import type { IUserRepository, UpdateProfileData } from '../../domain/repositories/IUserRepository';
import type { User } from '../../domain/entities/User';

export class UserRepositoryImpl implements IUserRepository {
  async getProfile(): Promise<User> {
    throw new Error('Not implemented');
  }

  async updateProfile(_data: UpdateProfileData): Promise<User> {
    throw new Error('Not implemented');
  }

  async uploadAvatar(_uri: string): Promise<string> {
    throw new Error('Not implemented');
  }
}
