import type { IAuthRepository } from '../../repositories/IAuthRepository';

export class CheckSessionUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<boolean> {
    return this.authRepository.hasActiveSession();
  }
}
