import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../auth/store/authStore';
import type { MainStackParamList } from '../../../navigation/MainNavigator';

const schema = z.object({
  currentPassword: z.string().min(1, 'Ingresa tu contraseña actual'),
  newPassword: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
}).refine(d => d.currentPassword !== d.newPassword, {
  message: 'La nueva contraseña debe ser diferente a la actual',
  path: ['newPassword'],
});

type FormData = z.infer<typeof schema>;
type Props = NativeStackScreenProps<MainStackParamList, 'ChangePassword'>;

export function ChangePasswordScreen({ navigation }: Props) {
  const { updatePassword, isLoading, clearError, error } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ currentPassword, newPassword }: FormData) => {
    clearError();
    const ok = await updatePassword(currentPassword, newPassword);
    if (ok) {
      Alert.alert('✓ Éxito', 'Tu contraseña fue actualizada correctamente', [
        { text: 'Aceptar', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Error', error ?? 'No se pudo actualizar la contraseña');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Ionicons name="lock-closed" size={80} color="#e74c3c" />
          <Text style={styles.title}>Cambiar contraseña</Text>
          <Text style={styles.subtitle}>Actualiza tu contraseña para mantener tu cuenta segura</Text>
        </View>

        {[
          { name: 'currentPassword' as const, label: 'Contraseña actual', icon: 'lock-closed' },
          { name: 'newPassword' as const, label: 'Nueva contraseña', icon: 'lock-open' },
          { name: 'confirmPassword' as const, label: 'Confirmar nueva contraseña', icon: 'lock-closed' },
        ].map(f => (
          <View key={f.name} style={{ width: '100%', marginBottom: 12 }}>
            <Text style={styles.label}>{f.label}</Text>
            <View style={[styles.inputWrapper, !!errors[f.name] && styles.inputError]}>
              <Ionicons name={f.icon as any} size={20} color="#2e86de" style={styles.inputIcon} />
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
            {errors[f.name] && (
              <Text style={styles.errorText}>
                <Ionicons name="alert-circle" size={14} /> {errors[f.name]?.message}
              </Text>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={[styles.botonGuardar, isLoading && styles.botonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.textoBoton}>Actualizar contraseña</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonCancelar}
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text style={styles.textoCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    backgroundColor: '#e4dede',
    padding: 20,
    justifyContent: 'flex-start',
  },

  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 15,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    height: 50,
  },

  inputError: {
    borderColor: '#e74c3c',
    backgroundColor: '#ffe6e6',
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },

  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  botonGuardar: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  botonDisabled: {
    backgroundColor: '#95a5a6',
    opacity: 0.7,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  botonCancelar: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },

  textoCancelar: {
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
  },
});
