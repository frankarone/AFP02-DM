import type { IUserRepository, UpdateProfileData } from '../../repositories/IUserRepository';
import type { User } from '../../entities/User';

export class UpdateProfileUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: UpdateProfileData): Promise<User> {
    return this.userRepository.updateProfile(data);
  }
}
