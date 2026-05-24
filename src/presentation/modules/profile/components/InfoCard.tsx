import React from 'react';
import { View, Text } from 'react-native';

interface InfoCardProps {
  /** Título de la información */
  label: string;
  /** Valor a mostrar */
  value: string;
  /** Icono opcional (emoji o símbolo) */
  icon?: string;
}

/**
 * Componente reutilizable para mostrar pares clave-valor
 * Usado para mostrar información del inspector como:
 * - Código de empleado
 * - Área asignada
 * - Fecha de contratación
 */
export const InfoCard: React.FC<InfoCardProps> = ({ label, value, icon }) => {
  return (
    <View className="bg-white rounded-md p-md mb-sm border border-gray-200">
      <View className="flex-row items-center">
        {icon && <Text className="text-lg mr-sm">{icon}</Text>}
        <View className="flex-1">
          <Text className="text-sm text-text-secondary font-medium">{label}</Text>
          <Text className="text-lg text-text-primary font-semibold mt-xs">{value}</Text>
        </View>
      </View>
    </View>
  );
};
