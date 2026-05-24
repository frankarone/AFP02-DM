import * as ExpoSecureStore from 'expo-secure-store';

export const SecureStorage = {
  async set(key: string, value: string): Promise<void> {
    await ExpoSecureStore.setItemAsync(key, value);
  },
  async get(key: string): Promise<string | null> {
    return ExpoSecureStore.getItemAsync(key);
  },
  async remove(key: string): Promise<void> {
    await ExpoSecureStore.deleteItemAsync(key);
  },
};
