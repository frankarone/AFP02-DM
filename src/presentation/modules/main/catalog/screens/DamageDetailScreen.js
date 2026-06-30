import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export function DamageDetailScreen({ route }) {
  const { dano } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {dano.imagen ? (
          <Image
            source={{ uri: dano.imagen }}
            style={styles.image}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.placeholderText}>
              Sin imagen
            </Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.product}>
            Fruta: {dano.fruta}
          </Text>

          <Text style={styles.info}>
            Tipo de daño: {dano.tipoDano}
          </Text>

          <Text style={styles.info}>
            Cantidad dañada: {dano.cantidad}
          </Text>

          <Text style={styles.info}>
            Fecha: {new Date(dano.fecha).toLocaleString()}
          </Text>

          <Text style={styles.descriptionTitle}>
            Descripción del daño
          </Text>

          <Text style={styles.description}>
            {dano.descripcion && dano.descripcion.trim() !== ""
              ? dano.descripcion
              : "No se registró una descripción para este daño."}
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
    width: width,
    height: height * 0.45,
    resizeMode: "cover",
  },

  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BDBDBD",
  },

  placeholderText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  content: {
    padding: 20,
  },

  product: {
    fontSize: 24,
    fontWeight: "800",
    color: "#263238",
    marginBottom: 16,
  },

  info: {
    fontSize: 16,
    color: "#546E7A",
    marginBottom: 10,
  },

  descriptionTitle: {
    marginTop: 25,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#263238",
  },

  description: {
    fontSize: 16,
    lineHeight: 28,
    color: "#455A64",
    textAlign: "justify",
  },
});