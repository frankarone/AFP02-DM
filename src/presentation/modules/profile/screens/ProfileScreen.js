import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Switch, ScrollView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthStore } from '../../auth/store/authStore';
import type { MainStackParamList } from '../../../navigation/MainNavigator';

type Props = NativeStackScreenProps<MainStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {

  //funciones
  const user = useAuthStore((s) => s.user);

  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [nombre , setNombre] = useState('');
  const [correo , setCorreo] = useState('');
  const [foto , setFoto] = useState(null);

  const  [editando,setEditando] = useState(false);

  const [notificaciones,setNotificaciones] = useState(true);
  const [modoSimple,setModoSimple] = useState(false);

  useEffect(() => {
    if (user) {
      setNombre(user.name);
      setCorreo(user.email);
      setFoto(user.photo ?? null);
      setNotificaciones(user.notifications ?? true);
      setModoSimple(user.simpleMode ?? false);
    }
  }, [user]);

  const subirFoto = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert('Permiso requerido', 'Debe permitir acceso a la galeria');
    }
  
  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const guardarPerfil = async () => {
    await updateProfile({
      name: nombre,
      photo: foto,
      notifications: notificaciones,
      simpleMode: modoSimple,
    });

    setEditando(false);
    Alert.alert('Perfil actualizado', 'Sus cambios han sido guardados');
  };


  //frontend del profile
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Perfil de usuario</Text>

      <View style={styles.fotoContainer}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.foto} />
        ) : (
          <View style={styles.fotoVacia}>
            <Ionicons name="person" size={80} color="#ccc" />
          </View>
        )} 
        <TouchableOpacity style={styles.botonFoto} onPress={subirFoto}>
          <Text style={styles.textoBoton}>Subir foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Información personal</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          editable={editando}
        />

        <Text style={styles.label}>Usuario / Correo</Text>
        <TextInput
          style={[styles.input, styles.inputBloqueado]}
          value={correo}
          editable={false}
        />

        {!editando ? (
          <TouchableOpacity
            style={styles.botonEditar}
            onPress={() => setEditando(true)}
          >
            <Text style={styles.textoBoton}>Editar perfil</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.botonGuardar}
            onPress={guardarPerfil}
          >
            <Text style={styles.textoBoton}>Guardar cambios</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Preferencias</Text>

        <View style={styles.preferencias}>
          <Text style={styles.textoPreferencia}>Recibir notificaciones</Text>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
          />
        </View>

        <View style={styles.preferencias}>
          <Text style={styles.textoPreferencia}>Modo simple</Text>
          <Switch
            value={modoSimple}
            onValueChange={setModoSimple}           
          />
        </View>

      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Seguridad</Text>
        <TouchableOpacity 
          style={styles.botonCambiarContraseña}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Ionicons name="lock-closed" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.textoBoton}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

//estilos
const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#e4dede',
    padding: 20,
    alignItems: 'center',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    marginTop: 20,
  },

  fotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },

  fotoVacia: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#999',
  },

  botonFoto: {
    backgroundColor: '#2e86de',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    textAlign: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },

  inputBloqueado: {
    backgroundColor: '#ececec',
    color: '#888',
  },

  botonEditar: {
    backgroundColor: '#f39c12',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },

  botonGuardar: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },

  preferencias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },

  textoPreferencia: {
    fontSize: 15,
    color: '#333',
  },

  botonCambiarContraseña: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
});