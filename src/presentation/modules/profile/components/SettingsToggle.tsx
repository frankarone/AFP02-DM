import React from 'react';
import { View, Text, Switch } from 'react-native';

interface SettingsToggleProps {
  /** Etiqueta de la opción */
  label: string;
  /** Descripción o información adicional */
  description?: string;
  /** Valor actual del toggle */
  value: boolean;
  /** Callback cuando cambia el toggle */
  onToggle: (value: boolean) => void;
  /** Si está deshabilitado */
  disabled?: boolean;
}

/**
 * Componente para opciones booleanas (on/off)
 * Usado en preferencias del inspector como:
 * - Modo offline
 * - Modo de bajo consumo de datos
 */
export const SettingsToggle: React.FC<SettingsToggleProps> = ({
  label,
  description,
  value,
  onToggle,
  disabled = false,
}) => {
  return (
    <View className={`bg-white rounded-md p-md mb-sm border border-gray-200 ${disabled ? 'opacity-50' : ''}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 mr-md">
          <Text className="text-base text-text-primary font-semibold">{label}</Text>
          {description && (
            <Text className="text-sm text-text-secondary mt-xs">{description}</Text>
          )}
        </View>

        {/* Switch de iOS/Android */}
        <Switch
          value={value}
          onValueChange={onToggle}
          disabled={disabled}
          trackColor={{ false: '#DADCE0', true: '#81C784' }}
          thumbColor={value ? '#34A853' : '#fff'}
        />
      </View>
    </View>
  );
};
