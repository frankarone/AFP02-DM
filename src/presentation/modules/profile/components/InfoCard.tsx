import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  email: string;
};

export const InfoCard: React.FC<Props> = ({ email }) => (
  <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, marginVertical: 8, elevation: 2 }}>
    <Text style={{ color: '#374151', fontWeight: '500' }}>Correo:</Text>
    <Text style={{ color: '#111827' }}>{email}</Text>
  </View>
);
