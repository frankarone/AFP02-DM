export class UpdatePasswordUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(email, currentPassword, newPassword) {
    return this.authRepository.updatePassword(email, currentPassword, newPassword);
  }
}
