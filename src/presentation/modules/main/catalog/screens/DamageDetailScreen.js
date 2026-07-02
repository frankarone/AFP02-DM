import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Pasamos "route" para poder recibir la información que nos envía la lista
export function DamageDetailScreen({ route }) {
  // Sacamos el "registro" específico de la mochila de parámetros
  const { registro } = route.params || {};

  // Si por algún motivo no llega nada, mostramos un aviso
  if (!registro) {
    return (
      <View style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.info}>No se encontró la información del registro.</Text>
      </View>
    );
  }

  // Lógica de imagen
  const imageUrl = registro.imagen || registro.image || "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1200&auto=format&fit=crop";

  return (
    <SafeAreaView style={styles.safe}>
      {/* Ya no es horizontal, es un simple scroll hacia abajo para leer la descripción */}
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.product}>Producto: {registro.product}</Text>
          <Text style={styles.info}>Lote: {registro.lote}</Text>
          <Text style={styles.info}>Cantidad dañada: {registro.cantidad}</Text>
          <Text style={styles.info}>Tipo de daño: {registro.damage}</Text>
          <Text style={styles.info}>Fecha: {registro.date}</Text>

          <Text style={styles.descriptionTitle}>Descripción del daño</Text>
          <Text style={styles.description}>
            {registro.descripcion || registro.description || "Sin descripción adicional proporcionada al momento del registro."}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#d4d4d4" },
  page: { width: width },
  image: { width: width, height: height * 0.45, resizeMode: "cover" },
  content: { padding: 20 },
  product: { fontSize: 22, fontWeight: "800", color: "#263238", marginBottom: 14 },
  info: { fontSize: 15, color: "#546E7A", marginBottom: 8 },
  descriptionTitle: { marginTop: 24, fontSize: 18, fontWeight: "700", color: "#263238", marginBottom: 12 },
  description: { fontSize: 15, lineHeight: 28, color: "#455A64", textAlign: "justify" }
});