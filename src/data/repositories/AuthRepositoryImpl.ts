import type {
  IAuthRepository,
  LoginCredentials,
  RegisterData,
  AuthTokens,
} from '../../domain/repositories/IAuthRepository';
import type { User } from '../../domain/entities/User';
import type { IAuthRemoteDataSource } from '../datasources/remote/AuthRemoteDataSource';
import type { ISessionLocalDataSource } from '../datasources/local/SessionLocalDataSource';
import { toUserEntity } from '../models/UserModel';


export class AuthRepositoryImpl implements IAuthRepository {
  constructor(
    private readonly remote: IAuthRemoteDataSource,
    private readonly local: ISessionLocalDataSource,
  ) {}

  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const tokens = await this.remote.login(credentials);
    await this.local.saveTokens(tokens);
    return tokens;
  }

  async register(data: RegisterData): Promise<User> {
    const model = await this.remote.register(data);
    return toUserEntity(model);
  }

  async logout(): Promise<void> {
    await this.local.clearTokens();
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    return this.remote.updatePassword(currentPassword, newPassword);
  }

  async recoverPassword(email: string): Promise<void> {
    return this.remote.recoverPassword(email);
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const tokens = await this.remote.refreshToken(refreshToken);
    await this.local.saveTokens(tokens);
    return tokens;
  }

  async hasActiveSession(): Promise<boolean> {
    const tokens = await this.local.getTokens();
    return tokens !== null;
  }
}
