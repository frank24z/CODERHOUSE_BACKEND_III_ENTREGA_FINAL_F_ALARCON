# 1. Usar una imagen base oficial de Node.js
FROM node:18-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copiar los archivos de dependencias
COPY package*.json ./

# 4. Instalar las dependencias de producción
RUN npm install --only=production

# 5. Copiar el resto del código fuente de la aplicación
COPY . .

# 6. Exponer el puerto en el que corre la aplicación
EXPOSE 8080

# 7. Definir el comando para iniciar la aplicación
CMD [ "node", "src/app.js" ]