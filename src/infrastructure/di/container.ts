import { AuthRemoteDataSourceMock } from '../../data/datasources/remote/AuthRemoteDataSourceImpl';
import { SessionLocalDataSourceImpl } from '../../data/datasources/local/SessionLocalDataSourceImpl';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { UpdatePasswordUseCase } from '../../domain/usecases/auth/UpdatePasswordUseCase';
import { RecoverPasswordUseCase } from '../../domain/usecases/auth/RecoverPasswordUseCase';
import { CheckSessionUseCase } from '../../domain/usecases/auth/CheckSessionUseCase';
import { LogoutUseCase } from '../../domain/usecases/auth/LogoutUseCase';

import { InspectorProfileRemoteDataSourceMock } from "../../data/datasources/remote/InspectorProfileRemoteDataSourceImpl";
import { InspectorProfileLocalDataSourceImpl } from '../../data/datasources/local/InspectorProfileLocalDataSourceImpl';
import { InspectorProfileRepositoryImpl } from '../../data/repositories/InspectorProfileRepositoryImpl';
import { GetInspectorProfileUseCase } from '../../domain/usecases/profile/GetInspectorProfileUseCase';
import { UpdateInspectorProfileUseCase } from '../../domain/usecases/profile/UpdateInspectorProfileUseCase';
import { UploadAvatarUseCase } from '../../domain/usecases/profile/UploadAvatarUseCase';
import { UpdatePreferencesUseCase } from '../../domain/usecases/profile/UpdatePreferencesUseCase';
import { useProfileStore } from '../../presentation/modules/profile/store/profileStore';

// 🔹 Auth Module Setup
const authRemote = new AuthRemoteDataSourceMock();
const authLocal = new SessionLocalDataSourceImpl();
const authRepository = new AuthRepositoryImpl(authRemote, authLocal);

const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const updatePasswordUseCase = new UpdatePasswordUseCase(authRepository);
const recoverPasswordUseCase = new RecoverPasswordUseCase(authRepository);
const checkSessionUseCase = new CheckSessionUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

// 🔹 Profile Module Setup
const profileRemote = new InspectorProfileRemoteDataSourceMock();
const profileLocal = new InspectorProfileLocalDataSourceImpl();
const profileRepository = new InspectorProfileRepositoryImpl(profileRemote, profileLocal);

const getInspectorProfileUseCase = new GetInspectorProfileUseCase(profileRepository);
const updateInspectorProfileUseCase = new UpdateInspectorProfileUseCase(profileRepository);
const uploadAvatarUseCase = new UploadAvatarUseCase(profileRepository);
const updatePreferencesUseCase = new UpdatePreferencesUseCase(profileRepository);

// Inicializar store con use cases
useProfileStore.getState().setUseCases(
  getInspectorProfileUseCase,
  updateInspectorProfileUseCase,
  uploadAvatarUseCase,
  updatePreferencesUseCase,
);

// Exportar todo en un solo container
export const container = {
  // Auth
  loginUseCase,
  registerUseCase,
  updatePasswordUseCase,
  recoverPasswordUseCase,
  checkSessionUseCase,
  logoutUseCase,

  // Profile
  getInspectorProfileUseCase,
  updateInspectorProfileUseCase,
  uploadAvatarUseCase,
  updatePreferencesUseCase,
  profileRepository,
  useProfileStore,
};
