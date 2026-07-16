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
import { passwordSchema } from '../../../../core/utils';

const schema = z.object({
  name:             z.string().min(2, 'Mínimo 2 caracteres'),
  lastName:         z.string().min(2, 'Mínimo 2 caracteres'),
  email:            z.string().email('Correo inválido'),
  password:         passwordSchema,
  confirmPassword:  z.string(),
  securityQuestion: z.string().min(5, 'Escribe una pregunta de seguridad'),
  securityAnswer:   z.string().min(2, 'Escribe una respuesta'),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export function RegisterScreen({ navigation }) {
  const { register, isLoading, error, clearError } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    clearError();
    await register({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      securityQuestion: data.securityQuestion,
      securityAnswer: data.securityAnswer,
    });
    const storeError = useAuthStore.getState().error;
    if (storeError) {
      Alert.alert('Error', storeError);
    } else {
      Alert.alert('Éxito', 'Usuario registrado correctamente', [
        { text: 'Iniciar sesión', onPress: () => navigation.navigate('Login') },
      ]);
    }
  };

  const fields = [
    { name: 'name',            label: 'Nombre',              icon: '👤' },
    { name: 'lastName',        label: 'Apellido',            icon: '👤' },
    { name: 'email',           label: 'Correo electrónico',  icon: '✉️',  keyboard: 'email-address' },
    { name: 'password',        label: 'Contraseña',          icon: '🔒', secure: true },
    { name: 'confirmPassword', label: 'Confirmar contraseña',icon: '🔒', secure: true },
    { name: 'securityQuestion', label: 'Pregunta de seguridad (ej: ¿Tu mascota?)', icon: '❓' },
    { name: 'securityAnswer',   label: 'Respuesta de seguridad',                   icon: '🔑' },
  ];

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        <Image source={require('../../../../../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.hint}>
          El registro público está deshabilitado. Solo un administrador puede crear usuarios.
        </Text>

        {fields.map(f => (
          <View key={f.name} style={{ width: '100%' }}>
            <View style={[styles.inputWrapper, !!errors[f.name] && styles.inputError]}>
              <View style={styles.iconBox}><Text style={styles.icon}>{f.icon}</Text></View>
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

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>REGISTRARSE</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text></Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#fff' },
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 40, backgroundColor: '#fff' },
  logo: { width: 200, height: 90, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#2E7D32', marginBottom: 8 },
  hint: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 24, paddingHorizontal: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#CFCFCF', borderLeftWidth: 4, borderLeftColor: '#B22222', borderRadius: 4, marginBottom: 12, backgroundColor: '#fff', overflow: 'hidden' },
  inputError: { borderColor: '#B22222' },
  iconBox: { width: 48, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#E0E0E0', paddingVertical: 14 },
  icon: { fontSize: 18 },
  input: { flex: 1, paddingHorizontal: 14, paddingVertical: 14, fontSize: 15, color: '#333' },
  errorText: { alignSelf: 'flex-start', color: '#B22222', fontSize: 12, marginTop: -8, marginBottom: 8, marginLeft: 4 },
  button: { width: '100%', backgroundColor: '#6B93B0', paddingVertical: 16, borderRadius: 4, alignItems: 'center', marginTop: 8, marginBottom: 20 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 1 },
  link: { color: '#666', fontSize: 13, marginTop: 8, textAlign: 'center' },
  linkBold: { color: '#6B93B0', fontWeight: '700' },
});
