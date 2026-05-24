import { AuthRemoteDataSourceMock } from '../../data/datasources/remote/AuthRemoteDataSourceImpl';
import { SessionLocalDataSourceImpl } from '../../data/datasources/local/SessionLocalDataSourceImpl';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { UpdatePasswordUseCase } from '../../domain/usecases/auth/UpdatePasswordUseCase';
import { RecoverPasswordUseCase } from '../../domain/usecases/auth/RecoverPasswordUseCase';
import { CheckSessionUseCase } from '../../domain/usecases/auth/CheckSessionUseCase';

// Swap AuthRemoteDataSourceMock → AuthRemoteDataSourceImpl when the API is ready
const authRemote = new AuthRemoteDataSourceMock();
const sessionLocal = new SessionLocalDataSourceImpl();
const authRepository = new AuthRepositoryImpl(authRemote, sessionLocal);

export const container = {
  loginUseCase: new LoginUseCase(authRepository),
  registerUseCase: new RegisterUseCase(authRepository),
  updatePasswordUseCase: new UpdatePasswordUseCase(authRepository),
  recoverPasswordUseCase: new RecoverPasswordUseCase(authRepository),
  checkSessionUseCase: new CheckSessionUseCase(authRepository),
};
