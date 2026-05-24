/**
 * BABEL CONFIG - NativeWind Setup
 * 
 * Este archivo configura Babel para:
 * 1. Procesar la propiedad 'className' en componentes React Native
 * 2. Compilar Tailwind CSS para React Native (NativeWind)
 * 3. Mantener compatibilidad con Expo y Metro Bundler
 */

module.exports = function (api) {
  api.cache(true);
  return {
    // Presets: configuraciones predefinidas de transformación
    presets: [
      // babel-preset-expo: configura Babel para Expo/React Native
      ['babel-preset-expo'],
      // nativewind/babel: procesa className y Tailwind en RN
      'nativewind/babel',
    ],
    // Plugins: transformaciones específicas adicionales
    plugins: [
      // @babel/plugin-transform-runtime: optimiza el bundle y manejo de async/await
      ['@babel/plugin-transform-runtime', {
        helpers: true,
        regenerator: true,
      }],
      // react-native-reanimated: para animaciones nativas (si lo usas)
      // 'react-native-reanimated/plugin',
    ],
    // Configuración específica por ambiente
    env: {
      // En desarrollo: más debugging, menos optimización
      development: {
        plugins: [
          '@babel/plugin-proposal-export-namespace-from',
        ],
      },
      // En producción: máxima optimización
      production: {
        plugins: [
          '@babel/plugin-proposal-export-namespace-from',
        ],
      },
    },
  };
};
