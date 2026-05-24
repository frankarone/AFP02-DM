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

/*
  DATOS MOCK
*/

const REGISTERS = [
  {
    id: "1",
    product: "Palta",
    lote: "LOT-001",
    damage: "Golpe",
    date: "20/05/2026",
    image:
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "2",
    product: "Mandarina",
    lote: "LOT-002",
    damage: "Mancha",
    date: "19/05/2026",
    image:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "3",
    product: "Naranja",
    lote: "LOT-003",
    damage: "Rajadura",
    date: "18/05/2026",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1200&auto=format&fit=crop",
  },
];

export function DamageListScreen({ navigation }: any) {
  const [search, setSearch] = useState("");

  /*
    FILTRO GENERAL
    Busca por:
    - nombre
    - lote
    - fecha
    - daño
  */

  const filteredRegisters = REGISTERS.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.product.toLowerCase().includes(text) ||
      item.lote.toLowerCase().includes(text) ||
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
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Lista de Registros
            </Text>
          </View>
        </View>

        {/* FILTRO */}

        <TextInput
          placeholder="Buscar por producto, lote, fecha o daño"
          placeholderTextColor="#90A4AE"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />

        {/* LISTA */}

        {search.length > 0 &&
          filteredRegisters.map((item) => (
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
                  Tipo de daño: {item.damage}
                </Text>

                <Text style={styles.info}>
                  Fecha: {item.date}
                </Text>

                {/* DESCRIPCION */}

                {/* BOTON */}

                <TouchableOpacity
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>
                    Ver detalle
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

        {/* MENSAJE VACIO */}

        {search.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Busca un registro para visualizarlo
            </Text>
          </View>
        )}

        {/* SIN RESULTADOS */}

        {search.length > 0 &&
          filteredRegisters.length === 0 && (
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

/*
  PALETA AGRIHUSAC
*/

const COLORS = {
  primary: "#2E7D32",
  background: "#F4F8F5",
  white: "#FFFFFF",
  text: "#263238",
  gray: "#D6DDE2",
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

  /*
    HEADER
  */

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },

  /*
    INPUT
  */

  input: {
    backgroundColor: COLORS.white,
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

//Carta:

  card: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
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
    color: COLORS.text,
    marginBottom: 6,
  },

  info: {
    fontSize: 12,
    color: "#607D8B",
    marginBottom: 3,
  },

//BOTON:

  button: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  /*
    ESTADOS VACIOS
  */

  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
  },

  emptyText: {
    color: "#90A4AE",
    fontSize: 14,
  },
});