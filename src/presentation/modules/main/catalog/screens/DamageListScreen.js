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
  ActivityIndicator
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { AppStorage } from '../../../../../infrastructure/storage/AppStorage';

const STORAGE_KEY = '@reportes_calidad';

export function DamageListScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [registrosLocales, setRegistrosLocales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useFocusEffect recarga los datos CADA VEZ que la pantalla se muestra
  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const cargarDatos = async () => {
    setIsLoading(true);
    try {
      const data = await AppStorage.getJSON(STORAGE_KEY);
      // Si hay datos los guardamos, si no, arreglo vacío
      setRegistrosLocales(data || []);
    } catch (error) {
      console.error("Error cargando lista de daños:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRegisters = registrosLocales.filter((item) => {
    const text = search.toLowerCase();
    // Validamos que las propiedades existan antes de hacer toLowerCase() para evitar errores
    const product = item.product ? item.product.toLowerCase() : "";
    const lote = item.lote ? item.lote.toLowerCase() : "";
    const cantidad = item.cantidad ? String(item.cantidad).toLowerCase() : "";
    const damage = item.damage ? item.damage.toLowerCase() : "";
    const date = item.date ? item.date.toLowerCase() : "";

    return (
      product.includes(text) ||
      lote.includes(text) ||
      cantidad.includes(text) ||
      damage.includes(text) ||
      date.includes(text)
    );
  });

  if (isLoading) {
    return (
      <View style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={{ marginTop: 10 }}>Cargando registros...</Text>
      </View>
    );
  }

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
          placeholder="Buscar por producto, lote, fecha o tipo"
          placeholderTextColor="#90A4AE"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />

        {filteredRegisters.map((item) => {
          // Lógica de imagen: Si tomó foto usa item.imagen, si es dato viejo usa item.image, si no hay usa un placeholder
          const imageUrl = item.imagen || item.image || "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1200&auto=format&fit=crop";

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("DamageDetail", { registro: item })}
            >
              <Image source={{ uri: imageUrl }} style={styles.image} />

              <View style={styles.infoContainer}>
                <Text style={styles.product}>Tipo de fruta: {item.product}</Text>
                <Text style={styles.info}>Lote: {item.lote}</Text>
                <Text style={styles.info}>Cantidad dañada: {item.cantidad}</Text>
                <Text style={styles.info}>Tipo de daño: {item.damage}</Text>
                <Text style={styles.info}>Fecha: {item.date}</Text>

                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => navigation.navigate("DamageDetail", { registro: item })}
                >
                  <Text style={styles.buttonText}>Ver detalle</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        {filteredRegisters.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron registros en el dispositivo</Text>
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