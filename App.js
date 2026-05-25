import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';
import { MainNavigator } from './src/presentation/navigation/MainNavigator';
import { AuthNavigator } from './src/presentation/navigation/AuthNavigator';
import { useAuthStore } from './src/presentation/modules/auth/store/authStore';

import { DamageListScreen } from './src/presentation/modules/main/catalog/screens/DamageListScreen'; //Pantalla del lista de registros
import { DamageDetailScreen } from './src/presentation/modules/main/catalog/screens/DamageDetailScreen';

import { ForgotPasswordScreen } from './src/presentation/modules/auth/screens/ForgotPasswordScreen'; //Recuperacion de contraseña
import { LoginScreen } from './src/presentation/modules/auth/screens/LoginScreen'; //Inicio de sesion
import { RegisterScreen } from './src/presentation/modules/auth/screens/RegisterScreen'; //Registro de usuario
import { UpdatePasswordScreen } from './src/presentation/modules/auth/screens/UpdatePasswordScreen'; //Actualizacion de contraseña

export default function App() {
  const checkSession = useAuthStore((s) => s.checkSession);

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <  DamageDetailScreen />
      <StatusBar style="auto" />
    </>
  );
}
