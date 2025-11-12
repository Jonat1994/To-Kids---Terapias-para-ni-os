# 🚀 Guía Rápida de Instalación

## ⚠️ Configuración Importante de Email

Para que el sistema pueda enviar confirmaciones de citas por email, necesitas configurar tu cuenta de Gmail:

### 📧 Paso 1: Obtener Contraseña de Aplicación de Gmail

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En el menú izquierdo, haz clic en **"Seguridad"**
3. Activa la **"Verificación en dos pasos"** si no la tienes activada
4. Una vez activada, busca **"Contraseñas de aplicaciones"**
5. Selecciona **"Correo"** y **"Otro (nombre personalizado)"**
6. Escribe: "Centro Terapia" y genera la contraseña
7. **Guarda esta contraseña** (son 16 caracteres)

### 🔧 Paso 2: Configurar el Backend

Abre el archivo: `backend/src/main/resources/application.properties`

Busca estas líneas y reemplázalas con tu información:

```properties
# Configuración de Email (Gmail)
spring.mail.username=TU_EMAIL@gmail.com
spring.mail.password=TU_CONTRASEÑA_DE_APLICACION
```

**Ejemplo:**
```properties
spring.mail.username=micentroterapia@gmail.com
spring.mail.password=abcd efgh ijkl mnop
```

## 🏃 Ejecución del Proyecto

### Terminal 1: Backend

```bash
cd backend
mvn spring-boot:run
```

Espera a ver el mensaje: "Started CentroTerapiaApplication in X seconds"

### Terminal 2: Frontend

```bash
cd frontend
npm install
npm run dev
```

Espera a ver: "Local: http://localhost:5173/"

## ✅ Verificación

1. Abre tu navegador en: **http://localhost:5173**
2. Deberías ver la página de inicio del centro
3. Navega a "Agendar Cita" para probar el sistema
4. Al agendar una cita, se enviará un email de confirmación

## 📝 Usuarios de Prueba

El sistema usa H2 en memoria (no necesitas instalar base de datos).

Si quieres crear datos de prueba:
- Ve a: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:centroterapia`
- Username: `sa`
- Password: (dejar vacío)

## 🎨 Características Principales

### Para Usuarios/Padres:
- 🏠 **Inicio**: Información del centro
- ⭐ **Servicios**: Terapias disponibles
- 📅 **Agendar Cita**: Sistema de reserva en 3 pasos
- 📚 **Materiales**: Recursos descargables
- 📞 **Contacto**: Información y ubicación

### Para Administradores:
- 🔧 **Panel Admin**: Gestión completa
  - Ver y gestionar citas
  - Ver pacientes
  - Subir materiales
  - Cambiar estados de citas

## 🐛 Problemas Comunes

### Error: "Connection refused" en puerto 8080
- El backend no está corriendo
- Solución: Ejecuta `mvn spring-boot:run` en la carpeta backend

### Error: "Network Error" al agendar cita
- Verifica que el backend esté corriendo
- Verifica la consola del backend para ver errores

### No llegan los emails
- Verifica que configuraste correctamente el email en `application.properties`
- Usa una "Contraseña de aplicación" (no tu contraseña normal)
- Verifica que la verificación en dos pasos esté activa

### El puerto 8080 ya está en uso
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID [numero_proceso] /F

# Mac/Linux
lsof -i :8080
kill -9 [numero_proceso]
```

## 📦 Para Producción

### Base de Datos MySQL

1. Crea una base de datos:
```sql
CREATE DATABASE centroterapia;
```

2. Edita `backend/src/main/resources/application-prod.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/centroterapia
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
```

3. Ejecuta con perfil de producción:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

## 💡 Consejos

- Los emails se envían **automáticamente** al crear una cita
- Los materiales se guardan en: `~/centro-terapia/uploads`
- Puedes cambiar el directorio en `application.properties`: `app.upload.dir`
- La consola H2 está en: http://localhost:8080/h2-console

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs del backend (terminal donde corre mvn)
2. Revisa la consola del navegador (F12)
3. Verifica que ambos servidores estén corriendo
4. Asegúrate de tener Java 17+ y Node 18+

---

**¡Listo! Tu sistema está funcionando** 🎉

Abre http://localhost:5173 y comienza a usar el sistema.

