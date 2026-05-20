// Replace with expo-secure-store once installed: npx expo install expo-secure-store
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SecureStorage = {
  async set(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  },
  async get(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  },
  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },
};
