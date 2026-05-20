import type { AuthTokens } from '../../../domain/repositories/IAuthRepository';

export interface ISessionLocalDataSource {
  saveTokens(tokens: AuthTokens): Promise<void>;
  getTokens(): Promise<AuthTokens | null>;
  clearTokens(): Promise<void>;
}
