# 🚀 GUÍA PARA TESTEAR AFP02-DM EN ANDROID STUDIO

## 📋 REQUISITOS PREVIOS

### 1. Software Requerido
- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **Android Studio** (Flamingo o superior) - [Descargar](https://developer.android.com/studio)
- **Android SDK** (API 34 mínimo)
- **Java JDK** (17 o superior)

### 2. Verificar Instalaciones
```powershell
node --version          # Debe ser v18+
npm --version           # Debe ser 10+
java -version           # Debe ser 17+
```cience12

---

## 🔧 PASOS DE CONFIGURACIÓN

### PASO 1: Instalar Dependencias del Proyecto
```powershell
cd c:\Users\Andretito\Desktop\Proyecto\AFP02-DM
npm install
```

### PASO 2: Instalar Dependencias de Expo
```powershell
npx expo install
```

### PASO 3: Verificar que TypeScript Compile
```powershell
npx tsc --noEmit
```

### PASO 4: Configurar Android Studio
1. Abre **Android Studio**
2. Ve a **Tools → SDK Manager**
3. Instala:
   - Android SDK 34 (o superior)
   - Android SDK Tools
   - Android Emulator
4. Ve a **Tools → Device Manager**
5. Crea un emulador con:
   - **Device**: Pixel 6 o superior
   - **API Level**: 34 (Android 14)
   - **RAM**: 4GB (mínimo)

---

## ▶️ CÓMO EJECUTAR LA APP

### OPCIÓN 1: Usando Expo CLI (RECOMENDADO)

**Paso 1: Inicia el servidor de Expo**
```powershell
cd c:\Users\Andretito\Desktop\Proyecto\AFP02-DM
npm start
```

Verás una pantalla como:
```
 › Metro waiting on exp://localhost:8081
 Press s │ switch to LAN
 Press a │ open Android
 Press i │ open iOS
 Press w │ open web
 Press r │ reload app
 Press m │ toggle menu
 Press ? │ show all commands
```

**Paso 2: Presiona `a` para abrir en Android**
```
Esto abrirá la app en el emulador de Android
```

### OPCIÓN 2: Directamente desde Android Studio

```powershell
npm run android
```

---

## 🔐 CREDENCIALES DE LOGIN PARA TESTEAR

### ✅ Login Funciona con CUALQUIER Credencial
**Importante**: La app está usando un **MOCK** para autenticación, así que:

✅ **Email cualquiera**: `test@test.com`, `demo@demo.com`, `inspector@agrihusa.com`
✅ **Contraseña cualquiera**: `123456`, `password123`, `test`

**Ejemplo de Login exitoso:**
```
Email: inspector@agrihusa.com
Contraseña: 123456
```

### ℹ️ Datos de Perfil (Precargados)
Después del login, verás los datos del inspector:
```
Nombre: Martín Cuadros García
Código: INS-001
Rol: Inspector de Calidad
Planta: Planta Huaral
```

---

## 📱 PANTALLAS DISPONIBLES PARA TESTEAR

### 1. **Autenticación** 
- ✅ Login
- ✅ Registro
- ✅ Recuperar Contraseña
- ✅ Cambiar Contraseña

### 2. **Perfil del Inspector** (NUEVA - Está que acabamos de terminar)
- ✅ Ver datos personales
- ✅ Cambiar foto de perfil (Avatar Picker)
- ✅ Configurar preferencias:
  - Planta por defecto
  - Tipo de fruta por defecto
  - Modo Offline
  - Modo Ahorro de Datos
- ✅ Sincronización manual
- ✅ Logout

### 3. **Dashboard Principal**
- Catálogo de productos
- Carrito de compras
- Órdenes

---

## ✅ CHECKLIST PARA TESTEAR

### Fase 1: Login
- [ ] Abre la app
- [ ] Intenta login con: `inspector@agrihusa.com` / `123456`
- [ ] Verifica que entra al Dashboard

### Fase 2: Perfil
- [ ] Ve a la pantalla de Perfil (ícono de usuario)
- [ ] Verifica que cargan los datos del inspector:
  - Nombre: Martín Cuadros García
  - Código: INS-001
  - Avatar

### Fase 3: Configuraciones
- [ ] Cambia la Planta por defecto
- [ ] Cambia el Tipo de Fruta por defecto
- [ ] Activa "Modo Offline"
- [ ] Activa "Ahorro de Datos"
- [ ] Presiona "Sincronizar" para guardar

### Fase 4: Avatar
- [ ] Presiona en el avatar
- [ ] Selecciona una imagen de la galería o cámara
- [ ] Verifica que se actualiza

### Fase 5: Logout
- [ ] Presiona "Cerrar Sesión"
- [ ] Verifica que vuelve a pantalla de Login

---

## 🐛 SOLUCIONAR PROBLEMAS

### Error: "Cannot find module..."
**Solución:**
```powershell
npm install
npx expo install
```

### Error: "Android SDK not found"
**Solución:**
1. En Android Studio: `Tools → SDK Manager`
2. Instala Android SDK 34
3. Reinicia la app

### Emulador no inicia
**Solución:**
1. En Android Studio: `Tools → Device Manager`
2. Elimina el emulador
3. Crea uno nuevo con:
   - **Device**: Pixel 6
   - **API**: 34
   - **RAM**: 4GB

### La app se congela al cambiar foto
**Solución:**
- Es normal, simula upload a servidor
- Espera 2-3 segundos

### TypeScript errors
**Solución:**
```powershell
npx tsc --noEmit
# Si hay errores, ejecuta:
npm install
npx expo install
```

---

## 📊 ARQUITECTURA DEL PROYECTO

```
src/
├── core/                    # Constantes, temas, utilidades
│   ├── errors/             # Manejo de errores
│   ├── theme/              # Colores y estilos
│   └── utils/              # Funciones auxiliares
├── data/                    # Capa de datos
│   ├── datasources/        # APIs (remote/local)
│   ├── models/             # DTOs y mappers
│   └── repositories/       # Orquestadores de datos
├── domain/                  # Lógica de negocio
│   ├── entities/           # Modelos de dominio
│   ├── repositories/       # Contratos de repositorios
│   └── usecases/           # Casos de uso
├── infrastructure/          # Configuración
│   ├── api/                # Cliente HTTP
│   ├── di/                 # Inyección de dependencias
│   └── storage/            # Almacenamiento seguro
└── presentation/            # UI
    ├── modules/            # Pantallas por módulo
    ├── navigation/         # Navegación
    └── shared/             # Componentes compartidos
```

---

## 🧪 TESTING DEL MÓDULO DE PERFIL (NUEVO)

El módulo de Perfil está **100% funcional** con:
- ✅ Remote-First Pattern (intenta servidor, fallback a caché)
- ✅ Offline Mode (soporta trabajo sin conexión)
- ✅ Zustand Store (state management)
- ✅ Validación con Zod
- ✅ Manejo de errores

**Para testear todo:**
1. Login → `inspector@agrihusa.com` / `123456`
2. Ve a Perfil
3. Cambia todas las preferencias
4. Presiona Sincronizar
5. Cierra y reabre la app
6. ¡Los datos se mantienen! (caché local)

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa los logs en Android Studio (Logcat)
2. Ejecuta `npm install` nuevamente
3. Limpia caché: `npm cache clean --force`
4. Reinicia el emulador

**¡Listo! Ya puedes testear la app. 🎉**
