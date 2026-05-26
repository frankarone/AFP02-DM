import { AuthRemoteDataSourceMock } from '../../data/datasources/remote/AuthRemoteDataSourceImpl';
import { SessionLocalDataSourceImpl } from '../../data/datasources/local/SessionLocalDataSourceImpl';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { UpdatePasswordUseCase } from '../../domain/usecases/auth/UpdatePasswordUseCase';
import { RecoverPasswordUseCase } from '../../domain/usecases/auth/RecoverPasswordUseCase';
import { CheckSessionUseCase } from '../../domain/usecases/auth/CheckSessionUseCase';
import { InspectorProfileRemoteDataSourceMock } from "../../data/datasources/remote/InspectorProfileRemoteDataSourceImpl";
import { InspectorProfileLocalDataSourceImpl } from '../../data/datasources/local/InspectorProfileLocalDataSourceImpl';
import { InspectorProfileRepositoryImpl } from '../../data/repositories/InspectorProfileRepositoryImpl';
import { GetInspectorProfileUseCase } from '../../domain/usecases/profile/GetInspectorProfileUseCase';
import { UpdateInspectorProfileUseCase } from '../../domain/usecases/profile/UpdateInspectorProfileUseCase';
import { UploadAvatarUseCase } from '../../domain/usecases/profile/UploadAvatarUseCase';
import { UpdatePreferencesUseCase } from '../../domain/usecases/profile/UpdatePreferencesUseCase';
import { useProfileStore } from '../../presentation/modules/profile/store/profileStore';

// Profile Module Setup
const profileRemote = new InspectorProfileRemoteDataSourceMock();
const profileLocal = new InspectorProfileLocalDataSourceImpl();
const profileRepository = new InspectorProfileRepositoryImpl(profileRemote, profileLocal);

const getInspectorProfileUseCase = new GetInspectorProfileUseCase(profileRepository);
const updateInspectorProfileUseCase = new UpdateInspectorProfileUseCase(profileRepository);
const uploadAvatarUseCase = new UploadAvatarUseCase(profileRepository);
const updatePreferencesUseCase = new UpdatePreferencesUseCase(profileRepository);
const local = new InspectorProfileLocalDataSourceImpl();
const remote = new InspectorProfileRemoteDataSourceMock();

// Initialize store with use cases
useProfileStore.getState().setUseCases(
  getInspectorProfileUseCase,
  updateInspectorProfileUseCase,
  uploadAvatarUseCase,
  updatePreferencesUseCase,
);


// Export
export const inspectorProfileRepository = new InspectorProfileRepositoryImpl(remote, local);

export const container = {
  // ...auth
  getInspectorProfileUseCase,
  updateInspectorProfileUseCase,
  uploadAvatarUseCase,
  updatePreferencesUseCase,
  profileRepository,
  useProfileStore,
};

