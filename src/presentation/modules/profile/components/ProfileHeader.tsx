import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  name: string;
};

export const ProfileHeader: React.FC<Props> = ({ name }) => (
  <View style={{ padding: 16, backgroundColor: '#16a34a' }}>
    <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
      Inspector: {name}
    </Text>
  </View>
);
