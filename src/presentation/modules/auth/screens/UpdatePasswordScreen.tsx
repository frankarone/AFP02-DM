import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function UpdatePasswordScreen() {
  return (
    <View style={styles.container}>
      <Text>Update Password Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
