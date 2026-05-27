import React, { useState } from 'react';
import { 
    View,
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView, 
    Alert, 
    FlatList 
} from 'react-native';

const REGISTRO = [
  { id: "1", product: "Palta", lote: "LOT-001", cantidad: "12", damage: "Golpe", date: "20/05/2026" },
  { id: "2", product: "Mandarina", lote: "LOT-002", cantidad: "8", damage: "Mancha", date: "19/05/2026" },
  { id: "3", product: "Naranja", lote: "LOT-003", cantidad: "15", damage: "Rajadura", date: "18/05/2026" },
  { id: "4", product: "Mango", lote: "LOT-004", cantidad: "6", damage: "Golpe", date: "17/05/2026" },
  { id: "5", product: "Manzana", lote: "LOT-005", cantidad: "11", damage: "Mancha", date: "16/05/2026" },
  { id: "6", product: "Pera", lote: "LOT-006", cantidad: "9", damage: "Rajadura", date: "15/05/2026" },
  { id: "7", product: "Fresa", lote: "LOT-007", cantidad: "20", damage: "Golpe", date: "14/05/2026" },
  { id: "8", product: "Piña", lote: "LOT-008", cantidad: "5", damage: "Mancha", date: "13/05/2026" },
  { id: "9", product: "Uva", lote: "LOT-009", cantidad: "14", damage: "Rajadura", date: "12/05/2026" },
  { id: "10", product: "Sandía", lote: "LOT-010", cantidad: "3", damage: "Golpe", date: "11/05/2026" },
  { id: "11", product: "Papaya", lote: "LOT-011", cantidad: "7", damage: "Mancha", date: "10/05/2026" },
  { id: "12", product: "Plátano", lote: "LOT-012", cantidad: "18", damage: "Rajadura", date: "09/05/2026" },
];

export default function ReporteScreen() {
  const [selectedLote, setSelectedLote] = useState('TODOS');
  const [selectedDate, setSelectedDate] = useState('TODAS');
  const [showLoteMenu, setShowLoteMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);

  const opcionesLotes = ['TODOS', ...new Set(REGISTRO.map(item => item.lote))];
  const opcionesFechas = ['TODAS', ...new Set(REGISTRO.map(item => item.date))];

  const datosFiltrados = REGISTRO.filter(item => {
    const cumpleLote = selectedLote === 'TODOS' || item.lote === selectedLote;
    const cumpleFecha = selectedDate === 'TODAS' || item.date === selectedDate;
    return cumpleLote && cumpleFecha;
  });

  const totalCantidadDañada = datosFiltrados.reduce((sum, item) => sum + parseInt(item.cantidad || 0), 0);

  const handleExportPDF = () => {
    Alert.alert(
      "Preparando documento", 
      "Generando estructura del reporte PDF...",
      [
        {
          text: "Proceder con la descarga",
          onPress: () => {
            setTimeout(() => {
              Alert.alert(
                "Descarga Completa", 
                `El archivo 'REPORTE_CALIDAD_${selectedLote}.pdf' se guardó con éxito en tu carpeta de Descargas (Downloads).`,
                [{ text: "Entendido" }]
              );
            }, 1200);
          }
        },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const handleSendEmail = () => {
    Alert.alert("Correo Enviado", `El reporte consolidado ha sido despachado al correo del cliente con éxito.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Generación de Reportes</Text>
        <Text style={styles.subtitle}>Compila y exporta los datos de control de calidad para el cliente.</Text>
      </View>

      {/* Sección de Filtros */}
      <View style={styles.filterCard}>
        <Text style={styles.sectionLabel}>Filtrar datos del reporte:</Text>
        
        {/* Selector de Lote */}
        <TouchableOpacity 
          style={styles.dropdownButton} 
          onPress={() => { setShowLoteMenu(!showLoteMenu); setShowDateMenu(false); }}
        >
          <Text style={styles.dropdownText}>Lote: {selectedLote}</Text>
          <Text style={styles.dropdownIcon}>{showLoteMenu ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showLoteMenu && (
          <View style={styles.menuContainer}>
            <FlatList
              data={opcionesLotes}
              keyExtractor={(item) => item}
              nestedScrollEnabled={true}
              renderItem={({ item: lote }) => (
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => { setSelectedLote(lote); setShowLoteMenu(false); }}
                >
                  <Text style={selectedLote === lote ? styles.menuItemActivo : styles.menuItemTexto}>{lote}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Selector de Fecha */}
        <TouchableOpacity 
          style={styles.dropdownButton} 
          onPress={() => { setShowDateMenu(!showDateMenu); setShowLoteMenu(false); }}
        >
          <Text style={styles.dropdownText}>Fecha: {selectedDate}</Text>
          <Text style={styles.dropdownIcon}>📅</Text>
        </TouchableOpacity>

        {showDateMenu && (
          <View style={styles.menuContainer}>
            <FlatList
              data={opcionesFechas}
              keyExtractor={(item) => item}
              nestedScrollEnabled={true}
              renderItem={({ item: fecha }) => (
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => { setSelectedDate(fecha); setShowDateMenu(false); }}
                >
                  <Text style={selectedDate === fecha ? styles.menuItemActivo : styles.menuItemTexto}>{fecha}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {/* Vista Previa */}
      <Text style={styles.sectionLabel}>Vista previa del documento:</Text>
      <View style={styles.previewContainer}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewDocTitle}>AGRIHUSAC - INFORME DE CALIDAD</Text>
          <Text style={styles.previewDocMeta}>
            Filtro: Lote {selectedLote} | Fecha: {selectedDate}
          </Text>
        </View>
        <View style={styles.previewDivider} />
        
        <View style={styles.previewBody}>
          <Text style={styles.metaResumen}>Resumen de Hallazgos ({datosFiltrados.length} items):</Text>
          
          <ScrollView style={styles.miniList} nestedScrollEnabled={true}>
            {datosFiltrados.map((item) => (
              <Text key={item.id} style={styles.previewPlaceholderText}>
                • {item.product} ({item.lote}) - {item.cantidad} unds por {item.damage} [{item.date}]
              </Text>
            ))}
          </ScrollView>

          <View style={styles.previewDivider} />
          <Text style={styles.totalTexto}>Volumen Total de Daños: <Text style={styles.totalNumero}>{totalCantidadDañada} Unidades</Text></Text>
        </View>
      </View>

      {/* Botones de Acción */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.pdfButton]} onPress={handleExportPDF} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>📄 Generar Reporte PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.emailButton]} onPress={handleSendEmail} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>✉️ Enviar por Correo al Cliente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4dede',
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
    color: '#222',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'center',
  },
  filterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#160303',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
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
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#64748B',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 10,
    maxHeight: 150, 
    overflow: 'hidden',
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemTexto: {
    fontSize: 14,
    color: '#334155',
  },
  menuItemActivo: {
    fontSize: 14,
    color: '#2e86de',
    fontWeight: 'bold',
  },
  previewContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#160303',
    borderStyle: 'dashed',
    padding: 16,
    marginBottom: 24,
  },
  previewHeader: {
    alignItems: 'center',
    marginBottom: 6,
  },
  previewDocTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  previewDocMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  previewDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  previewBody: {
    marginTop: 4,
  },
  metaResumen: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
  },
  miniList: {
    maxHeight: 120,
  },
  previewPlaceholderText: {
    fontSize: 12,
    color: '#334155',
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  totalTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'right',
  },
  totalNumero: {
    color: '#27ae60',
    fontSize: 14,
  },
  actionContainer: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#160303',
  },
  pdfButton: {
    backgroundColor: '#2e86de',
  },
  emailButton: {
    backgroundColor: '#27ae60',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});