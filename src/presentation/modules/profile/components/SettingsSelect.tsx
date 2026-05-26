import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  description?: string;
  value: string;
  options: SelectOption[];
  onChange: (val: string) => void;
  icon?: string;
};

export const SettingsSelect: React.FC<Props> = ({
  label,
  description,
  value,
  options,
  onChange,
  icon,
}) => (
  <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginVertical: 8, elevation: 2 }}>
    <Text style={{ color: '#374151', fontWeight: '500', marginBottom: 4 }}>
      {icon ? `${icon} ` : ''}{label}
    </Text>
    {description && (
      <Text style={{ color: '#6b7280', fontSize: 12, marginBottom: 8 }}>
        {description}
      </Text>
    )}
    <Picker selectedValue={value} onValueChange={onChange}>
      {options.map((opt) => (
        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
      ))}
    </Picker>
  </View>
);
