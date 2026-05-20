import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useAuthStore } from "../../../auth/store/authStore";

export function DashboardScreen() {
  const { user, logout } = useAuthStore();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Buenos días";
    if (h < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../../../../../assets/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Saludo */}
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>{greeting()},</Text>
          <Text style={styles.userName}>{user?.name ?? "Usuario"}</Text>
          <Text style={styles.subGreeting}>
            Bienvenido al sistema AGRIHUSAC
          </Text>
        </View>

        {/* Módulos rápidos */}
        {/* <Text style={styles.sectionTitle}>Módulos</Text> */}
        <View style={styles.modulesContainer}>
          {/* 🔴 REGISTROS DE DAÑOS */}
          <View style={[styles.moduleCard, { backgroundColor: "#E3F2FD" }]}>
            <Text style={styles.cardTitle}>Registros de Daños</Text>

            <View style={styles.previewGrid}>
              {[1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  source={{
                    uri: `https://via.placeholder.com/100x80.png?text=Daño+${i}`,
                  }}
                  style={styles.smallImage}
                />
              ))}
            </View>
          </View>

          {/* 🟠 GRÁFICOS */}
          <View style={[styles.moduleCard, { backgroundColor: "#FFF3E0" }]}>
            <Text style={styles.cardTitle}>Gráficos</Text>

            <View style={styles.previewGrid}>
              {[1, 2].map((i) => (
                <Image
                  key={i}
                  source={{
                    uri: `https://via.placeholder.com/150x100.png?text=Grafico+${i}`,
                  }}
                  style={styles.chartImage}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scroll: {
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  logo: {
    width: 140,
    height: 60,
  },

  logoutBtn: {
    backgroundColor: "#B22222",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  logoutText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  greetingBox: {
    backgroundColor: "#2E7D32",
    borderRadius: 8,
    padding: 20,
    marginBottom: 28,
  },

  greeting: {
    color: "#A5D6A7",
    fontSize: 14,
  },

  userName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 2,
  },

  subGreeting: {
    color: "#C8E6C9",
    fontSize: 13,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 14,
  },

  modulesContainer: {
    gap: 16,
  },

  moduleCard: {
    borderRadius: 16,
    padding: 16,

    // sombra (mejora visual)
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },

  previewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  smallImage: {
    width: "48%",
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },

  chartImage: {
    width: "48%",
    height: 100,
    borderRadius: 10,
  },
});
