# Proyecto Final - Backend III


Esta guía es el paso a paso para instalar, probar y ejecutar la aplicación de dos maneras diferentes:  
**localmente en tu computadora** o  
**usando Docker**.

La aplicación implementa una **API RESTful** para la gestión de **Usuarios**, **Mascotas** y **Adopciones**.  
Incluye generación de datos de prueba (mocking), tests automáticos y documentación interactiva con **Swagger**.

---

## Características Principales

- **API Completa:** Endpoints para gestionar **Usuarios**, **Mascotas** y **Adopciones**.  
- **Mocking de Datos:** Rutas para generar datos de prueba sin afectar la base de datos principal.  
- **Documentación Interactiva:** API documentada con **Swagger**, accesible desde el navegador.  
- **Tests Funcionales:** Suite de pruebas automáticas con **Jest** y **Supertest**.  
- **Dockerización:** La aplicación está empaquetada en una imagen de **Docker** para un despliegue rápido y consistente.  

---

## Método 1: Instalación y ejecución Local

Este método es ideal si quieres explorar el código, modificarlo y ver los cambios al instante.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión **18 o superior**)  
- [Git](https://git-scm.com/downloads)  
- Una base de datos de [MongoDB Atlas](https://www.mongodb.com/)

---

### Paso 1: Obtener el Código Fuente

```bash
git clone https://github.com/frank24z/CODERHOUSE_BACKEND_III_ENTREGA_FINAL_F_ALARCON.git
cd CODERHOUSE_BACKEND_III_ENTREGA_FINAL_F_ALARCON
```

Abre el proyecto en **Visual Studio Code**:  
> Archivo → Abrir carpeta... → selecciona la carpeta del proyecto

---

### Paso 2: Instalar las Dependencias

```bash
npm install
```

---

### Paso 3: Configurar las Variables de Entorno (.env)

Crea un archivo llamado `.env` en la raíz del proyecto.  
Pega el siguiente contenido, reemplazando los valores con tus credenciales de MongoDB:

```env
MONGO_URI=mongodb+srv://tu_usuario:tu_contraseña@tu_cluster.mongodb.net/test
PORT=8080
JWT_SECRET=coderBackendSecret
```

---

### Paso 4: Ejecutar los Tests

Antes de iniciar el servidor, es recomendable verificar que todo funciona correctamente.

```bash
npm test
```

Si todos los resultados aparecen en **verde (PASS)**, ¡estás listo para continuar! ✅

---

### Paso 5: Iniciar la Aplicación

Ejecuta el servidor en modo desarrollo (reinicio automático con cada cambio):

```bash
npm run dev
```

Deberías ver mensajes como estos en la terminal:

```
✅ Servidor escuchando en el puerto 8080
✅ Conectado a la base de datos...
```

---

### Paso 6: Explorar la Documentación de la API con Swagger

Con el servidor corriendo, abre tu navegador en:  
http://localhost:8080/api-docs

Ahí podrás explorar y probar la API de forma interactiva.

---

## Método 2: Ejecución con Docker (Fácil y Rápido)

Ideal si solo deseas ejecutar la aplicación sin instalar Node.js ni configurar nada localmente.

### Prerrequisitos

- Tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y ejecutándose.

---

### Paso 1: Descargar la Imagen desde Docker Hub

```bash
docker pull frank24z/proyecto_final_fa
```

---

### Paso 2: Copiar el Archivo `.env`

Se informara el .env a utilizar. Siendo de la siguiente forma:

```env
MONGO_URI=mongodb+srv://tu_usuario:tu_contraseña@tu_cluster.mongodb.net/test
PORT=8080
JWT_SECRET=Secret
```

---

### Paso 3: Ejecutar la Aplicación en un Contenedor

Abre una terminal, navega hasta la carpeta donde creaste el `.env` y ejecuta:

```bash
docker run -p 8080:8080 --env-file ./.env --name mi-app-final frank24z/proyecto_final_fa
```

---

### Paso 4: Acceder a la Aplicación

Una vez corriendo, verás los logs del servidor en la terminal.

La API estará disponible en:  
http://localhost:8080

Y la documentación Swagger en:  
http://localhost:8080/api-docs

---

## Estructura del Proyecto

```
├── src/
│   ├── app.js                # Punto de entrada principal
│   ├── dao/                  # Acceso a datos
│   ├── models/               # Modelos de MongoDB (Mongoose)
│   ├── routers/              # Rutas de la API
│   ├── tests/                # Pruebas automatizadas
├── Dockerfile
├── package.json
└── README.md
```

---

## Endpoints Principales

| Método | Ruta                        | Descripción                          |
|:-------|:----------------------------|:-------------------------------------|
| GET    | `/api/users`                | Lista todos los usuarios             |
| GET    | `/api/pets`                 | Lista todas las mascotas             |
| GET    | `/api/adoptions`            | Lista todas las adopciones           |
| POST   | `/api/adoptions`            | Crea una nueva adopción              |
| GET    | `/api/mocks/mockingusers`   | Genera usuarios de prueba (mock)     |
| GET    | `/api/mocks/mockingpets`    | Genera mascotas de prueba (mock)     |
| POST   | `/api/mocks/generateData`   | Inserta datos de prueba en la BD     |

---

## Tecnologías Utilizadas

- **Node.js** + **Express**  
- **MongoDB Atlas** 
- **Swagger UI Express**  
- **Jest** + **Supertest**  
- **Docker**  
- **dotenv**, **faker.js**, **bcrypt**, **jsonwebtoken**

---
