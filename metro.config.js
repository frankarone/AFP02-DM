/**
 * METRO CONFIG - React Native Bundler Setup
 * 
 * Metro es el bundler de React Native que compila el código.
 * Esta configuración asegura que:
 * 1. NativeWind procese correctamente los estilos Tailwind
 * 2. Expo funciona sin problemas
 * 3. Se incluyan todas las extensiones necesarias
 */

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Obtener configuración base de Expo
const config = getDefaultConfig(__dirname);

// Aplicar configuración de NativeWind
const withNativeWindConfig = withNativeWind(config, { input: './global.css' });

module.exports = withNativeWindConfig;
