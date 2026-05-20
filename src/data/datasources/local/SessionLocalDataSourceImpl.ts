import { SecureStorage } from '../../../infrastructure/storage/SecureStorage';
import { STORAGE_KEYS } from '../../../core/constants';
import type { ISessionLocalDataSource } from './SessionLocalDataSource';
import type { AuthTokens } from '../../../domain/repositories/IAuthRepository';

export class SessionLocalDataSourceImpl implements ISessionLocalDataSource {
  async saveTokens(tokens: AuthTokens): Promise<void> {
    await SecureStorage.set(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
    await SecureStorage.set(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  }

  async getTokens(): Promise<AuthTokens | null> {
    const accessToken = await SecureStorage.get(STORAGE_KEYS.AUTH_TOKEN);
    const refreshToken = await SecureStorage.get(STORAGE_KEYS.REFRESH_TOKEN);
    if (!accessToken || !refreshToken) return null;
    return { accessToken, refreshToken };
  }

  async clearTokens(): Promise<void> {
    await SecureStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
    await SecureStorage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  }
}
