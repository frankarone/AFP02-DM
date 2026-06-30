import React, { useState, useCallback } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export function DamageListScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [registros, setRegistros] = useState([]);

  const cargarRegistros = async () => {
    try {
      const data = await AsyncStorage.getItem("danos");

      if (data) {
        setRegistros(JSON.parse(data));
      } else {
        setRegistros([]);
      }
    } catch (error) {
      console.log("Error cargando registros:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarRegistros();
    }, [])
  );

  const filteredRegisters = registros.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.fruta.toLowerCase().includes(text) ||
      item.tipoDano.toLowerCase().includes(text) ||
      item.cantidad.toString().toLowerCase().includes(text) ||
      (item.descripcion || "").toLowerCase().includes(text) ||
      new Date(item.fecha).toLocaleDateString().includes(text)
    );
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Registros</Text>
        </View>

        <TextInput
          placeholder="Buscar por fruta, daño, cantidad o fecha"
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
              navigation.navigate("DamageDetail", {
                dano: item,
              })
            }
          >
            {item.imagen ? (
              <Image
                source={{ uri: item.imagen }}
                style={styles.image}
              />
            ) : (
              <View style={[styles.image, styles.imagePlaceholder]}>
                <Text style={styles.placeholderText}>Sin imagen</Text>
              </View>
            )}

            <View style={styles.infoContainer}>
              <Text style={styles.product}>
                Tipo de fruta: {item.fruta}
              </Text>

              <Text style={styles.info}>
                Tipo de daño: {item.tipoDano}
              </Text>

              <Text style={styles.info}>
                Cantidad dañada: {item.cantidad}
              </Text>              

              <Text style={styles.info}>
                Fecha:{" "}
                {new Date(item.fecha).toLocaleDateString()}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("DamageDetail", {
                    dano: item,
                  })
                }
              >
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
              No hay registros de daños guardados.
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

  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    fontSize: 10,
    color: "#777",
    textAlign: "center",
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