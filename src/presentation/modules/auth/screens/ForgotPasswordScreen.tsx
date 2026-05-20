import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, ActivityIndicator, Alert,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../navigation/AuthNavigator';
import { useAuthStore } from '../store/authStore';

const schema = z.object({
  email: z.string().email('Ingresa un correo válido'),
});

type FormData = z.infer<typeof schema>;
type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const { recoverPassword, isLoading, clearError } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email }: FormData) => {
    clearError();
    const ok = await recoverPassword(email);
    if (ok) {
      Alert.alert(
        'Correo enviado',
        `Revisa tu bandeja de entrada en ${email} para restablecer tu contraseña.`,
        [{ text: 'Volver al login', onPress: () => navigation.navigate('Login') }],
      );
    } else {
      Alert.alert('Error', useAuthStore.getState().error ?? 'Inténtalo nuevamente');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        <Image source={require('../../../../../assets/Logo.png')} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Recuperar contraseña</Text>
        <Text style={styles.subtitle}>
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </Text>

        <View style={[styles.inputWrapper, !!errors.email && styles.inputError]}>
          <View style={styles.iconBox}><Text style={styles.icon}>✉️</Text></View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isLoading}
              />
            )}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>ENVIAR ENLACE</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>← Volver al inicio de sesión</Text>
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
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 28, lineHeight: 20 },
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
