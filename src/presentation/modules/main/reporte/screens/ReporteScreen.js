import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// Importamos la herramienta creada por tu equipo
import { AppStorage } from '../../../../../infrastructure/storage/AppStorage';

// IMPORTAMOS LAS NUEVAS LIBRERÍAS PARA PDF
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const STORAGE_KEY = '@reportes_calidad'; // Llave secreta donde guardaremos nuestra lista

export default function ReporteScreen() {
  const [datosBrutos, setDatosBrutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedLote, setSelectedLote] = useState('TODOS');
  const [selectedDate, setSelectedDate] = useState('TODAS');
  const [showLoteMenu, setShowLoteMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);

  // Usamos useFocusEffect para que la pantalla lea los datos nuevos CADA VEZ que entras a ella
  useFocusEffect(
    useCallback(() => {
      cargarDatosLocales();
    }, [])
  );

  const cargarDatosLocales = async () => {
    try {
      setIsLoading(true);
      // 1. Leemos el disco duro del celular usando la función de tu equipo
      let data = await AppStorage.getJSON(STORAGE_KEY);

      // 2. Si está vacío (es la primera vez que se abre la app), inyectamos datos semilla
      if (!data || data.length === 0) {
        data = [
          { id: 1, product: 'Palta', lote: 'LOT-001', cantidad: 12, damage: 'Golpe', date: '20/05/2026' },
          { id: 2, product: 'Mandarina', lote: 'LOT-002', cantidad: 8, damage: 'Mancha', date: '19/05/2026' },
          { id: 3, product: 'Naranja', lote: 'LOT-003', cantidad: 15, damage: 'Rajadura', date: '18/05/2026' },
          { id: 4, product: 'Mango', lote: 'LOT-004', cantidad: 6, damage: 'Golpe', date: '17/05/2026' },
          { id: 5, product: 'Manzana', lote: 'LOT-005', cantidad: 11, damage: 'Mancha', date: '16/05/2026' }
        ];
        // Los guardamos físicamente en el celular
        await AppStorage.setJSON(STORAGE_KEY, data);
      }

      // 3. Pasamos los datos a la pantalla
      setDatosBrutos(data);
    } catch (error) {
      Alert.alert("Error de Almacenamiento", "No se pudieron leer los datos locales.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const opcionesLotes = ['TODOS', ...new Set(datosBrutos.map(item => item.lote))];
  const opcionesFechas = ['TODAS', ...new Set(datosBrutos.map(item => item.date))];

  const datosFiltrados = datosBrutos.filter(item => {
    const cumpleLote = selectedLote === 'TODOS' || item.lote === selectedLote;
    const cumpleFecha = selectedDate === 'TODAS' || item.date === selectedDate;
    return cumpleLote && cumpleFecha;
  });

  const totalCantidadDañada = datosFiltrados.reduce((sum, item) => sum + parseInt(item.cantidad || 0), 0);

  // === FUNCIÓN PARA GENERAR EL PDF REAL ===
  const handleExportPDF = async () => {
    if (datosFiltrados.length === 0) {
      Alert.alert("Sin datos", "No hay registros para exportar con estos filtros.");
      return;
    }

    try {
      // 1. Calculamos las estadísticas para el gráfico (Agrupamos por tipo de daño)
      const estadisticasDaño = {};
      datosFiltrados.forEach(item => {
        const daño = item.damage || 'Desconocido';
        const cantidad = parseInt(item.cantidad || 0);
        if (estadisticasDaño[daño]) {
          estadisticasDaño[daño] += cantidad;
        } else {
          estadisticasDaño[daño] = cantidad;
        }
      });

      // 2. Preparamos los datos para QuickChart
      const etiquetasGrafico = Object.keys(estadisticasDaño);
      const valoresGrafico = Object.values(estadisticasDaño);
      
      const chartConfig = {
        type: 'doughnut', // Gráfico de dona (Circular)
        data: {
          labels: etiquetasGrafico,
          datasets: [{ data: valoresGrafico, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] }]
        },
        options: { title: { display: true, text: 'Distribución de Daños' } }
      };

      // Convertimos la configuración en una URL de imagen
      const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}&w=400&h=250`;

      // 3. Construimos la tabla de registros en HTML
      let filasTabla = '';
      datosFiltrados.forEach(item => {
        filasTabla += `
          <tr>
            <td>${item.product}</td>
            <td>${item.lote}</td>
            <td>${item.damage}</td>
            <td>${item.cantidad}</td>
            <td>${item.date}</td>
          </tr>
        `;
      });

      // 4. Diseñamos el documento HTML final
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Helvetica, sans-serif; padding: 20px; color: #333; }
              h1 { color: #2e86de; text-align: center; }
              .header { text-align: center; margin-bottom: 30px; }
              .stats-container { display: flex; justify-content: space-around; align-items: center; margin-bottom: 40px; }
              .summary-box { background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 5px solid #27ae60; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
              th { background-color: #2e86de; color: white; }
              .chart { text-align: center; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>AGRIHUSAC - INFORME OFICIAL DE CALIDAD</h1>
              <p><strong>Filtros aplicados:</strong> Lote: ${selectedLote} | Fecha: ${selectedDate}</p>
              <p>Fecha de generación: ${new Date().toLocaleDateString()}</p>
            </div>

            <div class="stats-container">
              <div class="summary-box">
                <h2>Total de Registros: ${datosFiltrados.length}</h2>
                <h2>Volumen Total Dañado: <span style="color: #27ae60;">${totalCantidadDañada}</span> unidades</h2>
              </div>
              <div class="chart">
                <img src="${chartUrl}" />
              </div>
            </div>

            <h3>Detalle de Registros Evaluados</h3>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Lote</th>
                  <th>Tipo de Daño</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                ${filasTabla}
              </tbody>
            </table>
          </body>
        </html>
      `;

      // 5. Generamos el PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false
      });

      // 6. Abrimos el menú para compartir/guardar el archivo generado
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Descargar Reporte de Calidad',
        UTI: 'com.adobe.pdf'
      });

    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al generar el PDF.");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2e86de" />
        <Text style={{ marginTop: 15, color: '#333', fontWeight: 'bold' }}>Leyendo memoria interna...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Generación de Reportes</Text>
        <Text style={styles.subtitle}>Compila y exporta los datos de control de calidad con gráficas estadísticas.</Text>
      </View>

      <View style={styles.filterCard}>
        <Text style={styles.sectionLabel}>Filtrar datos del reporte:</Text>
        <TouchableOpacity style={styles.dropdownButton} onPress={() => { setShowLoteMenu(!showLoteMenu); setShowDateMenu(false); }}>
          <Text style={styles.dropdownText}>Lote: {selectedLote}</Text>
          <Text style={styles.dropdownIcon}>{showLoteMenu ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showLoteMenu && (
          <View style={styles.menuContainer}>
            <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 150 }}>
              {opcionesLotes.map((lote) => (
                <TouchableOpacity key={lote} style={styles.menuItem} onPress={() => { setSelectedLote(lote); setShowLoteMenu(false); }}>
                  <Text style={selectedLote === lote ? styles.menuItemActivo : styles.menuItemTexto}>{lote}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        <TouchableOpacity style={styles.dropdownButton} onPress={() => { setShowDateMenu(!showDateMenu); setShowLoteMenu(false); }}>
          <Text style={styles.dropdownText}>Fecha: {selectedDate}</Text>
          <Text style={styles.dropdownIcon}>📅</Text>
        </TouchableOpacity>
        {showDateMenu && (
          <View style={styles.menuContainer}>
            <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 150 }}>
              {opcionesFechas.map((fecha) => (
                <TouchableOpacity key={fecha} style={styles.menuItem} onPress={() => { setSelectedDate(fecha); setShowDateMenu(false); }}>
                  <Text style={selectedDate === fecha ? styles.menuItemActivo : styles.menuItemTexto}>{fecha}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <Text style={styles.sectionLabel}>Vista previa del documento:</Text>
      <View style={styles.previewContainer}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewDocTitle}>AGRIHUSAC - INFORME DE CALIDAD</Text>
          <Text style={styles.previewDocMeta}>Filtro: Lote {selectedLote} | Fecha: {selectedDate}</Text>
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

      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.pdfButton]} onPress={handleExportPDF} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>📄 Generar Reporte PDF</Text>
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
  actionButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});