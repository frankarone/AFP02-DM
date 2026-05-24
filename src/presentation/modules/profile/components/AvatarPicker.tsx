import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface AvatarPickerProps {
  /** URL actual del avatar */
  currentAvatarUrl?: string;
  /** Callback cuando se selecciona una imagen */
  onImageSelected: (uri: string) => void;
  /** Indica si está subiendo */
  isLoading?: boolean;
  /** Permite editar o solo ver */
  readonly?: boolean;
}

/**
 * Componente para seleccionar y mostrar avatar del inspector
 * Integra expo-image-picker para acceder a cámara y galería
 * - Solicita permisos necesarios
 * - Comprime imagen para modo bajo consumo
 * - Maneja errores de permisos
 */
export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  currentAvatarUrl,
  onImageSelected,
  isLoading = false,
  readonly = false,
}) => {
  const [localImageUri, setLocalImageUri] = useState<string | undefined>(currentAvatarUrl);

  /**
   * Solicita permisos de acceso a la galería
   */
  const requestGalleryPermission = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Permiso requerido',
          'Necesitamos acceso a tu galería para subir fotos de perfil.',
        );
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo solicitar permiso de galería');
      return false;
    }
  };

  /**
   * Solicita permisos de acceso a la cámara
   */
  const requestCameraPermission = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Permiso requerido',
          'Necesitamos acceso a tu cámara para tomar fotos de perfil.',
        );
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo solicitar permiso de cámara');
      return false;
    }
  };

  /**
   * Abre la galería de fotos del dispositivo
   */
  const pickImageFromGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7, // Compresión automática
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setLocalImageUri(uri);
        onImageSelected(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
      console.error('Gallery picker error:', error);
    }
  };

  /**
   * Abre la cámara para tomar foto
   */
  const takePictureWithCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7, // Compresión automática
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setLocalImageUri(uri);
        onImageSelected(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
      console.error('Camera error:', error);
    }
  };

  /**
   * Muestra opciones para seleccionar foto
   */
  const showImagePickerOptions = () => {
    Alert.alert(
      'Actualizar foto de perfil',
      'Elige cómo deseas actualizar tu foto',
      [
        { text: 'Tomar foto', onPress: takePictureWithCamera },
        { text: 'Galería', onPress: pickImageFromGallery },
        { text: 'Cancelar', style: 'cancel' },
      ],
    );
  };

  return (
    <View className="items-center mb-lg">
      {/* Previsualizador de imagen */}
      <View className="relative">
        {localImageUri ? (
          <Image
            source={{ uri: localImageUri }}
            className="w-28 h-28 rounded-full border-4 border-primary bg-gray-200"
          />
        ) : (
          <View className="w-28 h-28 rounded-full bg-light-surface border-4 border-primary items-center justify-center">
            <Text className="text-4xl text-primary">+</Text>
          </View>
        )}

        {/* Indicador de carga */}
        {isLoading && (
          <View className="absolute inset-0 bg-black/30 rounded-full items-center justify-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>

      {/* Botón para cambiar foto */}
      {!readonly && (
        <TouchableOpacity
          onPress={showImagePickerOptions}
          disabled={isLoading}
          className={`mt-md px-lg py-sm rounded-md ${
            isLoading ? 'bg-disabled' : 'bg-secondary'
          }`}
        >
          <Text className="text-white font-semibold">Cambiar foto de perfil</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
