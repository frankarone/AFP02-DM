import AsyncStorage from '@react-native-async-storage/async-storage';

// Envoltorio sencillo sobre AsyncStorage para guardar texto y objetos JSON.
export const AppStorage = {
  async getItem(key) {
    return AsyncStorage.getItem(key);
  },

  async setItem(key, value) {
    await AsyncStorage.setItem(key, value);
  },

  async removeItem(key) {
    await AsyncStorage.removeItem(key);
  },

  // Lee un valor y lo convierte de JSON (o null si no existe).
  async getJSON(key) {
    const raw = await AsyncStorage.getItem(key);
    const value = raw ? JSON.parse(raw) : null;
    console.log('[AppStorage] getJSON:', key, JSON.stringify(value, null, 2));
    return value;
  },

  // Guarda un objeto/array como JSON.
  async setJSON(key, value) {
    console.log('[AppStorage] setJSON:', key, JSON.stringify(value, null, 2));
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};
