import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useProfileStore } from '../store/profileStore';
import {
  ProfileHeader,
  AvatarPicker,
  InfoCard,
  SettingsToggle,
  SettingsSelect,
} from '../components';
import type { PlantType, FruitType } from '../../../domain/entities/InspectorProfile';

/**
 * Pantalla de Perfil del Inspector de Control de Calidad
 * 
 * ESTRUCTURA:
 * 1. Encabezado con avatar y datos básicos
 * 2. Información de empleado (código, área, rol)
 * 3. Sección de preferencias (planta, fruta, modos)
 * 4. Botones de acción (sync, logout)
 * 
 * HOOKS UTILIZADOS:
 * - useEffect: Carga perfil al montar el componente
 * - useState: Gestiona estado local de edición
 * - useProfileStore: Estado global del perfil (Zustand)
 */
export function ProfileScreen() {
  const {
    profile,
    isLoading,
    isUpdating,
    isUploadingAvatar,
    error,
    loadProfile,
    uploadAvatar,
    updatePreferences,
    clearError,
  } = useProfileStore();

  // Estados locales para edición
  const [isEditing, setIsEditing] = useState(false);
  const [tempPreferences, setTempPreferences] = useState(profile?.preferences);

  /**
   * Hook: Carga el perfil cuando se monta el componente
   * Se ejecuta una sola vez gracias al array vacío de dependencias
   */
  useEffect(() => {
    loadProfile();
  }, []);

  /**
   * Sincroniza preferencias locales cuando el perfil cambia
   */
  useEffect(() => {
    if (profile?.preferences) {
      setTempPreferences(profile.preferences);
    }
  }, [profile]);

  /**
   * Maneja la subida de avatar
   * 1. Envía foto al servidor mediante uploadAvatar
   * 2. Muestra indicador de carga
   * 3. Actualiza UI al completar
   */
  const handleAvatarUpload = async (photoUri: string) => {
    try {
      const response = await uploadAvatar(photoUri);
      if (response.success) {
        Alert.alert('Éxito', 'Foto de perfil actualizada correctamente');
      }
    } catch (err) {
      Alert.alert(
        'Error',
        'No se pudo actualizar la foto. Por favor intenta de nuevo.',
      );
    }
  };

  /**
   * Maneja cambios en las preferencias
   * Actualiza el estado local temporalmente
   */
  const handlePlantChange = (plant: PlantType) => {
    if (tempPreferences) {
      setTempPreferences({
        ...tempPreferences,
        defaultPlant: plant,
      });
    }
  };

  const handleFruitChange = (fruit: FruitType) => {
    if (tempPreferences) {
      setTempPreferences({
        ...tempPreferences,
        defaultFruit: fruit,
      });
    }
  };

  const handleOfflineModeToggle = (value: boolean) => {
    if (tempPreferences) {
      setTempPreferences({
        ...tempPreferences,
        offlineModeEnabled: value,
      });
    }
  };

  const handleLowDataModeToggle = (value: boolean) => {
    if (tempPreferences) {
      setTempPreferences({
        ...tempPreferences,
        lowDataModeEnabled: value,
      });
    }
  };

  /**
   * Guarda los cambios de preferencias
   * 1. Valida que haya cambios
   * 2. Envía al servidor
   * 3. Muestra confirmación o error
   */
  const handleSavePreferences = async () => {
    if (!tempPreferences || !profile?.preferences) return;

    const hasChanges =
      JSON.stringify(tempPreferences) !== JSON.stringify(profile.preferences);

    if (!hasChanges) {
      Alert.alert('Sin cambios', 'No hay cambios que guardar');
      return;
    }

    try {
      await updatePreferences(tempPreferences);
      Alert.alert('Éxito', 'Preferencias actualizadas correctamente');
      setIsEditing(false);
    } catch (err) {
      Alert.alert(
        'Error',
        'No se pudieron guardar las preferencias. Por favor intenta de nuevo.',
      );
    }
  };

  // Estado: Cargando perfil
  if (isLoading && !profile) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1A73E8" />
          <Text className="mt-md text-text-primary">Cargando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Estado: Error al cargar
  if (error && !profile) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center p-md">
          <Text className="text-lg font-semibold text-error mb-md text-center">
            Error al cargar perfil
          </Text>
          <Text className="text-sm text-text-secondary mb-lg text-center">{error}</Text>
          <TouchableOpacity
            onPress={loadProfile}
            className="bg-primary px-lg py-sm rounded-md"
          >
            <Text className="text-white font-semibold">Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Estado: Sin perfil
  if (!profile) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-primary text-lg">Sin datos de perfil</Text>
        </View>
      </SafeAreaView>
    );
  }

  const plantOptions = [
    { label: 'Planta Huaral', value: 'Planta Huaral' as PlantType },
    { label: 'Almacén Central', value: 'Almacén Central' as PlantType },
    { label: 'Centro de Acopio', value: 'Centro de Acopio' as PlantType },
    { label: 'Planta Procesamiento', value: 'Planta Procesamiento' as PlantType },
  ];

  const fruitOptions = [
    { label: 'Mandarinas', value: 'Mandarinas' as FruitType },
    { label: 'Paltas', value: 'Paltas' as FruitType },
    { label: 'Naranjas', value: 'Naranjas' as FruitType },
    { label: 'Limones', value: 'Limones' as FruitType },
    { label: 'Granadillas', value: 'Granadillas' as FruitType },
  ];

  return (
    <SafeAreaView className="flex-1 bg-light-surface">
      <ScrollView className="flex-1 px-md py-md" showsVerticalScrollIndicator={false}>
        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECCIÓN 1: Encabezado con Avatar */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <ProfileHeader
          avatarUrl={profile.avatarUrl}
          fullName={`${profile.firstName} ${profile.lastName}`}
          employeeCode={profile.employeeCode}
          role={profile.role}
        />

        {/* Selector de Avatar */}
        <View className="bg-white rounded-lg p-md mb-lg border border-gray-200">
          <Text className="text-base font-semibold text-text-primary mb-md">
            Foto de Perfil
          </Text>
          <AvatarPicker
            currentAvatarUrl={profile.avatarUrl}
            onImageSelected={handleAvatarUpload}
            isLoading={isUploadingAvatar}
          />
        </View>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECCIÓN 2: Información del Inspector */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <View className="mb-lg">
          <Text className="text-lg font-bold text-text-primary mb-md">
            Información del Inspector
          </Text>

          <InfoCard
            icon="👤"
            label="Nombre Completo"
            value={`${profile.firstName} ${profile.lastName}`}
          />

          <InfoCard
            icon="🏢"
            label="Código de Empleado"
            value={profile.employeeCode}
          />

          <InfoCard
            icon="👨‍💼"
            label="Rol"
            value={profile.role}
          />

          <InfoCard
            icon="📍"
            label="Área Asignada"
            value={profile.assignedArea}
          />

          <InfoCard
            icon="📅"
            label="Fecha de Contratación"
            value={new Date(profile.hireDate).toLocaleDateString('es-PE')}
          />

          <InfoCard
            icon="📧"
            label="Correo"
            value={profile.email}
          />
        </View>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECCIÓN 3: Preferencias del Inspector */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <View className="mb-lg">
          <View className="flex-row items-center justify-between mb-md">
            <Text className="text-lg font-bold text-text-primary">
              Preferencias
            </Text>
            {isEditing && (
              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                className="px-sm py-xs bg-light-surface rounded-full"
              >
                <Text className="text-xs text-text-secondary">Cancelar</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text className="text-sm text-text-secondary mb-md">
            Configura tus preferencias para agilizar el trabajo en campo
          </Text>

          {/* Selector de Planta por Defecto */}
          <SettingsSelect
            label="Planta por Defecto"
            description="Ubicación donde trabajas más frecuentemente"
            selectedValue={tempPreferences?.defaultPlant || ''}
            options={plantOptions}
            onSelect={handlePlantChange}
            disabled={!isEditing}
          />

          {/* Selector de Fruta por Defecto */}
          <SettingsSelect
            label="Fruta a Evaluar (Defecto)"
            description="Tipo de fruta para pre-llenar reportes"
            selectedValue={tempPreferences?.defaultFruit || ''}
            options={fruitOptions}
            onSelect={handleFruitChange}
            disabled={!isEditing}
          />

          {/* Toggle de Modo Offline */}
          <SettingsToggle
            label="Modo Offline"
            description="Permite registrar daños sin conexión (se sincroniza después)"
            value={tempPreferences?.offlineModeEnabled ?? false}
            onToggle={handleOfflineModeToggle}
            disabled={!isEditing}
          />

          {/* Toggle de Modo Bajo Consumo */}
          <SettingsToggle
            label="Modo Bajo Consumo de Datos"
            description="Comprime automáticamente fotos para ahorrar datos"
            value={tempPreferences?.lowDataModeEnabled ?? false}
            onToggle={handleLowDataModeToggle}
            disabled={!isEditing}
          />

          {/* Botones de Acción para Preferencias */}
          <View className="flex-row mt-md gap-md">
            {!isEditing ? (
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                className="flex-1 bg-secondary px-md py-md rounded-md"
              >
                <Text className="text-center text-white font-semibold">
                  Editar Preferencias
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setIsEditing(false)}
                  className="flex-1 bg-gray-300 px-md py-md rounded-md"
                  disabled={isUpdating}
                >
                  <Text className="text-center text-text-primary font-semibold">
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSavePreferences}
                  className={`flex-1 px-md py-md rounded-md ${
                    isUpdating ? 'bg-gray-400' : 'bg-primary'
                  }`}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text className="text-center text-white font-semibold">
                      Guardar
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* SECCIÓN 4: Información del Sistema */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <View className="bg-white rounded-lg p-md mb-lg border border-gray-200">
          <Text className="text-sm text-text-secondary mb-md">
            Versión: 1.0.0 | Última actualización:{' '}
            {new Date(profile.updatedAt).toLocaleDateString('es-PE')}
          </Text>
          {error && (
            <View className="bg-error/10 border border-error rounded-md p-md mb-md">
              <Text className="text-error text-sm">{error}</Text>
              <TouchableOpacity
                onPress={clearError}
                className="mt-sm"
              >
                <Text className="text-error font-semibold text-xs">Descartar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Espaciador final */}
        <View className="h-lg" />
      </ScrollView>
    </SafeAreaView>
  );
}
