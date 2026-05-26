import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../../auth/store/authStore';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {

  // funciones
  const navigation = useNavigation<any>();

  const registrarDano = () => {
    Alert.alert('Registrar daño', 'Aquí irá la pantalla para registrar daños de fruta');
  };

  const verRegistros = () => {
    Alert.alert('Ver registros', 'Aquí se mostrarán los registros guardados');
  };

  const generarReportes = () => {
    Alert.alert('Generar reportes', 'Aquí se generará el reporte para el cliente');
  };

  const perfilUsuario = () => {
    navigation.navigate('Profile');
  };

  const { logout } = useAuthStore();
  const cerrarSesion = () => {
    logout();
  };

  //frontend del dashboard
  return (
    <View style={styles.container}>      
      <Text style={styles.titulo}>OPERACIONES</Text>  
      <Text style={styles.subtitulo}>Control de daños de frutas</Text>

      {/* contenedor de opciones */}
      <View style={styles.grid}>

        <TouchableOpacity style={styles.card} onPress={registrarDano}>
          <Ionicons name="create-outline" size={35} color="#2e86de" />
          <Text style={styles.textoCard}>Registrar daño</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.card} onPress={verRegistros}>
          <Ionicons name="list-outline" size={35} color="#27ae60" />
          <Text style={styles.textoCard}>Ver registros</Text>
        </TouchableOpacity>

  
        <TouchableOpacity style={styles.card} onPress={generarReportes}>
          <Ionicons name="document-text-outline" size={35} color="#f39c12" />
          <Text style={styles.textoCard}>Generar reportes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={perfilUsuario}>
          <Ionicons name="person-outline" size={35} color="#9b59b6" />
          <Text style={styles.textoCard}>Perfil de usuario</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.card} onPress={cerrarSesion}>
          <Ionicons name="log-out-outline" size={35} color="#e74c3c" />
          <Text style={styles.textoCard}>Cerrar sesión</Text>
        </TouchableOpacity>

      </View>

      {/*puntos*/}
      <View style={styles.puntos}>
        <View style={styles.puntoVacio} />
        <View style={styles.puntoActivo} />
        <View style={styles.puntoVacio} />
        <View style={styles.puntoVacio} />
        <View style={styles.puntoVacio} />
      </View>

    </View>
  );
}

//estilos
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#e4dede',
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 5,
  },

  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '47%',
    height: 130,
    backgroundColor: '#c0fa8a',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#160303',
  },

  textoCard: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },

  puntos: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  puntoActivo: {
    width: 12,
    height: 12,
    backgroundColor: '#000',
    borderRadius: 6,
    marginHorizontal: 6,
  },

  puntoVacio: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    marginHorizontal: 6,
  },
});