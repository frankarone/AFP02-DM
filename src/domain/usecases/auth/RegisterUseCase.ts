import type { IAuthRepository, RegisterData } from '../../repositories/IAuthRepository';
import type { User } from '../../entities/User';

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(data: RegisterData): Promise<User> {
    return this.authRepository.register(data);
  }
}
