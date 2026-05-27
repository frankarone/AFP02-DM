import * as Crypto from 'expo-crypto';

// Genera una sal aleatoria única para cada contraseña.
async function generateSalt() {
  return Crypto.randomUUID();
}

// Calcula el hash SHA-256 de (sal + valor).
async function hashWithSalt(value, salt) {
  const text = `${salt}:${value}`;
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    text,
  );
  console.log('[PasswordHasher] hashWithSalt: texto a hashear =', text, '=> hash =', hash);
  return hash;
}

// Utilidad para hashear y verificar contraseñas / respuestas de seguridad.
// Nunca se guarda el texto plano: solo { salt, hash }.
export const PasswordHasher = {
  // Devuelve { salt, hash } para un valor nuevo.
  async hash(plain) {
    const salt = await generateSalt();
    const hash = await hashWithSalt(plain, salt);
    console.log('[PasswordHasher] hash: salt generado =', salt, '=> resultado =', { salt, hash });
    return { salt, hash };
  },

  // Compara un valor en texto plano contra el { salt, hash } guardado.
  async verify(plain, salt, expectedHash) {
    if (!salt || !expectedHash) return false;
    const hash = await hashWithSalt(plain, salt);
    const match = hash === expectedHash;
    console.log('[PasswordHasher] verify:', { hashCalculado: hash, hashGuardado: expectedHash, coincide: match });
    return match;
  },
};
