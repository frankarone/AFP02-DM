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

    description:
      "La fruta presenta múltiples golpes en la superficie debido a una mala manipulación durante el transporte y almacenamiento. Se observan zonas oscuras y deformaciones leves que afectan la calidad visual y comercial del producto. Este tipo de daño reduce considerablemente el tiempo de conservación y acelera el proceso de descomposición.",
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

    description:
      "La fruta presenta manchas visibles causadas por humedad y exposición prolongada al calor durante el almacenamiento. Estas alteraciones afectan directamente la apariencia del producto y disminuyen su aceptación comercial. Aunque algunas piezas aún pueden consumirse, el deterioro visual evidencia una pérdida parcial de calidad.",
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

    description:
      "La fruta presenta rajaduras producidas por presión excesiva durante el apilamiento y manipulación. Las grietas exponen el interior del producto, aumentando el riesgo de contaminación, pérdida de frescura y aceleración del deterioro. Este daño afecta seriamente la comercialización del lote.",
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

    description:
      "El mango presenta golpes en diferentes zonas debido a impactos durante el traslado y manipulación. Se observan hundimientos leves y cambios de coloración en la pulpa, afectando la calidad visual y reduciendo el tiempo óptimo de consumo del producto.",
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

    description:
      "Las manchas observadas en la superficie de la manzana fueron causadas por humedad y almacenamiento inadecuado. El daño afecta principalmente la apariencia externa del producto, disminuyendo su valor comercial y generando señales tempranas de deterioro.",
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

    description:
      "Las peras presentan pequeñas rajaduras producto de una presión inadecuada durante el almacenamiento y transporte. Estas aberturas aceleran el deterioro de la fruta y aumentan la posibilidad de contaminación, reduciendo su tiempo de conservación.",
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

    description:
      "Las fresas muestran daños físicos leves ocasionados por manipulación excesiva durante la clasificación y distribución. Se observan zonas blandas y pérdida parcial de firmeza, afectando la calidad general y reduciendo la vida útil del producto.",
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

    description:
      "La piña presenta manchas externas causadas por almacenamiento prolongado y exposición constante a la humedad. Estas alteraciones reducen significativamente la calidad visual del producto y afectan negativamente su presentación comercial.",
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

    description:
      "Las uvas presentan pequeñas rajaduras y pérdida de firmeza debido a presión excesiva durante el transporte y almacenamiento. Este tipo de daño incrementa el riesgo de contaminación y acelera el proceso natural de deterioro del producto.",
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

    description:
      "La sandía presenta golpes externos y deformaciones leves ocasionadas por impactos durante el traslado y manipulación. El daño compromete la estructura interna de la fruta y disminuye considerablemente su calidad comercial.",
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

    description:
      "La papaya presenta manchas oscuras en la cáscara causadas por humedad y cambios bruscos de temperatura durante el almacenamiento. Estas alteraciones afectan la apariencia externa y evidencian una pérdida progresiva de calidad.",
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

    description:
      "Los plátanos presentan rajaduras y separación parcial de la cáscara debido a sobrepresión en cajas de almacenamiento y transporte. Este daño acelera el proceso de maduración, reduce la vida útil y afecta la calidad visual del producto.",
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
          <View
            key={item.id}
            style={styles.card}
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

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate(
                    "DamageDetail",
                    {
                      item: item,
                    }
                  )
                }
              >
                <Text style={styles.buttonText}>
                  Ver detalle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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