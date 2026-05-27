export class ResetPasswordUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(email, answer, newPassword) {
    return this.authRepository.resetPassword(email, answer, newPassword);
  }
}
