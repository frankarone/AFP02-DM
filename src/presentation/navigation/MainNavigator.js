import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View , Text , Image , StyleSheet } from 'react-native';
import { DashboardScreen } from '../modules/main/dashboard/screens/DashboardScreen';
import { ProfileScreen } from '../modules/profile/screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../modules/auth/store/authStore';
import { RegistroDanoScreen } from '../modules/main/registrodaño/screens/RegistroDanoScreen';
import { DamageListScreen } from '../modules/main/catalog/screens/DamageListScreen';
import { UserAdminScreen } from '../modules/main/admin/screens/UserAdminScreen';
import { ChangePasswordScreen } from '../modules/profile/screens/ChangePasswordScreen';
import { DamageDetailScreen } from '../modules/main/catalog/screens/DamageDetailScreen';

export function MainNavigator() {

  //funciones
  const Stack = createNativeStackNavigator();
  const user = useAuthStore((s) => s.user);

  //froentend del navigator
  return (
    <Stack.Navigator screenOptions={{ headerShown: true,

        headerStyle: {
          backgroundColor: '#f1eca2',
        },

        headerShadowVisible: true,

        headerTitle: () => (
          <View style={styles.headerTitulo}>
            <Image
              source={require('../../../assets/Logo.png')}
              style={styles.logo}
            />
            <Text style={styles.nombreSistema}>FPPMS</Text>
          </View>

        ),

      headerRight: () => (
        <View style={styles.usuarioCaja}>
          <Ionicons name="person" size={24} color="#f7bfbf" />
          <Text style={styles.usuarioTexto}>{user?.name}</Text>
          </View>
        ),
      }}
    >

      <Stack.Screen name="Dashboard" component={DashboardScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="RegistroDano" component={RegistroDanoScreen} />
      <Stack.Screen name="ListDano" component={DamageListScreen} />
      <Stack.Screen
        name="DamageDetail"
        component={DamageDetailScreen}
        options={{
          title: 'Detalle del daño',
        }}
      />
      <Stack.Screen name="AdminUsers" component={UserAdminScreen} options={{ title: 'Administrar usuarios' }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}

//estilos
const styles = StyleSheet.create({
  headerTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 85,
    height: 35,
    resizeMode: 'contain',
    marginRight: 10,
  },

  nombreSistema: {
    fontSize: 17,
    color: '#777',
  },

  usuarioCaja: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3da87c',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 3,
  },

  usuarioTexto: {
    marginLeft: 4,
    fontSize: 13,
    color: '#555',
  },
});
