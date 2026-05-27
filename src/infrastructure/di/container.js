import { UserLocalDataSource } from '../../data/datasources/local/UserLocalDataSource';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { UpdatePasswordUseCase } from '../../domain/usecases/auth/UpdatePasswordUseCase';
import { GetSecurityQuestionUseCase } from '../../domain/usecases/auth/GetSecurityQuestionUseCase';
import { ResetPasswordUseCase } from '../../domain/usecases/auth/ResetPasswordUseCase';
import { CheckSessionUseCase } from '../../domain/usecases/auth/CheckSessionUseCase';

// Autenticación local: los usuarios viven en AsyncStorage.
const userLocal = new UserLocalDataSource();
const authRepository = new AuthRepositoryImpl(userLocal);

export const container = {
  authRepository,
  loginUseCase: new LoginUseCase(authRepository),
  registerUseCase: new RegisterUseCase(authRepository),
  updatePasswordUseCase: new UpdatePasswordUseCase(authRepository),
  getSecurityQuestionUseCase: new GetSecurityQuestionUseCase(authRepository),
  resetPasswordUseCase: new ResetPasswordUseCase(authRepository),
  checkSessionUseCase: new CheckSessionUseCase(authRepository),
};
