import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View , Text , Image , StyleSheet } from 'react-native';
import DashboardScreen from '../modules/main/dashboard/screens/DashboardScreen';
import { ProfileScreen } from '../modules/profile/screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../modules/auth/store/authStore';

export type MainStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
};



export function MainNavigator() {

  //funciones
  const Stack = createNativeStackNavigator<MainStackParamList>();
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