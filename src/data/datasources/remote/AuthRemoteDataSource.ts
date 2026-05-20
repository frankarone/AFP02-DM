import type { LoginCredentials, RegisterData, AuthTokens } from '../../../domain/repositories/IAuthRepository';
import type { UserModel } from '../../models/UserModel';

export interface IAuthRemoteDataSource {
  login(credentials: LoginCredentials): Promise<AuthTokens>;
  register(data: RegisterData): Promise<UserModel>;
  updatePassword(currentPassword: string, newPassword: string): Promise<void>;
  recoverPassword(email: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthTokens>;
}
