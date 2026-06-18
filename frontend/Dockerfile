# Usamos Node.js 18 LTS
FROM node:20-alpine

# Configuramos el directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Exponemos el puerto 3000
EXPOSE 3000

# Comando para iniciar NExt.js en modo desarrollo
CMD npm run dev