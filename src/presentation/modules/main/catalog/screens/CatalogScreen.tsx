import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export function CatalogScreen() {
  // Estados simulados para la UI del formulario
  const [batch, setBatch] = useState('Seleccionar Lote...');
  const [fruitType, setFruitType] = useState('Seleccionar Fruta...');
  const [damageType, setDamageType] = useState('Seleccionar Defecto...');
  const [quantity, setQuantity] = useState('');
  const [observations, setObservations] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Nueva Inspección</Text>
        <Text style={styles.subtitle}>Registre los defectos detectados en la fruta ingresante para el control de calidad.</Text>
      </View>

      {/* Formulario Core */}
      <View style={styles.formCard}>
        
        {/* Selector de Lote */}
        <Text style={styles.inputLabel}>Lote específico *</Text>
        <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.7}>
          <Text style={styles.dropdownText}>{batch}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {/* Selector de Tipo de Fruta */}
        <Text style={styles.inputLabel}>Tipo de Fruta *</Text>
        <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.7}>
          <Text style={styles.dropdownText}>{fruitType}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {/* Selector de Tipo de Daño */}
        <Text style={styles.inputLabel}>Tipo de Daño / Defecto *</Text>
        <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.7}>
          <Text style={styles.dropdownText}>{damageType}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {/* Campo de Cantidad Afectada */}
        <Text style={styles.inputLabel}>Cantidad Afectada (Kg / %) *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ej. 45 o 15%"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />

        {/* Campo de Observaciones */}
        <Text style={styles.inputLabel}>Observaciones adicionales</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Detalles sobre el estado físico de la fruta..."
          placeholderTextColor="#94A3B8"
          multiline={true}
          numberOfLines={4}
          value={observations}
          onChangeText={setObservations}
        />
      </View>

      {/* Sección de Evidencia Fotográfica */}
      <Text style={styles.sectionLabel}>Respaldo y Evidencia Fotográfica *</Text>
      <View style={styles.imageSectionCard}>
        <View style={styles.previewBox}>
          <Text style={styles.previewPlaceholderText}>📸 Sin evidencia capturada</Text>
        </View>

        {/* Botones de captura y galería */}
        <View style={styles.photoActionsRow}>
          <TouchableOpacity style={[styles.photoButton, styles.cameraBtn]} activeOpacity={0.8}>
            <Text style={styles.photoButtonText}>📷 Abrir Cámara</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.photoButton, styles.galleryBtn]} activeOpacity={0.8}>
            <Text style={styles.photoButtonText}>🖼️ Galería</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón de Envío Final */}
      <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
        <Text style={styles.submitButtonText}>Guardar Registro de Inspección</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 6,
    marginTop: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#64748B',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#94A3B8',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 10,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 10,
  },
  imageSectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    marginBottom: 24,
    alignItems: 'center',
  },
  previewBox: {
    width: '100%',
    height: 140,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  previewPlaceholderText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  photoActionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  photoButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBtn: {
    backgroundColor: '#475569', // Gris oscuro corporativo para hardware
  },
  galleryBtn: {
    backgroundColor: '#64748B', // Gris secundario para multimedia
  },
  photoButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#2E7D32', // Verde oficial de AGRIHUSAC que definieron en MainNavigator
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});