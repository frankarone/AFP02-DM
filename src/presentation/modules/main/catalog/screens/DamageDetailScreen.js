import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";

export function DamageDetailScreen({ route }) {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.descriptionTitle}>
            Descripción del daño
          </Text>

          <Text style={styles.description}>
            {item.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#d4d4d4",
  },

  image: {
    width: 320,
    height: 320,
    backgroundColor: "#E0E0E0",
    marginTop: 20,
    alignSelf: "center",
  },

  content: {
    padding: 20,
  },

  product: {
    fontSize: 22,
    fontWeight: "800",
    color: "#263238",
    marginBottom: 14,
    textAlign: "center",
  },

  descriptionTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: "700",
    color: "#263238",
    marginBottom: 12,
    textAlign: "center",
  },

  description: {
    fontSize: 15,
    lineHeight: 28,
    color: "#455A64",
    textAlign: "justify",
    paddingBottom: 40,
  },
});