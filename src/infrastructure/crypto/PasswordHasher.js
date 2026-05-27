import * as Crypto from 'expo-crypto';

// Genera una sal aleatoria única para cada contraseña.
async function generateSalt() {
  return Crypto.randomUUID();
}

// Calcula el hash SHA-256 de (sal + valor).
async function hashWithSalt(value, salt) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${salt}:${value}`,
  );
}

// Utilidad para hashear y verificar contraseñas / respuestas de seguridad.
// Nunca se guarda el texto plano: solo { salt, hash }.
export const PasswordHasher = {
  // Devuelve { salt, hash } para un valor nuevo.
  async hash(plain) {
    const salt = await generateSalt();
    const hash = await hashWithSalt(plain, salt);
    return { salt, hash };
  },

  // Compara un valor en texto plano contra el { salt, hash } guardado.
  async verify(plain, salt, expectedHash) {
    if (!salt || !expectedHash) return false;
    const hash = await hashWithSalt(plain, salt);
    return hash === expectedHash;
  },
};
