export class CheckSessionUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  // Asegura el admin por defecto y devuelve el usuario de la sesión (o null).
  async execute() {
    await this.authRepository.seedAdmin();
    return this.authRepository.getCurrentUser();
  }
}
