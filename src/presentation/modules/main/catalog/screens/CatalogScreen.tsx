import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function CatalogScreen() {
  return (
    <View style={styles.container}>
      <Text>Catalog Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
