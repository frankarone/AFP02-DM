import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';
import { useAuthStore } from '../../../auth/store/authStore';

type QuickCard = { label: string; icon: string; color: string };

const CARDS: QuickCard[] = [

];

export function DashboardScreen() {
  const { user, logout } = useAuthStore();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días';
    if (h < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

<<<<<<< Updated upstream
=======
  const verRegistros = () => {
    navigation.navigate('ListDano');
  };

  const generarReportes = () => {
    navigation.navigate('Reporte'); 
  };

  const perfilUsuario = () => {
    navigation.navigate('Profile');
  };

  const { logout } = useAuthStore();
  const cerrarSesion = () => {
    logout();
  };

  //frontend del dashboard
>>>>>>> Stashed changes
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../../../../../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Saludo */}
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>{greeting()},</Text>
          <Text style={styles.userName}>{user?.name ?? 'Usuario'}</Text>
          <Text style={styles.subGreeting}>Bienvenido al sistema AGRIHUSAC</Text>
        </View>

        {/* Módulos rápidos */}
        <Text style={styles.sectionTitle}>Módulos</Text>
        <View style={styles.grid}>
          {CARDS.map(card => (
            <TouchableOpacity key={card.label} style={[styles.card, { backgroundColor: card.color }]} activeOpacity={0.75}>
              <Text style={styles.cardIcon}>{card.icon}</Text>
              <Text style={styles.cardLabel}>{card.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

    
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F7FA' },
  scroll: { padding: 20 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  logo: { width: 140, height: 60 },
  logoutBtn: { backgroundColor: '#B22222', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  logoutText: { color: '#fff', fontSize: 13, fontWeight: '600' },

  greetingBox: { backgroundColor: '#2E7D32', borderRadius: 5, padding: 20, marginBottom: 28 },
  greeting: { color: '#A5D6A7', fontSize: 14 },
  userName: { color: '#fff', fontSize: 22, fontWeight: '700', marginTop: 2 },
  subGreeting: { color: '#C8E6C9', fontSize: 13, marginTop: 4 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  card: { width: '47%', borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center' },
  cardIcon: { fontSize: 32, marginBottom: 8 },
  cardLabel: { fontSize: 14, fontWeight: '600', color: '#333' },

  sessionBox: { backgroundColor: '#fff', borderRadius: 12, padding: 16},
  sessionTitle: { fontSize: 13, fontWeight: '700', color: '#6B93B0', marginBottom: 4 },
  sessionEmail: { fontSize: 14, color: '#333', fontWeight: '600' },
  sessionHint: { fontSize: 12, color: '#999', marginTop: 4 },
});
