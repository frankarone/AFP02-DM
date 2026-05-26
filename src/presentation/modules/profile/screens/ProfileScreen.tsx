/**
 * ProfileScreen - Perfil del Inspector de Control de Calidad
 *
 * Pantalla principal que muestra:
 * 1. Datos personales del inspector
 * 2. Opción para cambiar foto de perfil
 * 3. Preferencias personales
 * 4. Estado de sincronización
 * 5. Botón de logout
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from './theme';

import {
  ProfileHeader,
  AvatarPicker,
  SettingsToggle,
  SettingsSelect,
  InfoCard,
} from '../components';
import type { SelectOption } from '../components/SettingsSelect'

type ProfileData = {
  id: string;
  employeeCode: string;
  fullName: string;
  role: string;
  assignedPlant: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

type PreferencesData = {
  inspectorId: string;
  preferredPlant: string;
  preferredFruitType: string;
  offlineMode: boolean;
  lowDataMode: boolean;
  lastSyncAt?: string;
};

export function ProfileScreen() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [preferencesData, setPreferencesData] = useState<PreferencesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [hasPendingSync, setHasPendingSync] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simular carga
      await new Promise((r) => setTimeout(r, 1000));
      setProfileData({
        id: 'inspector-1',
        employeeCode: 'INS-001',
        fullName: 'Martín Cuadros García',
        role: 'Inspector de Calidad',
        assignedPlant: 'Planta Huaral',
        avatarUrl: 'https://via.placeholder.com/150?text=MC',
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: new Date().toISOString(),
      });
      setPreferencesData({
        inspectorId: 'inspector-1',
        preferredPlant: 'Planta Huaral',
        preferredFruitType: 'Mandarinas',
        offlineMode: false,
        lowDataMode: false,
        lastSyncAt: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadProfileData();
    setIsRefreshing(false);
  };

  const handleAvatarSelected = async (imageUri: string, mimeType: string) => {
    setIsUploadingAvatar(true);
    try {
      console.log('[ProfileScreen] Subiendo avatar...');
      // Simular upload
      await new Promise((r) => setTimeout(r, 2000));
      setProfileData((prev) => (prev ? { ...prev, avatarUrl: imageUri } : prev));
      Alert.alert('✅ Éxito', 'Avatar actualizado exitosamente');
    } catch (err) {
      Alert.alert('❌ Error', 'No se pudo subir la imagen');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleUpdatePreferences = async (updates: Partial<PreferencesData>) => {
    try {
      setPreferencesData((prev) => (prev ? { ...prev, ...updates } : prev));
      console.log('[ProfileScreen] Preferencias actualizadas:', updates);
    } catch (err) {
      Alert.alert('❌ Error', 'No se pudieron guardar las preferencias');
    }
  };

  const handleSync = async () => {
    try {
      Alert.alert('🔄 Sincronizando', 'Conectando con el servidor...');
      await new Promise((r) => setTimeout(r, 2000));
      setHasPendingSync(false);
      Alert.alert('✅ Sincronizado', 'Todos los cambios se han sincronizado');
    } catch (err) {
      Alert.alert('❌ Error', 'No se pudo sincronizar');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      '👋 Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            console.log('[ProfileScreen] Usuario desconectado');
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color={colors.error} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProfileData}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const plantOptions: SelectOption[] = [
    { value: 'Planta Huaral', label: '🏭 Planta Huaral' },
    { value: 'Almacén Central', label: '📦 Almacén Central' },
    { value: 'Planta Chancay', label: '🏭 Planta Chancay' },
  ];

  const fruitOptions: SelectOption[] = [
    { value: 'Mandarinas', label: '🍊 Mandarinas' },
    { value: 'Paltas', label: '🥑 Paltas' },
    { value: 'Naranjas', label: '🍊 Naranjas' },
    { value: 'Limones', label: '🍋 Limones' },
  ];

            return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                style={styles.scrollView}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
                >
                {hasPendingSync && (
                    <View style={styles.syncBanner}>
                    <MaterialIcons name="cloud-upload" size={20} color={colors.primary} />
                    <Text style={styles.syncBannerText}>Tienes cambios sin sincronizar</Text>
                    <TouchableOpacity onPress={handleSync}>
                        <Text style={styles.syncBannerLink}>Sincronizar</Text>
                    </TouchableOpacity>
                    </View>
                )}

                {profileData && (
                    <ProfileHeader
                    profile={profileData}
                    onAvatarSelected={handleAvatarSelected}
                    avatarLoading={isUploadingAvatar}
                    lowDataMode={!!preferencesData?.lowDataMode}
                    />
                )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Preferencias de Inspección</Text>

          <SettingsSelect
            label="Planta por Defecto"
            description="Se usará en nuevos reportes"
            value={preferencesData?.preferredPlant ?? 'Planta Huaral'}
            options={plantOptions}
            onChange={(value: string) => handleUpdatePreferences({ preferredPlant: value })}
            icon="🏭"
          />

          <SettingsSelect
            label="Fruta a Evaluar"
            description="Filtro por defecto en catálogo"
            value={preferencesData?.preferredFruitType ?? 'Mandarinas'}
            options={fruitOptions}
            onChange={(value: string) => handleUpdatePreferences({ preferredFruitType: value })}
            icon="🍎"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📡 Modos de Operación</Text>

          <SettingsToggle
            label="Modo Offline"
            description="Trabaja sin conexión a internet"
            value={preferencesData?.offlineMode ?? false}
            onChange={(value: boolean) => handleUpdatePreferences({ offlineMode: value })}
            icon="📡"
          />

          <SettingsToggle
            label="Ahorro de Datos"
            description="Comprime imágenes automáticamente"
            value={preferencesData?.lowDataMode ?? false}
            onChange={(value: boolean) => handleUpdatePreferences({ lowDataMode: value })}
            icon="📉"
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color={colors.error} />
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
  </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  syncBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  syncBannerText: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  syncBannerLink: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  section: {
    marginTop: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.border,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    marginBottom: spacing.xl,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    backgroundColor: colors.background,
  },
  logoutButtonText: {
    marginLeft: spacing.sm,
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
});
