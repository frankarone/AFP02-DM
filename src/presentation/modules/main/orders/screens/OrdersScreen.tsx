import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export function OrdersScreen() {
  // Estados simulados para la interfaz visual
  const [selectedBatch, setSelectedBatch] = useState('Seleccionar Lote...');
  const [selectedRange, setSelectedRange] = useState('Seleccionar Rango de Fechas...');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Encabezado de la Pantalla */}
      <View style={styles.header}>
        <Text style={styles.title}>Generación de Reportes</Text>
        <Text style={styles.subtitle}>Compila y exporta los datos de control de calidad para el cliente.</Text>
      </View>

      {/* Sección de Filtros de Selección */}
      <View style={styles.filterCard}>
        <Text style={styles.sectionLabel}>Filtrar datos del reporte:</Text>
        
        {/* Selector de Lote Simulado */}
        <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.7}>
          <Text style={styles.dropdownText}>{selectedBatch}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {/* Selector de Rango de Fechas Simulado */}
        <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.7}>
          <Text style={styles.dropdownText}>{selectedRange}</Text>
          <Text style={styles.dropdownIcon}>📅</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor de Vista Previa Simbólica */}
      <Text style={styles.sectionLabel}>Vista previa del documento:</Text>
      <View style={styles.previewContainer}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewDocTitle}>AGRIHUSAC - INFORME DE CALIDAD</Text>
          <Text style={styles.previewDocMeta}>Fecha: --/--/2026 | Estado: Pendiente</Text>
        </View>
        <View style={styles.previewDivider} />
        <View style={styles.previewBody}>
          <Text style={styles.previewPlaceholderText}>• Resumen de daños detectados en fruta...</Text>
          <Text style={styles.previewPlaceholderText}>• Registro fotográfico adjunto consolidado...</Text>
          <Text style={styles.previewPlaceholderText}>• Trazabilidad de lotes seleccionados...</Text>
        </View>
      </View>

      {/* Botones de Acción de Reporte */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.pdfButton]} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>📄 Generar Reporte PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.emailButton]} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>✉️ Enviar por Correo al Cliente</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 24,
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
  filterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 10,
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
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#64748B',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#64748B',
  },
  previewContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    padding: 20,
    minHeight: 150,
    marginBottom: 28,
    justifyContent: 'center',
  },
  previewHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  previewDocTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  previewDocMeta: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  previewDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  previewBody: {
    marginTop: 8,
  },
  previewPlaceholderText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  actionContainer: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfButton: {
    backgroundColor: '#3B82F6',
  },
  emailButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});