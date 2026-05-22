import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

interface SelectOption {
  label: string;
  value: string;
}

interface SettingsSelectProps {
  /** Etiqueta de la opción */
  label: string;
  /** Descripción o información adicional */
  description?: string;
  /** Valor actualmente seleccionado */
  selectedValue: string;
  /** Lista de opciones disponibles */
  options: SelectOption[];
  /** Callback cuando se selecciona una opción */
  onSelect: (value: string) => void;
  /** Si está deshabilitado */
  disabled?: boolean;
}

/**
 * Componente para seleccionar entre opciones
 * Usado en preferencias del inspector como:
 * - Seleccionar planta por defecto
 * - Seleccionar fruta a evaluar por defecto
 * - Seleccionar idioma
 */
export const SettingsSelect: React.FC<SettingsSelectProps> = ({
  label,
  description,
  selectedValue,
  options,
  onSelect,
  disabled = false,
}) => {
  const [showModal, setShowModal] = useState(false);

  // Busca el label de la opción seleccionada
  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label || 'Seleccionar...';

  return (
    <>
      <TouchableOpacity
        onPress={() => !disabled && setShowModal(true)}
        disabled={disabled}
        className={`bg-white rounded-md p-md mb-sm border border-gray-200 ${disabled ? 'opacity-50' : ''}`}
      >
        <Text className="text-sm text-text-secondary font-medium">{label}</Text>
        {description && (
          <Text className="text-xs text-text-secondary mt-xs">{description}</Text>
        )}
        <View className="flex-row items-center justify-between mt-sm">
          <Text className="text-base text-text-primary font-semibold">{selectedLabel}</Text>
          <Text className="text-lg text-text-secondary">›</Text>
        </View>
      </TouchableOpacity>

      {/* Modal con lista de opciones */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        {/* Fondo oscuro */}
        <TouchableOpacity
          className="absolute inset-0 bg-black/30"
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        />

        {/* Centro del modal */}
        <View className="flex-1 items-center justify-center px-md">
          <View className="bg-white rounded-lg w-full max-w-md">
            <View className="border-b border-gray-200 p-md">
              <Text className="text-lg font-bold text-text-primary">{label}</Text>
            </View>

            {/* Lista de opciones */}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              scrollEnabled={options.length > 5}
              style={{ maxHeight: 300 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item.value);
                    setShowModal(false);
                  }}
                  className={`p-md border-b border-gray-100 flex-row items-center justify-between ${
                    selectedValue === item.value ? 'bg-light-surface' : ''
                  }`}
                >
                  <Text className={`text-base ${
                    selectedValue === item.value
                      ? 'text-primary font-semibold'
                      : 'text-text-primary'
                  }`}>
                    {item.label}
                  </Text>
                  {selectedValue === item.value && (
                    <Text className="text-lg text-primary">✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />

            {/* Botón de cerrar */}
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              className="p-md border-t border-gray-200"
            >
              <Text className="text-center text-primary font-semibold">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
