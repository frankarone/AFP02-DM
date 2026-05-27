import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../../auth/store/authStore";

export function RegistroDanoScreen() {
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === "admin";

  const [fruta, setFruta] = useState("");
  const [tipoDano, setTipoDano] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert("Permiso requerido", "Debes permitir acceso a la cámara");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets?.[0]?.uri;
      if (uri) setImagen(uri);
    }
  };

  const elegirDesdeGaleria = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets?.[0]?.uri;
      if (uri) setImagen(uri);
    }
  };

  const guardarRegistro = () => {
    if (!fruta || !tipoDano || !cantidad) {
      Alert.alert("Error", "Completa los campos obligatorios");
      return;
    }

    const nuevoRegistro = {
      fruta,
      tipoDano,
      cantidad,
      descripcion,
      imagen,
      fecha: new Date(),
    };

    console.log(nuevoRegistro);
    Alert.alert("Éxito", "Daño registrado correctamente");

    setFruta("");
    setTipoDano("");
    setCantidad("");
    setDescripcion("");
    setImagen(null);
  };

  // Solo los administradores pueden registrar daños (modo consulta para usuarios).
  if (!isAdmin) {
    return (
      <View style={styles.bloqueado}>
        <Ionicons name="lock-closed-outline" size={60} color="#e74c3c" />
        <Text style={styles.bloqueadoTitulo}>Acceso restringido</Text>
        <Text style={styles.bloqueadoTexto}>
          Solo los administradores pueden registrar daños. Tu cuenta está en modo consulta.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ ...styles.container, justifyContent: "center" }}>
      <Text style={styles.titulo}>Registrar Daño</Text>

      <View style={styles.card}>
        <Input label="Tipo de fruta *" value={fruta} onChange={setFruta} placeholder="Ej: Mango" />
        <Input label="Tipo de daño *" value={tipoDano} onChange={setTipoDano} placeholder="Ej: Golpe" />
        <Input label="Cantidad *" value={cantidad} onChange={setCantidad} placeholder="Ej: 10" keyboard="numeric" />
        <Input label="Descripción" value={descripcion} onChange={setDescripcion} multiline />

        {/* Botones de imagen */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.btnSecundario} onPress={tomarFoto}>
            <Ionicons name="camera-outline" size={20} color="#fff" />
            <Text style={styles.textoBtn}>Cámara</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecundario} onPress={elegirDesdeGaleria}>
            <Ionicons name="image-outline" size={20} color="#fff" />
            <Text style={styles.textoBtn}>Galería</Text>
          </TouchableOpacity>
        </View>

        {/* Preview */}
        {imagen && (
          <Image source={{ uri: imagen }} style={styles.imagenPreview} />
        )}

        {/* Botón principal */}
        <TouchableOpacity style={styles.boton} onPress={guardarRegistro}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.textoBoton}>Guardar Registro</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* Componente reutilizable */
function Input({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
  keyboard = "default",
}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        multiline={multiline}
        keyboardType={keyboard}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e4dede",
    flexGrow: 1,
  },

  bloqueado: {
    flex: 1,
    backgroundColor: "#e4dede",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  bloqueadoTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e74c3c",
    marginTop: 15,
    marginBottom: 10,
  },

  bloqueadoTexto: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },

  card: {
    backgroundColor: "#c0fa8a",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#160303",
  },

  label: {
    marginTop: 10,
    fontWeight: "600",
    color: "#222",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    marginTop: 5,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  btnSecundario: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e86de",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    justifyContent: "center",
  },

  imagenPreview: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 2,
    borderColor: "#000",
  },

  boton: {
    marginTop: 20,
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },

  textoBtn: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "600",
  },
});