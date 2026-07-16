import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../../auth/store/authStore';
import { passwordSchema } from '../../../../../core/utils';
import { ROLES } from '../../../../../core/constants';

const schema = z.object({
  name:             z.string().min(2, 'Mínimo 2 caracteres'),
  lastName:         z.string().min(2, 'Mínimo 2 caracteres'),
  email:            z.string().email('Correo inválido'),
  password:         passwordSchema,
  confirmPassword:  z.string(),
  securityQuestion: z.string().min(5, 'Escribe una pregunta de seguridad'),
  securityAnswer:   z.string().min(2, 'Escribe una respuesta'),
  role:             z.enum([ROLES.USER, ROLES.ADMIN]),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

const roleLabel = (role) => (role === ROLES.ADMIN ? 'Administrador' : 'Usuario');

export function CreateUserScreen({ navigation }) {
  const { register, isLoading, clearError, loadUsers } = useAuthStore();

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: ROLES.USER },
  });

  const selectedRole = watch('role');

  const onInvalid = (formErrors) => {
    const first = Object.values(formErrors)[0];
    const message = first?.message ?? 'Revisa los campos del formulario.';
    Alert.alert('Campos incompletos', message);
  };

  const onSubmit = async (data) => {
    clearError();
    const ok = await register({
      name: data.name,
      lastName: data.lastName,
      email: data.email.trim().toLowerCase(),
      password: data.password,
      securityQuestion: data.securityQuestion,
      securityAnswer: data.securityAnswer,
      role: data.role,
    });
    const storeError = useAuthStore.getState().error;

    if (!ok || storeError) {
      const isDuplicate = storeError?.toLowerCase().includes('correo');
      Alert.alert(
        isDuplicate ? 'Correo duplicado' : 'No se pudo crear',
        storeError ?? 'Ocurrió un error al crear el usuario. Intenta de nuevo.',
      );
      return;
    }

    await loadUsers();
    Alert.alert(
      'Usuario creado',
      `El usuario ${data.email.trim().toLowerCase()} se creó correctamente con el rol ${roleLabel(data.role)}.`,
      [{ text: 'Aceptar', onPress: () => navigation.goBack() }],
    );
  };

  const fields = [
    { name: 'name',            label: 'Nombre',               keyboard: 'default' },
    { name: 'lastName',        label: 'Apellido',             keyboard: 'default' },
    { name: 'email',           label: 'Correo electrónico',   keyboard: 'email-address' },
    { name: 'password',        label: 'Contraseña',           secure: true },
    { name: 'confirmPassword', label: 'Confirmar contraseña', secure: true },
    { name: 'securityQuestion', label: 'Pregunta de seguridad', keyboard: 'default' },
    { name: 'securityAnswer',   label: 'Respuesta de seguridad', keyboard: 'default' },
  ];

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Crear usuario</Text>
        <Text style={styles.subtitle}>Solo el administrador puede dar de alta cuentas y asignar roles.</Text>

        {fields.map((f) => (
          <View key={f.name} style={styles.fieldBlock}>
            <View style={[styles.inputWrapper, !!errors[f.name] && styles.inputError]}>
              <Controller
                control={control}
                name={f.name}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder={f.label}
                    placeholderTextColor="#999"
                    secureTextEntry={f.secure}
                    keyboardType={f.keyboard ?? 'default'}
                    autoCapitalize={f.keyboard === 'email-address' ? 'none' : 'words'}
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

        <Text style={styles.roleLabel}>Rol del usuario</Text>
        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[styles.roleChip, selectedRole === ROLES.USER && styles.roleChipActiveUser]}
            onPress={() => setValue('role', ROLES.USER)}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={[styles.roleChipText, selectedRole === ROLES.USER && styles.roleChipTextActive]}>
              Usuario
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleChip, selectedRole === ROLES.ADMIN && styles.roleChipActiveAdmin]}
            onPress={() => setValue('role', ROLES.ADMIN)}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={[styles.roleChipText, selectedRole === ROLES.ADMIN && styles.roleChipTextActive]}>
              Administrador
            </Text>
          </TouchableOpacity>
        </View>
        {errors.role && <Text style={styles.errorText}>{errors.role?.message}</Text>}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit, onInvalid)}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>CREAR USUARIO</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#e4dede' },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldBlock: { width: '100%' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderLeftWidth: 4,
    borderLeftColor: '#B22222',
    borderRadius: 4,
    marginBottom: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  inputError: { borderColor: '#B22222' },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
  },
  errorText: {
    alignSelf: 'flex-start',
    color: '#B22222',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
  roleLabel: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  roleRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  roleChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  roleChipActiveUser: {
    backgroundColor: '#2980b9',
    borderColor: '#2980b9',
  },
  roleChipActiveAdmin: {
    backgroundColor: '#8e44ad',
    borderColor: '#8e44ad',
  },
  roleChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  roleChipTextActive: { color: '#fff' },
  button: {
    width: '100%',
    backgroundColor: '#6B93B0',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
