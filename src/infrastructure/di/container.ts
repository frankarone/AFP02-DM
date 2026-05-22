import { AuthRemoteDataSourceMock } from '../../data/datasources/remote/AuthRemoteDataSourceImpl';
import { SessionLocalDataSourceImpl } from '../../data/datasources/local/SessionLocalDataSourceImpl';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { UpdatePasswordUseCase } from '../../domain/usecases/auth/UpdatePasswordUseCase';
import { RecoverPasswordUseCase } from '../../domain/usecases/auth/RecoverPasswordUseCase';
import { CheckSessionUseCase } from '../../domain/usecases/auth/CheckSessionUseCase';

// ─── Inspector Profile ─────────────────────────────────────────────────
import { InspectorProfileRemoteDataSourceMock } from '../../data/datasources/remote/InspectorProfileRemoteDataSourceImpl';
import { InspectorProfileLocalDataSourceImpl } from '../../data/datasources/local/InspectorProfileLocalDataSourceImpl';
import { InspectorProfileRepositoryImpl } from '../../data/repositories/InspectorProfileRepositoryImpl';
import { GetInspectorProfileUseCase } from '../../domain/usecases/profile/GetInspectorProfileUseCase';
import { UpdateInspectorProfileUseCase } from '../../domain/usecases/profile/UpdateInspectorProfileUseCase';
import { UploadAvatarUseCase } from '../../domain/usecases/profile/UploadAvatarUseCase';
import { UpdatePreferencesUseCase } from '../../domain/usecases/profile/UpdatePreferencesUseCase';
import { setProfileRepository } from '../../presentation/modules/profile/store/profileStore';

// ─── Auth Dependencies ─────────────────────────────────────────────────
// Swap AuthRemoteDataSourceMock → AuthRemoteDataSourceImpl when the API is ready
const authRemote = new AuthRemoteDataSourceMock();
const sessionLocal = new SessionLocalDataSourceImpl();
const authRepository = new AuthRepositoryImpl(authRemote, sessionLocal);

// ─── Profile Dependencies ─────────────────────────────────────────────────
// Swap InspectorProfileRemoteDataSourceMock → InspectorProfileRemoteDataSourceImpl
// when the API is ready
const profileRemote = new InspectorProfileRemoteDataSourceMock();
const profileLocal = new InspectorProfileLocalDataSourceImpl();
const profileRepository = new InspectorProfileRepositoryImpl(profileRemote, profileLocal);

// Inyecta el repositorio en el store para que pueda acceder a él
setProfileRepository(profileRepository);

export const container = {
  // ─── Auth Use Cases ───────────────────────────
  loginUseCase: new LoginUseCase(authRepository),
  registerUseCase: new RegisterUseCase(authRepository),
  updatePasswordUseCase: new UpdatePasswordUseCase(authRepository),
  recoverPasswordUseCase: new RecoverPasswordUseCase(authRepository),
  checkSessionUseCase: new CheckSessionUseCase(authRepository),

  // ─── Profile Use Cases ────────────────────────
  getInspectorProfileUseCase: new GetInspectorProfileUseCase(profileRepository),
  updateInspectorProfileUseCase: new UpdateInspectorProfileUseCase(profileRepository),
  uploadAvatarUseCase: new UploadAvatarUseCase(profileRepository),
  updatePreferencesUseCase: new UpdatePreferencesUseCase(profileRepository),

  // ─── Repositories (para acceso directo si es necesario) ────
  authRepository,
  profileRepository,
};
