# Proyecto Final - Backend III

Bienvenido al proyecto final del curso de Backend. Esta guía te llevará paso a paso para instalar y ejecutar la aplicación de dos maneras diferentes: localmente en tu computadora o usando Docker.

---

## Entorno de Trabajo Recomendado
Para seguir esta guía, te recomendamos usar **Visual Studio Code (VS Code)**, un editor de código gratuito y muy popular.
- [Descargar Visual Studio Code](https://code.visualstudio.com/)

---

## Método 1: Instalación Local

Este método es ideal si quieres modificar el código y ver los cambios.

### Paso 1: Obtener el Código Fuente

Primero, necesitas una copia del proyecto en tu computadora.

1.  **Instala Git:** Si no lo tienes, descarga e instala [Git](https://git-scm.com/downloads).
2.  **Abre una Terminal:**
    - En **Windows**, busca "PowerShell" o "Terminal" en el menú de inicio.
    - En **Mac** o **Linux**, busca la aplicación "Terminal".
3.  **Clona el Repositorio:** En la terminal, navega a la carpeta donde guardas tus proyectos (usando el comando `cd`) y ejecuta:
    ```bash
    git clone [https://github.com/frank24z/CODERHOUSE_BACKEND_III_ENTREGA_FA_FINAL.git](https://github.com/frank24z/CODERHOUSE_BACKEND_III_ENTREGA_FA_FINAL.git)
    ```
4.  **Abre el Proyecto en VS Code:**
    - Abre VS Code.
    - Ve a `Archivo > Abrir Carpeta...` (File > Open Folder...).
    - Selecciona la carpeta `CODERHOUSE_BACKEND_III_ENTREGA_FA_FINAL` que acabas de clonar.

### **Paso 2: Abrir la Terminal Integrada en VS Code**

Todos los siguientes comandos se ejecutarán dentro de VS Code.

1.  En el menú superior de VS Code, ve a `Terminal > Nuevo terminal` (Terminal > New Terminal).
2.  Se abrirá un panel en la parte inferior. Esa es tu terminal, ya ubicada en la carpeta correcta del proyecto.

### **Paso 3: Instalar las Dependencias del Proyecto**

Las "dependencias" son las herramientas y librerías que el código necesita para funcionar y para ser probado.

1.  **Instalar dependencias de producción:**
    Este comando instala todo lo que la aplicación necesita para correr.
    ```bash
    npm install
    ```
2.  **Instalar dependencias de desarrollo (para los tests):**
    Este comando instala las herramientas para poder ejecutar las pruebas automáticas.
    ```bash
    npm install --save-dev jest supertest
    ```
3.  Espera a que ambos comandos terminen. Se creará una carpeta `node_modules`. ¡No la borres!

### **Paso 4: Configurar las Variables de Entorno**

Necesitas un archivo especial para guardar tus contraseñas y otros secretos de forma segura.

1.  En el explorador de archivos de VS Code (el panel de la izquierda), haz clic derecho en un espacio vacío y selecciona `Nuevo archivo` (New File).
2.  Nombra el archivo exactamente `.env` (empieza con un punto y no tiene extensión).
3.  Abre el archivo `.env` y pega el siguiente contenido, reemplazando los valores con tus credenciales de MongoDB:
    ```
    MONGO_URI=mongodb+srv://tu_usuario:tu_contraseña@tu_cluster...
    PORT=8080
    ```

### **Paso 5: Ejecutar los Tests**

Antes de iniciar el servidor, es una buena práctica verificar que todo el código funciona correctamente.

1.  En la terminal de VS Code, ejecuta:
    ```bash
    npm test
    ```
2.  Verás los resultados de las pruebas. Si todo está en verde (`PASS`), ¡excelente!

### **Paso 6: Iniciar la Aplicación**

Ahora que todo está configurado y probado, podemos iniciar el servidor.

1.  En la terminal de VS Code, ejecuta:
    ```bash
    npm run dev
    ```
2.  Verás mensajes de éxito como `✅ Servidor escuchando en el puerto 8080` y `✅ Conectado a la base de datos...`.
3.  ¡Listo! La aplicación está funcionando. Puedes acceder a ella a través de `http://localhost:8080` con una herramienta como Postman.

---

## Método 2: Ejecución con Docker 

Este método es ideal si solo quieres ejecutar la aplicación sin instalar Node.js ni configurar un entorno de desarrollo.

### **Paso 1: Instalar Docker**

1.  Descarga e instala **Docker Desktop** desde su [sitio web oficial](https://www.docker.com/products/docker-desktop/).
2.  Abre la aplicación Docker Desktop y espera a que el ícono de la ballena en tu barra de tareas se ponga verde.

### **Paso 2: Descargar la Imagen de la Aplicación**

Una "imagen" es la aplicación ya empaquetada y lista para correr.

1.  Abre una terminal 
2.  Ejecuta el siguiente comando para descargar la imagen desde Docker Hub:
    ```bash
    docker pull frank24z/proyecto_final_fa
    ```

### **Paso 3: Se debe copiar el archivo de Configuración `.env`**


### **Paso 4: Ejecutar la Aplicación**

1.  Abre una terminal y navega hasta la carpeta que creaste en el paso anterior (ej. `cd Desktop/mi-app-docker`).
2.  Ejecuta el siguiente comando. Este comando iniciará la aplicación dentro de un contenedor aislado.
    ```bash
    docker run -p 8080:8080 --env-file ./.env --name mi-app-final frank24z/proyecto_final_fa
    ```

### **Paso 5: Acceder a la Aplicación**

1.  Verás los logs del servidor en tu terminal.
2.  La API estará funcionando y accesible en `http://localhost:8080`.