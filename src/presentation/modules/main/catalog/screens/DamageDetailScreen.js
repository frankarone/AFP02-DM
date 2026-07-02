import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  SafeAreaView, 
  Dimensions, 
  TouchableOpacity, 
  Alert, 
  TextInput 
} from "react-native";
// Importamos la herramienta de almacenamiento de tu equipo
import { AppStorage } from '../../../../../infrastructure/storage/AppStorage';

const { width, height } = Dimensions.get("window");
const STORAGE_KEY = '@reportes_calidad';

export function DamageDetailScreen({ route, navigation }) {
  // Sacamos el registro que nos mandó la lista
  const { registro } = route.params || {};

  // Estados para manejar el registro actual y el modo de edición
  const [currentRegistro, setCurrentRegistro] = useState(registro);
  const [isEditing, setIsEditing] = useState(false);

  // Estados para los campos de los formularios
  const [editProduct, setEditProduct] = useState(registro?.product || "");
  const [editCantidad, setEditCantidad] = useState(String(registro?.cantidad || ""));
  const [editDamage, setEditDamage] = useState(registro?.damage || "");
  const [editDescription, setEditDescription] = useState(registro?.descripcion || registro?.description || "");

  if (!currentRegistro) {
    return (
      <View style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.info}>No se encontró la información del registro.</Text>
      </View>
    );
  }

  // Lógica de imagen
  const imageUrl = currentRegistro.imagen || currentRegistro.image || "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1200&auto=format&fit=crop";

  // === FUNCIÓN PARA ELIMINAR ===
  const handleEliminar = () => {
    Alert.alert(
      "Confirmar Eliminación", 
      "¿Estás seguro de que deseas eliminar permanentemente este registro?", 
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, Eliminar", 
          style: "destructive", 
          onPress: async () => {
            try {
              // Traemos la lista completa
              const data = await AppStorage.getJSON(STORAGE_KEY) || [];
              // Filtramos para quitar el registro que coincida con este ID
              const newData = data.filter(item => item.id !== currentRegistro.id);
              // Guardamos la nueva lista en el celular
              await AppStorage.setJSON(STORAGE_KEY, newData);
              
              Alert.alert("Eliminado", "El registro ha sido eliminado correctamente.");
              // Regresamos a la lista
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al eliminar el registro.");
              console.error(error);
            }
          }
        }
      ]
    );
  };

  // === FUNCIÓN PARA ACTUALIZAR ===
  const handleGuardarCambios = async () => {
    if (!editProduct || !editCantidad || !editDamage) {
      Alert.alert("Error", "El producto, cantidad y tipo de daño no pueden estar vacíos.");
      return;
    }

    try {
      // Traemos la lista completa
      const data = await AppStorage.getJSON(STORAGE_KEY) || [];
      // Buscamos la posición de nuestro registro
      const index = data.findIndex(item => item.id === currentRegistro.id);
      
      if (index !== -1) {
        // Actualizamos los datos en esa posición
        data[index] = {
          ...data[index],
          product: editProduct,
          cantidad: parseInt(editCantidad, 10) || 0,
          damage: editDamage,
          descripcion: editDescription
        };
        
        // Guardamos en el celular
        await AppStorage.setJSON(STORAGE_KEY, data);
        
        // Actualizamos la pantalla y cerramos el modo edición
        setCurrentRegistro(data[index]);
        setIsEditing(false);
        Alert.alert("Éxito", "El registro se ha actualizado correctamente.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar los cambios.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.content}>
          
          {/* SI ESTAMOS EN MODO EDICIÓN, MOSTRAMOS LOS INPUTS */}
          {isEditing ? (
            <View>
              <Text style={styles.label}>Producto:</Text>
              <TextInput style={styles.input} value={editProduct} onChangeText={setEditProduct} />
              
              <Text style={styles.label}>Cantidad dañada:</Text>
              <TextInput style={styles.input} value={editCantidad} onChangeText={setEditCantidad} keyboardType="numeric" />
              
              <Text style={styles.label}>Tipo de daño:</Text>
              <TextInput style={styles.input} value={editDamage} onChangeText={setEditDamage} />
              
              <Text style={styles.label}>Descripción del daño:</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                value={editDescription} 
                onChangeText={setEditDescription} 
                multiline 
              />
              
              <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => setIsEditing(false)}>
                  <Text style={styles.btnText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={handleGuardarCambios}>
                  <Text style={styles.btnText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // SI NO, MOSTRAMOS LA VISTA NORMAL DE LECTURA
            <View>
              <Text style={styles.product}>Producto: {currentRegistro.product}</Text>
              <Text style={styles.info}>Lote: {currentRegistro.lote}</Text>
              <Text style={styles.info}>Cantidad dañada: {currentRegistro.cantidad}</Text>
              <Text style={styles.info}>Tipo de daño: {currentRegistro.damage}</Text>
              <Text style={styles.info}>Fecha: {currentRegistro.date}</Text>

              <Text style={styles.descriptionTitle}>Descripción del daño</Text>
              <Text style={styles.description}>
                {currentRegistro.descripcion || currentRegistro.description || "Sin descripción adicional proporcionada al momento del registro."}
              </Text>
              
              {/* BOTONES DE ACTUALIZAR Y ELIMINAR */}
              <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.btn, styles.btnEdit]} onPress={() => setIsEditing(true)}>
                  <Text style={styles.btnText}>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnDelete]} onPress={handleEliminar}>
                  <Text style={styles.btnText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#d4d4d4" },
  page: { width: width },
  image: { width: width, height: height * 0.45, resizeMode: "cover" },
  content: { padding: 20 },
  product: { fontSize: 22, fontWeight: "800", color: "#263238", marginBottom: 14 },
  info: { fontSize: 15, color: "#546E7A", marginBottom: 8 },
  descriptionTitle: { marginTop: 24, fontSize: 18, fontWeight: "700", color: "#263238", marginBottom: 12 },
  description: { fontSize: 15, lineHeight: 28, color: "#455A64", textAlign: "justify" },
  
  // Nuevos estilos para los formularios y botones
  label: { fontSize: 15, fontWeight: "700", color: "#263238", marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#B0BEC5", borderRadius: 8, padding: 12, fontSize: 15, color: "#333" },
  textArea: { height: 100, textAlignVertical: "top" },
  actionRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 30, marginBottom: 20 },
  btn: { flex: 1, paddingVertical: 14, borderRadius: 10, alignItems: "center", marginHorizontal: 5, elevation: 2 },
  btnEdit: { backgroundColor: "#2e86de" },
  btnDelete: { backgroundColor: "#e74c3c" },
  btnSave: { backgroundColor: "#27ae60" },
  btnCancel: { backgroundColor: "#7f8c8d" },
  btnText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 15 }
});