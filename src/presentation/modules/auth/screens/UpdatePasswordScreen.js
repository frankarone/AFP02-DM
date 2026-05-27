import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, ActivityIndicator, Alert,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/authStore';

const schema = z.object({
  currentPassword: z.string().min(1, 'Ingresa tu contraseña actual'),
  newPassword:     z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
}).refine(d => d.currentPassword !== d.newPassword, {
  message: 'La nueva contraseña debe ser diferente a la actual',
  path: ['newPassword'],
});

export function UpdatePasswordScreen({ navigation }) {
  const { updatePassword, isLoading, clearError } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ currentPassword, newPassword }) => {
    clearError();
    const ok = await updatePassword(currentPassword, newPassword);
    if (ok) {
      Alert.alert('Contraseña actualizada', 'Tu contraseña fue cambiada exitosamente.', [
        { text: 'Aceptar', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Error', useAuthStore.getState().error ?? 'No se pudo actualizar la contraseña');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        <Image source={require('../../../../../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Actualizar contraseña</Text>

        {[
          { name: 'currentPassword', label: 'Contraseña actual' },
          { name: 'newPassword',     label: 'Nueva contraseña' },
          { name: 'confirmPassword', label: 'Confirmar nueva contraseña' },
        ].map(f => (
          <View key={f.name} style={{ width: '100%' }}>
            <View style={[styles.inputWrapper, !!errors[f.name] && styles.inputError]}>
              <View style={styles.iconBox}><Text style={styles.icon}>🔒</Text></View>
              <Controller
                control={control}
                name={f.name}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder={f.label}
                    placeholderTextColor="#999"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!isLoading}
                  />
                )}
              />
            </View>
            {errors[f.name] && <Text style={styles.errorText}>{errors[f.name]?.message}</Text>}
          </View>
        ))}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>ACTUALIZAR CONTRASEÑA</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>← Cancelar</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#fff' },
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 40, backgroundColor: '#fff' },
  logo: { width: 200, height: 90, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#2E7D32', marginBottom: 24 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#CFCFCF', borderLeftWidth: 4, borderLeftColor: '#B22222', borderRadius: 4, marginBottom: 12, backgroundColor: '#fff', overflow: 'hidden' },
  inputError: { borderColor: '#B22222' },
  iconBox: { width: 48, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#E0E0E0', paddingVertical: 14 },
  icon: { fontSize: 18 },
  input: { flex: 1, paddingHorizontal: 14, paddingVertical: 14, fontSize: 15, color: '#333' },
  errorText: { alignSelf: 'flex-start', color: '#B22222', fontSize: 12, marginTop: -8, marginBottom: 8, marginLeft: 4 },
  button: { width: '100%', backgroundColor: '#6B93B0', paddingVertical: 16, borderRadius: 4, alignItems: 'center', marginTop: 8, marginBottom: 20 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 1 },
  link: { color: '#6B93B0', fontSize: 13, marginTop: 8, fontWeight: '600' },
});
