import * as ExpoSecureStore from 'expo-secure-store';

export const SecureStorage = {
  async set(key, value) {
    await ExpoSecureStore.setItemAsync(key, value);
  },
  async get(key) {
    return ExpoSecureStore.getItemAsync(key);
  },
  async remove(key) {
    await ExpoSecureStore.deleteItemAsync(key);
  },
};
