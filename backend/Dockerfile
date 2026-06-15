# Etapa 1: BUILD
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias (incluyendo devDependencias para build)
RUN npm ci

# Copiar codigo fuente
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa 2: Produccion
FROM node:20-alpine
WORKDIR /app

# Variables en entorno de produccion
ENV NODE_ENV=production

# Copiar dependencias de produccion
COPY package*.json ./
RUN npm ci --only=production

# Copiar codigo compilado y archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# EXPONER PUERTO
EXPOSE 3000

# Script para iniciar migraciones y servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]