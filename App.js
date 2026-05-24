import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';
import { MainNavigator } from './src/presentation/navigation/MainNavigator';
import { AuthNavigator } from './src/presentation/navigation/AuthNavigator';
import { useAuthStore } from './src/presentation/modules/auth/store/authStore';
//Modulo Main
import { CartScreen } from './src/presentation/modules/main/cart/screens/CartScreen'; //Pantalla del Carrito de compras
import { CatalogScreen } from './src/presentation/modules/main/catalog/screens/CatalogScreen'; //Pantalla del catalogo de productos
import { DashboardScreen } from './src/presentation/modules/main/dashboard/screens/DashboardScreen'; //Pantalla del tablero principal
import { OrdersScreen } from './src/presentation/modules/main/orders/screens/OrdersScreen'; //Pantalla de pedidos
import { PaymentsScreen } from './src/presentation/modules/main/payments/screens/PaymentsScreen'; //Pantalla de pagos
import { ProfileScreen } from './src/presentation/modules/profile/screens/ProfileScreen'; //Pantalla del perfil
//Modulo Auth
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
      < AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
