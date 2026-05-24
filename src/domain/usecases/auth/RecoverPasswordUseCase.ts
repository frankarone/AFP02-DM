import type { IAuthRepository } from '../../repositories/IAuthRepository';

export class RecoverPasswordUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(email: string): Promise<void> {
    return this.authRepository.recoverPassword(email);
  }
}
