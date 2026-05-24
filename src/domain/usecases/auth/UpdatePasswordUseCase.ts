import type { IAuthRepository } from '../../repositories/IAuthRepository';

export class UpdatePasswordUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(currentPassword: string, newPassword: string): Promise<void> {
    return this.authRepository.updatePassword(currentPassword, newPassword);
  }
}
