import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

interface ProfileHeaderProps {
  /** URL del avatar */
  avatarUrl?: string;
  /** Nombre completo del inspector */
  fullName: string;
  /** Código de empleado */
  employeeCode: string;
  /** Rol del inspector */
  role: string;
}

/**
 * Componente de encabezado de perfil
 * Muestra avatar, nombre completo, código y rol del inspector
 * Utiliza NativeWind para estilos responsive
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarUrl,
  fullName,
  employeeCode,
  role,
}) => {
  return (
    <View className="items-center py-lg px-md bg-light-surface rounded-lg mb-lg">
      {/* Avatar */}
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          className="w-24 h-24 rounded-full border-4 border-primary mb-md"
        />
      ) : (
        <View className="w-24 h-24 rounded-full bg-primary items-center justify-center mb-md">
          <Text className="text-3xl text-white font-bold">
            {fullName.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      {/* Nombre */}
      <Text className="text-2xl font-bold text-text-primary mb-sm text-center">{fullName}</Text>

      {/* Código de empleado */}
      <Text className="text-sm text-text-secondary mb-xs bg-white px-sm py-xs rounded-full">
        Código: {employeeCode}
      </Text>

      {/* Rol */}
      <Text className="text-lg font-semibold text-primary mt-sm">{role}</Text>
    </View>
  );
};
