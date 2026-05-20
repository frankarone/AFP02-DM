import { apiClient } from '../../../infrastructure/api/ApiClient';
import { ENDPOINTS } from '../../../infrastructure/api/endpoints';
import { AppError } from '../../../core/errors/AppError';
import type { IAuthRemoteDataSource } from './AuthRemoteDataSource';
import type { LoginCredentials, RegisterData, AuthTokens } from '../../../domain/repositories/IAuthRepository';
import type { UserModel } from '../../models/UserModel';

export class AuthRemoteDataSourceImpl implements IAuthRemoteDataSource {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    return apiClient.post<AuthTokens>(ENDPOINTS.AUTH.LOGIN, credentials);
  }

  async register(data: RegisterData): Promise<UserModel> {
    return apiClient.post<UserModel>(ENDPOINTS.AUTH.REGISTER, data);
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.put(ENDPOINTS.AUTH.UPDATE_PASSWORD, { currentPassword, newPassword });
  }

  async recoverPassword(email: string): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.RECOVER_PASSWORD, { email });
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    return apiClient.post<AuthTokens>(ENDPOINTS.AUTH.REFRESH, { refreshToken });
  }
}

// ─── Mock para desarrollo (sin backend) ─────────────────────
export class AuthRemoteDataSourceMock implements IAuthRemoteDataSource {
  async login({ email, password }: LoginCredentials): Promise<AuthTokens> {
    await new Promise(r => setTimeout(r, 800));
    if (!email || !password) throw new AppError('VALIDATION_ERROR', 'Credenciales requeridas');
    return { accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' };
  }

  async register(data: RegisterData): Promise<UserModel> {
    await new Promise(r => setTimeout(r, 800));
    return {
      id: '1',
      email: data.email,
      first_name: data.name,
      last_name: data.lastName,
      created_at: new Date().toISOString(),
    };
  }

  async updatePassword(_current: string, _next: string): Promise<void> {
    await new Promise(r => setTimeout(r, 600));
  }

  async recoverPassword(_email: string): Promise<void> {
    await new Promise(r => setTimeout(r, 600));
  }

  async refreshToken(_token: string): Promise<AuthTokens> {
    return { accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' };
  }
}
