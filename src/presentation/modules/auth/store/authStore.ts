// State management for auth module
// Replace with Zustand / Context / Redux Toolkit as preferred

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
