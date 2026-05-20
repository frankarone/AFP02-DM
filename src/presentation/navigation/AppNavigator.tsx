import React from 'react';
import { View, Text } from 'react-native';

// TODO: install @react-navigation/native and @react-navigation/native-stack
// npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export function AppNavigator() {
  // Replace with NavigationContainer + Stack when navigation is installed
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>AppNavigator — wire up once @react-navigation is installed</Text>
    </View>
  );
}
