import type { User } from '../../../../domain/entities/User';

export type ProfileState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export const initialProfileState: ProfileState = {
  user: null,
  isLoading: false,
  error: null,
};
