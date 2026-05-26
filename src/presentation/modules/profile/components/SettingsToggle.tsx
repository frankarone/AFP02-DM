import React from 'react';
import { View, Text, Switch } from 'react-native';

type Props = {
  label: string;
  value: boolean;
  onToggle: (val: boolean) => void;
};

export const SettingsToggle: React.FC<Props> = ({ label, value, onToggle }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 16, borderRadius: 8, marginVertical: 8, elevation: 2 }}>
    <Text style={{ color: '#374151', fontWeight: '500' }}>{label}</Text>
    <Switch value={value} onValueChange={onToggle} />
  </View>
);
