import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../../auth/store/authStore';

export function UserAdminScreen() {
  const currentUser = useAuthStore((s) => s.user);
  const users = useAuthStore((s) => s.users);
  const loadUsers = useAuthStore((s) => s.loadUsers);
  const setUserActive = useAuthStore((s) => s.setUserActive);
  const setUserRole = useAuthStore((s) => s.setUserRole);

  // Carga la lista al entrar.
  useEffect(() => {
    loadUsers();
  }, []);

  const confirmarCambio = (item) => {
    const dando = item.active; // si está activo, lo vamos a dar de baja
    Alert.alert(
      dando ? 'Dar de baja' : 'Reactivar usuario',
      `¿Seguro que deseas ${dando ? 'dar de baja' : 'reactivar'} a ${item.email}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: dando ? 'Dar de baja' : 'Reactivar',
          style: dando ? 'destructive' : 'default',
          onPress: () => setUserActive(item.email, !item.active),
        },
      ],
    );
  };

  const confirmarRol = (item) => {
    const dandoAdmin = item.role !== 'admin'; // si no es admin, lo vamos a hacer admin
    const nuevoRol = dandoAdmin ? 'admin' : 'user';
    Alert.alert(
      dandoAdmin ? 'Dar permisos de admin' : 'Quitar permisos de admin',
      `¿Seguro que deseas ${dandoAdmin ? 'convertir en administrador' : 'quitar el rol de administrador'} a ${item.email}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: dandoAdmin ? 'Hacer admin' : 'Quitar admin',
          style: dandoAdmin ? 'default' : 'destructive',
          onPress: () => setUserRole(item.email, nuevoRol),
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Administrar usuarios</Text>
      <Text style={styles.subtitulo}>
        Solo el administrador puede cambiar roles, dar de baja o reactivar cuentas.
      </Text>

      {users.map((item) => {
        const esAdmin = item.role === 'admin';
        const esYoMismo = item.email === currentUser?.email; // no se puede editar a uno mismo

        return (
          <View key={item.id} style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.nombre}>
                {item.name} {item.lastName}
              </Text>
              <Text style={styles.correo}>{item.email}</Text>

              <View style={styles.badges}>
                <Text style={[styles.badge, esAdmin ? styles.badgeAdmin : styles.badgeUser]}>
                  {esAdmin ? 'Admin' : 'Usuario'}
                </Text>
                <Text style={[styles.badge, item.active ? styles.badgeActivo : styles.badgeInactivo]}>
                  {item.active ? 'Activo' : 'Inactivo'}
                </Text>
              </View>
            </View>

            {esYoMismo ? (
              <View style={styles.bloqueado}>
                <Ionicons name="shield-checkmark-outline" size={22} color="#90A4AE" />
              </View>
            ) : (
              <View style={styles.acciones}>
                <TouchableOpacity
                  style={[styles.boton, esAdmin ? styles.botonQuitarAdmin : styles.botonAdmin]}
                  onPress={() => confirmarRol(item)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={esAdmin ? 'shield-outline' : 'shield-checkmark-outline'}
                    size={18}
                    color="#fff"
                  />
                  <Text style={styles.botonTexto}>
                    {esAdmin ? 'Quitar admin' : 'Hacer admin'}
                  </Text>
                </TouchableOpacity>

                {!esAdmin && (
                  <TouchableOpacity
                    style={[styles.boton, item.active ? styles.botonBaja : styles.botonAlta]}
                    onPress={() => confirmarCambio(item)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={item.active ? 'person-remove-outline' : 'person-add-outline'}
                      size={18}
                      color="#fff"
                    />
                    <Text style={styles.botonTexto}>
                      {item.active ? 'Dar de baja' : 'Reactivar'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        );
      })}

      {users.length === 0 && (
        <Text style={styles.vacio}>No hay usuarios registrados.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e4dede',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
  },
  correo: {
    fontSize: 13,
    color: '#607D8B',
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
  },
  badge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 6,
    overflow: 'hidden',
  },
  badgeAdmin: { backgroundColor: '#8e44ad' },
  badgeUser: { backgroundColor: '#2980b9' },
  badgeActivo: { backgroundColor: '#27ae60' },
  badgeInactivo: { backgroundColor: '#c0392b' },
  acciones: {
    alignItems: 'stretch',
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  botonBaja: { backgroundColor: '#e74c3c' },
  botonAlta: { backgroundColor: '#27ae60' },
  botonAdmin: { backgroundColor: '#8e44ad' },
  botonQuitarAdmin: { backgroundColor: '#d35400' },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
  },
  bloqueado: {
    padding: 8,
  },
  vacio: {
    textAlign: 'center',
    color: '#90A4AE',
    marginTop: 40,
  },
});
