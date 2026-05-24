import type { IAuthRepository, LoginCredentials, AuthTokens } from '../../repositories/IAuthRepository';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthTokens> {
    return this.authRepository.login(credentials);
  }
}
