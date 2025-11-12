# 🏥 Centro de Terapia Infantil - Sistema de Gestión Completo

Sistema web integral para centros de terapia infantil, desarrollado con **Java Spring Boot** (Backend) y **React** (Frontend). Incluye gestión de pacientes, sistema de citas, materiales descargables y panel administrativo.

## ✨ Características Principales

### 🎨 Interfaz Amigable para Niños
- Diseño colorido y atractivo con tipografía infantil (Fredoka, Comic Neue)
- Paleta de colores suaves: rosa, verde menta y amarillo pastel
- Iconos y emojis para mejor comprensión visual
- Diseño completamente responsive (móviles, tablets y desktop)

### 📋 Componentes Estáticos
- **Página de Inicio**: Presentación del centro y accesos rápidos
- **Servicios**: Catálogo de terapias ofrecidas (lenguaje, ocupacional, etc.)
- **Contacto**: Información de contacto, horarios, misión, visión y valores
- **Perfil Institucional**: Valores, misión y visión del centro

### 🔄 Componentes Dinámicos
- **Sistema de Reserva de Citas**: Formulario de 3 pasos para agendar citas
- **Gestión de Citas**: Registro automático y envío de emails de confirmación
- **Gestión de Pacientes**: CRUD completo con historial clínico
- **Materiales Descargables**: Biblioteca de recursos por categorías
- **Panel Administrativo**: Control total del sistema

### 💾 Base de Datos
- **Desarrollo**: H2 (en memoria)
- **Producción**: MySQL/PostgreSQL
- Tablas: pacientes, citas, horarios, materiales, usuarios

## 🛠️ Tecnologías

### Backend (Java)
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security + JWT
- Spring Mail (envío de emails)
- Maven
- Lombok

### Frontend (React)
- React 18
- Vite
- React Router DOM v6
- Axios
- CSS moderno con animaciones

## 📁 Estructura del Proyecto

```
centro-terapia-infantil/
├── backend/                           # Backend Spring Boot
│   ├── src/main/java/com/centroterapia/
│   │   ├── config/                    # Configuraciones de seguridad
│   │   ├── controller/                # Controladores REST
│   │   │   ├── PacienteController.java
│   │   │   ├── CitaController.java
│   │   │   ├── HorarioController.java
│   │   │   └── MaterialController.java
│   │   ├── model/                     # Entidades JPA
│   │   │   ├── Paciente.java
│   │   │   ├── Cita.java
│   │   │   ├── Horario.java
│   │   │   ├── Material.java
│   │   │   └── Usuario.java
│   │   ├── repository/                # Repositorios JPA
│   │   ├── service/                   # Lógica de negocio
│   │   │   ├── CitaService.java
│   │   │   ├── EmailService.java
│   │   │   └── MaterialService.java
│   │   └── CentroTerapiaApplication.java
│   └── pom.xml
│
└── frontend/                          # Frontend React
    ├── src/
    │   ├── components/
    │   │   ├── Home.jsx               # Página de inicio
    │   │   ├── Servicios.jsx          # Catálogo de servicios
    │   │   ├── AgendarCita.jsx        # Formulario de citas
    │   │   ├── Materiales.jsx         # Materiales descargables
    │   │   ├── Contacto.jsx           # Información de contacto
    │   │   ├── AdminPanel.jsx         # Panel administrativo
    │   │   ├── PacientesList.jsx      # Lista de pacientes
    │   │   └── PacienteForm.jsx       # Formulario de pacientes
    │   ├── services/
    │   │   └── api.js                 # Servicios API
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Java 17** o superior
- **Maven 3.6+**
- **Node.js 18+** y **npm**
- **MySQL** (para producción)

### 1️⃣ Configurar el Backend

```bash
# Navegar a la carpeta del backend
cd backend

# Editar application.properties para configurar email
# (Usa tu email de Gmail y un App Password)
spring.mail.username=tu-email@gmail.com
spring.mail.password=tu-app-password

# Compilar y ejecutar
mvn clean install
mvn spring-boot:run
```

El backend estará en: **http://localhost:8080**

#### Configuración de Email (Gmail)
1. Ve a tu cuenta de Google
2. Activa la verificación en dos pasos
3. Genera una "Contraseña de aplicación"
4. Usa esa contraseña en `application.properties`

### 2️⃣ Configurar el Frontend

```bash
# Navegar a la carpeta del frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

El frontend estará en: **http://localhost:5173**

## 📡 API Endpoints

### Pacientes
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pacientes` | Listar todos los pacientes |
| GET | `/api/pacientes/{id}` | Obtener paciente por ID |
| POST | `/api/pacientes` | Crear paciente |
| PUT | `/api/pacientes/{id}` | Actualizar paciente |
| DELETE | `/api/pacientes/{id}` | Eliminar paciente |

### Citas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/citas` | Listar todas las citas |
| GET | `/api/citas/{id}` | Obtener cita por ID |
| GET | `/api/citas/proximas` | Obtener próximas citas |
| POST | `/api/citas` | Crear cita (envía email) |
| PUT | `/api/citas/{id}` | Actualizar cita |
| DELETE | `/api/citas/{id}` | Eliminar cita |

### Horarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/horarios` | Listar horarios |
| GET | `/api/horarios/disponibles` | Horarios disponibles |
| GET | `/api/horarios/dia/{dia}` | Horarios por día |
| POST | `/api/horarios` | Crear horario |
| PUT | `/api/horarios/{id}` | Actualizar horario |
| DELETE | `/api/horarios/{id}` | Eliminar horario |

### Materiales
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/materiales` | Listar todos |
| GET | `/api/materiales/publicos` | Listar públicos |
| GET | `/api/materiales/categoria/{cat}` | Por categoría |
| POST | `/api/materiales` | Subir material |
| GET | `/api/materiales/descargar/{id}` | Descargar |
| DELETE | `/api/materiales/{id}` | Eliminar |

## 🎯 Funcionalidades Detalladas

### 1. Sistema de Reserva de Citas
- **Paso 1**: Selección o registro de paciente
- **Paso 2**: Fecha, hora y duración
- **Paso 3**: Motivo y observaciones
- **Confirmación**: Email automático al agendar

### 2. Gestión de Citas (Admin)
- Ver todas las citas
- Cambiar estados: Pendiente, Confirmada, Completada, Cancelada
- Filtros por fecha y terapeuta
- Verificación de disponibilidad

### 3. Materiales Descargables
- Categorías: Ejercicios, Guías, Actividades, Información, Evaluaciones
- Filtros por categoría
- Visualización pública/privada
- Subida desde panel admin

### 4. Panel Administrativo
- Gestión de citas con cambio de estado
- Lista de pacientes con edición
- Gestión de materiales (subir/eliminar)
- Dashboard con estadísticas

## 📧 Configuración de Emails

Los emails se envían automáticamente cuando:
- Se agenda una nueva cita
- Se cancela una cita
- Se confirma una cita

Contenido del email incluye:
- Nombre del paciente
- Fecha y hora
- Duración
- Motivo de consulta

## 🎨 Personalización del Diseño

### Colores Principales
```css
--color-primario: #FF6B9D (Rosa)
--color-secundario: #A8E6CF (Verde menta)
--color-acento: #FFE5B4 (Amarillo pastel)
--color-fondo: linear-gradient(#FFB6D9, #A8E6CF, #FFE5B4)
```

### Fuentes
- **Primaria**: Fredoka (Google Fonts)
- **Secundaria**: Comic Neue
- **Fallback**: Comic Sans MS

## 🔒 Seguridad

- Spring Security configurado
- CORS habilitado para desarrollo
- JWT listo para implementar autenticación
- Validaciones en backend y frontend
- Protección CSRF deshabilitada (para desarrollo)

## 🌐 Despliegue

### Backend (JAR)
```bash
cd backend
mvn clean package -DskipTests
java -jar target/centro-terapia-infantil-1.0.0.jar
```

### Frontend (Build)
```bash
cd frontend
npm run build
# Los archivos estarán en 'dist/'
# Puedes servirlos con cualquier servidor web
```

## 📝 Configuración de Producción

### MySQL
```properties
# application-prod.properties
spring.datasource.url=jdbc:mysql://localhost:3306/centroterapia
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update
```

### Ejecutar con perfil de producción
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

## 🐛 Solución de Problemas

### Error: No se pueden enviar emails
- Verifica las credenciales en `application.properties`
- Usa una "Contraseña de aplicación" de Google
- Asegúrate de tener activada la verificación en dos pasos

### Error: CORS
- Verifica que el frontend esté en `http://localhost:5173`
- Revisa la configuración en `SecurityConfig.java`

### Error: Base de datos
- En desarrollo usa H2 (no requiere instalación)
- En producción, asegúrate de que MySQL esté corriendo
- Verifica las credenciales de conexión

## 📚 Próximas Funcionalidades

- [ ] Autenticación completa con roles
- [ ] Dashboard con gráficas y estadísticas
- [ ] Sistema de notificaciones
- [ ] Historial de cambios en pacientes
- [ ] Integración con calendario
- [ ] Reportes en PDF
- [ ] Chat en tiempo real

## 🤝 Contribuciones

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/NuevaCaracteristica`)
3. Commit cambios (`git commit -m 'Agregar nueva característica'`)
4. Push (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

---

## 🚀 Inicio Rápido

```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

**¡Abre http://localhost:5173 en tu navegador!** 🎉

---

## 📞 Soporte

¿Tienes preguntas? Abre un issue en el repositorio.

**Desarrollado con ❤️ para centros de terapia infantil**
