import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../../auth/store/authStore';

export function UserAdminScreen({ navigation }) {
  const currentUser = useAuthStore((s) => s.user);
  const users = useAuthStore((s) => s.users);
  const loadUsers = useAuthStore((s) => s.loadUsers);
  const setUserActive = useAuthStore((s) => s.setUserActive);
  const setUserRole = useAuthStore((s) => s.setUserRole);

  // Carga la lista al entrar.
  useEffect(() => {
    loadUsers();
  }, []);

  const confirmar = (titulo, mensaje, textoConfirmar) => {
    if (Platform.OS === 'web') {
      return Promise.resolve(window.confirm(`${titulo}\n\n${mensaje}`));
    }
    return new Promise((resolve) => {
      Alert.alert(titulo, mensaje, [
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
        { text: textoConfirmar, onPress: () => resolve(true) },
      ]);
    });
  };

  const confirmarCambio = async (item) => {
    const dando = item.active;
    const ok = await confirmar(
      dando ? 'Dar de baja' : 'Reactivar usuario',
      `¿Seguro que deseas ${dando ? 'dar de baja' : 'reactivar'} a ${item.email}?`,
      dando ? 'Dar de baja' : 'Reactivar',
    );
    if (!ok) return;

    try {
      await setUserActive(item.email, !item.active);
      Alert.alert(
        'Listo',
        dando
          ? `Se dio de baja a ${item.email}.`
          : `Se reactivó la cuenta de ${item.email}.`,
      );
    } catch (e) {
      Alert.alert('Error', e?.message ?? 'No se pudo actualizar el estado del usuario.');
    }
  };

  const confirmarRol = async (item) => {
    const esAdmin = item.role === 'admin';
    const nuevoRol = esAdmin ? 'user' : 'admin';
    const ok = await confirmar(
      esAdmin ? 'Quitar permisos de admin' : 'Dar permisos de admin',
      esAdmin
        ? `¿Seguro que deseas quitar el rol de administrador a ${item.email}? Pasará a ser usuario normal.`
        : `¿Seguro que deseas convertir a ${item.email} en administrador?`,
      esAdmin ? 'Quitar admin' : 'Hacer admin',
    );
    if (!ok) return;

    try {
      await setUserRole(item.email, nuevoRol);
      Alert.alert(
        'Rol actualizado',
        esAdmin
          ? `${item.email} ya no es administrador.`
          : `${item.email} ahora es administrador.`,
      );
    } catch (e) {
      Alert.alert('Error', e?.message ?? 'No se pudo cambiar el rol del usuario.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Administrar usuarios</Text>
      <Text style={styles.subtitulo}>
        Solo el administrador puede crear usuarios, cambiar roles, dar de baja o reactivar cuentas.
      </Text>

      <TouchableOpacity
        style={styles.botonCrear}
        onPress={() => navigation.navigate('CreateUser')}
        activeOpacity={0.8}
      >
        <Ionicons name="person-add-outline" size={20} color="#fff" />
        <Text style={styles.botonCrearTexto}>Crear usuario</Text>
      </TouchableOpacity>

      {users.map((item) => {
        const esAdmin = item.role === 'admin';
        const esYoMismo =
          item.email?.trim().toLowerCase() === currentUser?.email?.trim().toLowerCase();

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
    marginBottom: 16,
  },
  botonCrear: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a085',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  botonCrearTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
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
