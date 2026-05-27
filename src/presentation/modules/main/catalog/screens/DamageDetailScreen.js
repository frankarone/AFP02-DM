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
      "La fruta presenta múltiples golpes en la superficie debido a una mala manipulación durante el transporte y almacenamiento. Se observan zonas oscuras y deformaciones leves que afectan la calidad visual y comercial del producto. El daño reduce el tiempo de conservación y puede acelerar el proceso de descomposición.",
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
      "La fruta presenta manchas visibles causadas por humedad y exposición prolongada al calor. Estas manchas afectan la apariencia del producto y disminuyen su aceptación comercial. Aunque algunas piezas siguen siendo consumibles, el deterioro visual indica pérdida parcial de calidad.",
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
      "La fruta presenta rajaduras producidas por presión excesiva durante el apilamiento. Las grietas exponen el interior de la fruta y aumentan el riesgo de contaminación y pérdida de frescura. Este tipo de daño compromete seriamente la comercialización del lote.",
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
      "El mango presenta golpes en diferentes zonas debido a impactos durante el traslado. Se observan cambios de coloración y hundimientos en la pulpa, lo que afecta directamente la calidad y presentación del producto.",
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
      "Las manchas observadas en la superficie de la manzana fueron causadas por exposición prolongada a humedad. El daño afecta la apariencia externa y disminuye el valor comercial del producto.",
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
      "Las peras presentan pequeñas rajaduras en la superficie producto de una presión inadecuada durante el almacenamiento. Esto acelera el deterioro y reduce la vida útil del producto.",
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
      "Las fresas muestran daños físicos leves ocasionados por manipulación excesiva. Se observan zonas blandas y pérdida parcial de firmeza, afectando la calidad del producto.",
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
      "La piña presenta manchas externas causadas por almacenamiento prolongado y contacto con humedad. Esto reduce la calidad visual y comercial del producto.",
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
      "Las uvas presentan pequeñas rajaduras y pérdida de firmeza debido a presión durante el transporte. Esto genera riesgo de contaminación y deterioro acelerado.",
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
      "La sandía presenta golpes externos y deformaciones leves debido a impactos durante el traslado. El daño afecta la estructura interna y disminuye la calidad.",
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
      "La papaya presenta manchas oscuras en la cáscara causadas por humedad y cambios bruscos de temperatura durante el almacenamiento.",
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
      "Los plátanos presentan rajaduras y separación parcial de la cáscara debido a sobrepresión en cajas de almacenamiento. El daño acelera la maduración y deterioro.",
  },
];

export function DamageDetailScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {REGISTRO.map((item) => (
          <ScrollView
            key={item.id}
            style={styles.page}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.content}>
              <Text style={styles.product}>
                Producto: {item.product}
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

              <Text style={styles.descriptionTitle}>
                Descripción del daño
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
          </ScrollView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#d4d4d4",
  },

  page: {
    width: width,
  },

  image: {
    width: width,
    height: height * 0.45,
    resizeMode: "cover",
  },

  content: {
    padding: 20,
  },

  product: {
    fontSize: 22,
    fontWeight: "800",
    color: "#263238",
    marginBottom: 14,
  },

  info: {
    fontSize: 15,
    color: "#546E7A",
    marginBottom: 8,
  },

  descriptionTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: "700",
    color: "#263238",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 28,
    color: "#455A64",
    textAlign: "justify",
  },
});