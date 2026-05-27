import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";

// DATOS TEMPORALES: Luego estos datos se veran desde la BD
const REGISTRO = [
  {
    id: "1",
    product: "Palta",
    lote: "LOT-001",
    cantidad: "12",
    damage: "Golpe",
    date: "20/05/2026",
    image:
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "2",
    product: "Mandarina",
    lote: "LOT-002",
    cantidad: "8",
    damage: "Mancha",
    date: "19/05/2026",
    image:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "3",
    product: "Naranja",
    lote: "LOT-003",
    cantidad: "15",
    damage: "Rajadura",
    date: "18/05/2026",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "4",
    product: "Mango",
    lote: "LOT-004",
    cantidad: "6",
    damage: "Golpe",
    date: "17/05/2026",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "5",
    product: "Manzana",
    lote: "LOT-005",
    cantidad: "11",
    damage: "Mancha",
    date: "16/05/2026",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "6",
    product: "Pera",
    lote: "LOT-006",
    cantidad: "9",
    damage: "Rajadura",
    date: "15/05/2026",
    image:
      "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "7",
    product: "Fresa",
    lote: "LOT-007",
    cantidad: "20",
    damage: "Golpe",
    date: "14/05/2026",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "8",
    product: "Piña",
    lote: "LOT-008",
    cantidad: "5",
    damage: "Mancha",
    date: "13/05/2026",
    image:
      "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "9",
    product: "Uva",
    lote: "LOT-009",
    cantidad: "14",
    damage: "Rajadura",
    date: "12/05/2026",
    image:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "10",
    product: "Sandía",
    lote: "LOT-010",
    cantidad: "3",
    damage: "Golpe",
    date: "11/05/2026",
    image:
      "https://images.unsplash.com/photo-1563114773-84221bd62daa?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "11",
    product: "Papaya",
    lote: "LOT-011",
    cantidad: "7",
    damage: "Mancha",
    date: "10/05/2026",
    image:
      "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "12",
    product: "Plátano",
    lote: "LOT-012",
    cantidad: "18",
    damage: "Rajadura",
    date: "09/05/2026",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1200&auto=format&fit=crop",
  },
];

export function DamageListScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const filteredRegisters = REGISTRO.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.product.toLowerCase().includes(text) ||
      item.lote.toLowerCase().includes(text) ||
      item.cantidad.toLowerCase().includes(text) ||
      item.damage.toLowerCase().includes(text) ||
      item.date.toLowerCase().includes(text)
    );
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            Lista de Registros
          </Text>
        </View>

        <TextInput
          placeholder="Buscar por producto, lote, fecha o tipo"
          placeholderTextColor="#90A4AE"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />

        {filteredRegisters.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("DamageDetail")
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.infoContainer}>
              <Text style={styles.product}>
                Tipo de fruta: {item.product}
              </Text>

              <Text style={styles.info}>
                Lote: {item.lote}
              </Text>

              <Text style={styles.info}>
                Cantidad dañada: {item.cantidad}
              </Text>

              <Text style={styles.info}>
                Tipo de daño: {item.damage}
              </Text>

              <Text style={styles.info}>
                Fecha: {item.date}
              </Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  Ver detalle
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filteredRegisters.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No se encontraron registros
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#d4d4d4",
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#263238",
    textAlign: "center",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
    fontSize: 14,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    marginBottom: 20,

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  image: {
    width: 95,
    height: 95,
    borderRadius: 16,
    backgroundColor: "#E0E0E0",
  },

  infoContainer: {
    flex: 1,
    marginLeft: 14,
  },

  product: {
    fontSize: 16,
    fontWeight: "700",
    color: "#263238",
    marginBottom: 6,
  },

  info: {
    fontSize: 12,
    color: "#607D8B",
    marginBottom: 3,
  },

  button: {
    marginTop: 12,
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
  },

  emptyText: {
    color: "#90A4AE",
    fontSize: 14,
  },
});