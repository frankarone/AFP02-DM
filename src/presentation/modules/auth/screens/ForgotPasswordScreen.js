import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, ActivityIndicator, Alert,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useAuthStore } from '../store/authStore';

export function ForgotPasswordScreen({ navigation }) {
  const { requestSecurityQuestion, resetPassword, isLoading, clearError } = useAuthStore();

  // 'email' = pedir correo  |  'reset' = responder pregunta + nueva contraseña
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Paso 1: buscar la cuenta y obtener su pregunta de seguridad.
  const buscarCuenta = async () => {
    clearError();
    if (!email.trim()) {
      Alert.alert('Error', 'Ingresa tu correo');
      return;
    }
    const q = await requestSecurityQuestion(email.trim());
    if (q) {
      setQuestion(q);
      setStep('reset');
    } else {
      Alert.alert('Error', useAuthStore.getState().error ?? 'No se encontró la cuenta');
    }
  };

  // Paso 2: validar respuesta y guardar la nueva contraseña.
  const restablecer = async () => {
    clearError();
    if (!answer.trim()) {
      Alert.alert('Error', 'Ingresa la respuesta de seguridad');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'La nueva contraseña debe tener mínimo 8 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const ok = await resetPassword(email.trim(), answer, newPassword);
    if (ok) {
      Alert.alert('Contraseña restablecida', 'Ya puedes iniciar sesión con tu nueva contraseña.', [
        { text: 'Ir al login', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Error', useAuthStore.getState().error ?? 'No se pudo restablecer');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        <Image source={require('../../../../../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Recuperar contraseña</Text>

        {step === 'email' ? (
          <>
            <Text style={styles.subtitle}>
              Ingresa tu correo para mostrar tu pregunta de seguridad.
            </Text>

            <View style={styles.inputWrapper}>
              <View style={styles.iconBox}><Text style={styles.icon}>✉️</Text></View>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={buscarCuenta}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>BUSCAR CUENTA</Text>}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>Pregunta de seguridad:</Text>
            <Text style={styles.question}>{question}</Text>

            <View style={styles.inputWrapper}>
              <View style={styles.iconBox}><Text style={styles.icon}>🔑</Text></View>
              <TextInput
                style={styles.input}
                placeholder="Tu respuesta"
                placeholderTextColor="#999"
                value={answer}
                onChangeText={setAnswer}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.iconBox}><Text style={styles.icon}>🔒</Text></View>
              <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                placeholderTextColor="#999"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.iconBox}><Text style={styles.icon}>🔒</Text></View>
              <TextInput
                style={styles.input}
                placeholder="Confirmar nueva contraseña"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={restablecer}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.buttonText}>RESTABLECER CONTRASEÑA</Text>}
            </TouchableOpacity>
          </>
        )}

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
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 8, lineHeight: 20 },
  question: { fontSize: 16, fontWeight: '700', color: '#333', textAlign: 'center', marginBottom: 20 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#CFCFCF', borderLeftWidth: 4, borderLeftColor: '#B22222', borderRadius: 4, marginBottom: 12, backgroundColor: '#fff', overflow: 'hidden' },
  iconBox: { width: 48, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#E0E0E0', paddingVertical: 14 },
  icon: { fontSize: 18 },
  input: { flex: 1, paddingHorizontal: 14, paddingVertical: 14, fontSize: 15, color: '#333' },
  button: { width: '100%', backgroundColor: '#6B93B0', paddingVertical: 16, borderRadius: 4, alignItems: 'center', marginTop: 8, marginBottom: 20 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 1 },
  link: { color: '#6B93B0', fontSize: 13, marginTop: 8, fontWeight: '600' },
});
