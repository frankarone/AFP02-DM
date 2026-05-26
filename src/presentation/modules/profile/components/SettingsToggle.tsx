import React from 'react';
import { View, Text, Switch } from 'react-native';

type Props = {
  label: string;
  description?: string;
  value: boolean;
  onChange: (val: boolean) => void; // <-- cambiar aquí
  icon?: string;
};

export const SettingsToggle: React.FC<Props> = ({ label, description, value, onChange, icon }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 16, borderRadius: 8, marginVertical: 8, elevation: 2 }}>
    <View>
      <Text style={{ color: '#374151', fontWeight: '500' }}>
        {icon ? `${icon} ` : ''}{label}
      </Text>
      {description && (
        <Text style={{ color: '#6b7280', fontSize: 12 }}>{description}</Text>
      )}
    </View>
    <Switch value={value} onValueChange={onChange} />
  </View>
);
