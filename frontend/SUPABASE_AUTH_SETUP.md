# Configuración de Supabase para Autenticación

## Pasos para configurar Supabase

### 1. Crear un proyecto en Supabase
- Ve a [https://supabase.com](https://supabase.com)
- Inicia sesión o crea una cuenta
- Haz clic en "New Project"
- Selecciona tu organización y completa los detalles del proyecto

### 2. Obtener las credenciales
- Una vez creado el proyecto, ve a **Settings > API**
- Copia la URL del proyecto (Project URL)
- Copia la clave anónima (anon public key)

### 3. Configurar variables de entorno
- Crea un archivo `.env.local` en la carpeta `frontend`
- Añade las siguientes variables:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 4. Habilitar proveedores de autenticación

#### Para Email/Password:
- Ve a **Authentication > Providers**
- Email debe estar habilitado por defecto
- Si no está, habilítalo

#### Para Google OAuth:
- Ve a **Authentication > Providers**
- Busca Google y haz clic en "Enable"
- Necesitarás configurar credenciales de OAuth en Google Cloud:
  - Ve a [Google Cloud Console](https://console.cloud.google.com)
  - Crea un nuevo proyecto
  - Ve a "Credentials" y crea "OAuth 2.0 Client ID"
  - Copia el Client ID y Client Secret
  - Vuelve a Supabase y pega estas credenciales

### 5. Configurar URL de redirect (para Google)
- En **Authentication > URL Configuration**
- Añade `http://localhost:5173/dashboard` para desarrollo
- Añade tu URL de producción cuando despliegues

### 6. Crear tabla de usuarios (opcional)
Si quieres almacenar información adicional de usuarios:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  nombre TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Prueba de autenticación

1. Inicia la aplicación: `npm start`
2. Ve a `http://localhost:5173`
3. Haz clic en "🔐 Inicia Sesión" en la navegación
4. Prueba el registro y inicio de sesión

## Estructura de datos de usuario en Supabase

Cuando un usuario se registra, Supabase almacena:
- `id`: UUID único
- `email`: Email del usuario
- `user_metadata`: Datos adicionales (nombre, etc.)
- `created_at`: Fecha de creación
- `last_sign_in_at`: Último inicio de sesión

Los datos se pueden acceder en el contexto de autenticación:
- `user.id` - ID del usuario
- `user.email` - Email
- `user.user_metadata.nombre` - Nombre (si se proporcionó en el registro)
