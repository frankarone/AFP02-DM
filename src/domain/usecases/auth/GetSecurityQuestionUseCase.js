export class GetSecurityQuestionUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(email) {
    return this.authRepository.getSecurityQuestion(email);
  }
}
