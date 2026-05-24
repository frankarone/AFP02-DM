import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IInspectorProfileLocalDataSource } from './InspectorProfileLocalDataSource';
import type { InspectorProfile } from '../../../domain/entities/InspectorProfile';

const STORAGE_KEYS = {
  INSPECTOR_PROFILE: 'inspector_profile_cache',
  INSPECTOR_PREFERENCES: 'inspector_preferences',
};

/**
 * Implementación del datasource local para InspectorProfile
 * Usa AsyncStorage para persistencia en el dispositivo
 */
export class InspectorProfileLocalDataSourceImpl implements IInspectorProfileLocalDataSource {
  async saveProfile(profile: InspectorProfile): Promise<void> {
    try {
      const jsonData = JSON.stringify(profile);
      await AsyncStorage.setItem(STORAGE_KEYS.INSPECTOR_PROFILE, jsonData);
    } catch (error) {
      console.error('Error saving profile locally:', error);
      throw new Error('Failed to save profile locally');
    }
  }

  async getProfile(): Promise<InspectorProfile | null> {
    try {
      const jsonData = await AsyncStorage.getItem(STORAGE_KEYS.INSPECTOR_PROFILE);
      if (!jsonData) return null;
      return JSON.parse(jsonData) as InspectorProfile;
    } catch (error) {
      console.error('Error retrieving profile locally:', error);
      return null;
    }
  }

  async savePreferences(preferences: InspectorProfile['preferences']): Promise<void> {
    try {
      const jsonData = JSON.stringify(preferences);
      await AsyncStorage.setItem(STORAGE_KEYS.INSPECTOR_PREFERENCES, jsonData);
    } catch (error) {
      console.error('Error saving preferences locally:', error);
      throw new Error('Failed to save preferences locally');
    }
  }

  async getPreferences(): Promise<InspectorProfile['preferences'] | null> {
    try {
      const jsonData = await AsyncStorage.getItem(STORAGE_KEYS.INSPECTOR_PREFERENCES);
      if (!jsonData) return null;
      return JSON.parse(jsonData) as InspectorProfile['preferences'];
    } catch (error) {
      console.error('Error retrieving preferences locally:', error);
      return null;
    }
  }

  async clearCache(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.INSPECTOR_PROFILE,
        STORAGE_KEYS.INSPECTOR_PREFERENCES,
      ]);
    } catch (error) {
      console.error('Error clearing local cache:', error);
      throw new Error('Failed to clear local cache');
    }
  }
}
