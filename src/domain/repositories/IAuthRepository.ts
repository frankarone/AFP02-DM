import type { User } from '../entities/User';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthTokens>;
  register(data: RegisterData): Promise<User>;
  logout(): Promise<void>;
  updatePassword(currentPassword: string, newPassword: string): Promise<void>;
  recoverPassword(email: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthTokens>;
  hasActiveSession(): Promise<boolean>;
}
