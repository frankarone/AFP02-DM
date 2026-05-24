import React, { useState, useEffect } from "react";
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
import * as Progress from "react-native-progress";

export function DashboardScreen() {
  const { user, logout } = useAuthStore();
  const [value, setValue] = useState(0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Buenos días";
    if (h < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  //ANIMACION DE PROGRESO
  useEffect(() => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += 0.05;
      if (progress >= 1) {
        progress = 1;
        clearInterval(interval);
      }
      setValue(progress);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../../../../../../assets/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        {/* BIENVENIDA */}
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>{greeting()},</Text>
          <Text style={styles.userName}>{user?.name ?? "Usuario"}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Sistema AGRIHUSAC 🌱</Text>
          </View>
        </View>

        {/* DASHBOARD */}
        <View style={styles.modulesContainer}>
          {/* REGISTROS */}
          <TouchableOpacity activeOpacity={0.9} style={styles.moduleCard}>
            <Text style={styles.cardTitle}>Registros de Daños</Text>

            <View style={styles.previewGrid}>
              {[1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  source={{ uri: `https://picsum.photos/200/200?random=${i}` }}
                  style={styles.smallImage}
                />
              ))}
            </View>
          </TouchableOpacity>

          {/* PROGRESO */}
          <TouchableOpacity activeOpacity={0.9} style={styles.moduleCard}>
            <Text style={styles.cardTitle}>Estado del Sistema</Text>

            <View style={styles.previewGrid}>
              <View style={styles.chartBox}>
                <Progress.Circle
                  size={85}
                  progress={value}
                  thickness={8}
                  color="#2E7D32"
                  unfilledColor="#E8F5E9"
                  borderWidth={0}
                  showsText={true}
                  formatText={() => `${Math.round(value * 100)}%`}
                />
                <Text style={styles.chartText}>Progreso</Text>
              </View>

              <View style={styles.chartBox}>
                <Progress.Circle
                  size={85}
                  progress={0.3}
                  thickness={8}
                  color="#8D6E63"
                  unfilledColor="#EFEBE9"
                  borderWidth={0}
                  showsText={true}
                  formatText={() => `30%`}
                />
                <Text style={styles.chartText}>Daños</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* PALETA AGRIHUSAC */
const COLORS = {
  primary: "#2E7D32",
  secondary: "#66BB6A",
  accent: "#A5D6A7",
  earth: "#8D6E63",
  background: "#F4F8F5",
  white: "#FFFFFF",
  text: "#263238",
};

/* ESTILOS */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    padding: 20,
    paddingBottom: 50,
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
    backgroundColor: "#D32F2F",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 25,
  },

  logoutText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  greetingBox: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 20,
    marginBottom: 28,
  },

  greeting: {
    color: COLORS.accent,
    fontSize: 14,
  },

  userName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 4,
  },

  badge: {
    marginTop: 10,
    backgroundColor: "#1B5E20",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  badgeText: {
    color: "#C8E6C9",
    fontSize: 11,
    fontWeight: "600",
  },

  modulesContainer: {
    gap: 20,
  },

  moduleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
    color: COLORS.text,
  },

  previewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  smallImage: {
    width: "48%",
    height: 90,
    borderRadius: 14,
    marginBottom: 10,
  },

  chartBox: {
    width: "48%",
    alignItems: "center",
    backgroundColor: "#F1F8E9",
    padding: 14,
    borderRadius: 14,
  },

  chartText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
});
