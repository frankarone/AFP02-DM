// Dependency Injection — wire up repositories and use cases here
// Replace stubs with real implementations as you build each layer

import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { UpdatePasswordUseCase } from '../../domain/usecases/auth/UpdatePasswordUseCase';
import { RecoverPasswordUseCase } from '../../domain/usecases/auth/RecoverPasswordUseCase';

// Stubs — replace with real data sources
const authRemote: any = null;
const sessionLocal: any = null;

const authRepository = new AuthRepositoryImpl(authRemote, sessionLocal);

export const container = {
  loginUseCase: new LoginUseCase(authRepository),
  registerUseCase: new RegisterUseCase(authRepository),
  updatePasswordUseCase: new UpdatePasswordUseCase(authRepository),
  recoverPasswordUseCase: new RecoverPasswordUseCase(authRepository),
};
