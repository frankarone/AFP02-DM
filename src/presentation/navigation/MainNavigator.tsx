import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { DashboardScreen } from '../modules/main/dashboard/screens/DashboardScreen';
import { CatalogScreen } from '../modules/main/catalog/screens/CatalogScreen';
import { CartScreen } from '../modules/main/cart/screens/CartScreen';
import { OrdersScreen } from '../modules/main/orders/screens/OrdersScreen';
import { PaymentsScreen } from '../modules/main/payments/screens/PaymentsScreen';
import { ProfileScreen } from '../modules/profile/screens/ProfileScreen';
<<<<<<< Updated upstream
=======
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../modules/auth/store/authStore';
import { RegistroDanoScreen } from '../modules/main/registrodaño/screens/RegistroDanoScreen';
import { DamageListScreen } from '../modules/main/catalog/screens/DamageListScreen';
import ReporteScreen from '../modules/main/reporte/screens/ReporteScreen';
>>>>>>> Stashed changes

export type MainTabParamList = {
  Dashboard: undefined;
<<<<<<< Updated upstream
  Catalog:   undefined;
  Cart:      undefined;
  Orders:    undefined;
  Profile:   undefined;
=======
  Profile: undefined;
  RegistroDano: undefined;
  ListDano: undefined;
  Reporte: undefined;
>>>>>>> Stashed changes
};

export type MainStackParamList = {
  Tabs:          undefined;
  ProductDetail: { productId: string };
  OrderDetail:   { orderId: string };
  Payments:      { orderId: string };
  UpdatePassword: undefined;
};

const Tab   = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

const TAB_ICONS: Record<string, string> = {
  Dashboard: '🏠',
  Catalog:   '📸',
  Cart:      '',
  Orders:    '📄',
  Profile:   '',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>{TAB_ICONS[route.name]}</Text>,
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      })}
    >
<<<<<<< Updated upstream
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Catalog"   component={CatalogScreen}   options={{ title: 'Inspección' }} />
      <Tab.Screen name="Cart"      component={CartScreen}      options={{ title: 'Carrito' }} />
      <Tab.Screen name="Orders"    component={OrdersScreen}    options={{ title: 'Reporte' }} />
      <Tab.Screen name="Profile"   component={ProfileScreen}   options={{ title: 'Perfil' }} />
    </Tab.Navigator>
=======

      <Stack.Screen name="Dashboard" component={DashboardScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="RegistroDano" component={RegistroDanoScreen} />
      <Stack.Screen name="ListDano" component={DamageListScreen} />
      <Stack.Screen name="Reporte" component={ReporteScreen} options={{ title: 'Reportes' }} />
    </Stack.Navigator>
>>>>>>> Stashed changes
  );
}

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs"     component={MainTabs} />
      <Stack.Screen name="Payments" component={PaymentsScreen} />
    </Stack.Navigator>
  );
}
