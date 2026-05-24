import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

// DATOS TEMPORALES: Luego estos datos se veran desde la BD

const PRODUCTS = [
  {
    id: "1",
    name: "Palta Hass Peruana",
    description: "Palta de exportación seleccionada.",
    price: 12.5,
    imageUrl:
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1200&auto=format&fit=crop",
    stock: 120,
    categoryId: "CAT-001",
  },

  {
    id: "2",
    name: "Mandarina Satsuma",
    description: "Mandarina fresca producida en Huaral.",
    price: 8.9,
    imageUrl:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1200&auto=format&fit=crop",
    stock: 80,
    categoryId: "CAT-002",
  },

  {
    id: "3",
    name: "Naranja Valencia",
    description: "Naranja dulce para exportación.",
    price: 9.5,
    imageUrl:
      "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1200&auto=format&fit=crop",
    stock: 150,
    categoryId: "CAT-003",
  },

  {
    id: "4",
    name: "Limón Sutil",
    description: "Limón fresco de alta calidad.",
    price: 6.5,
    imageUrl:
      "https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=1200&auto=format&fit=crop",
    stock: 65,
    categoryId: "CAT-004",
  },

  {
    id: "5",
    name: "Uva Red Globe",
    description: "Uva peruana para agroexportación.",
    price: 14.0,
    imageUrl:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=1200&auto=format&fit=crop",
    stock: 200,
    categoryId: "CAT-005",
  },

  {
    id: "6",
    name: "Mango Kent",
    description: "Mango fresco de producción nacional.",
    price: 11.5,
    imageUrl:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop",
    stock: 95,
    categoryId: "CAT-006",
  },
];

export function CatalogScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* TITULO */}
        <View style={styles.header}>
          <Text style={styles.title}>Catálogo de Productos</Text>

          <Text style={styles.subtitle}>
            Productos agroindustriales registrados
          </Text>
        </View>

        {/* PRODUCTOS */}
        {PRODUCTS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.card}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
            />

            <View style={styles.content}>
              <Text style={styles.productName}>
                {item.name}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.info}>
                Precio: S/. {item.price}
              </Text>

              <Text style={styles.info}>
                Stock: {item.stock}
              </Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  Ver Detalles
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// PALETA DE COLORES

const COLORS = {
  primary: "#2E7D32",
  secondary: "#66BB6A",
  accent: "#A5D6A7",
  earth: "#8D6E63",
  background: "#F4F8F5",
  white: "#FFFFFF",
  text: "#263238",
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#607D8B",
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 16,
  },

  productName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#607D8B",
    marginBottom: 10,
  },

  info: {
    fontSize: 14,
    color: "#546E7A",
    marginBottom: 4,
  },

  button: {
    marginTop: 14,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});