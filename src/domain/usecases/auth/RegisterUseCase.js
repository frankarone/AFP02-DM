export class RegisterUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(data) {
    return this.authRepository.register(data);
  }
}
