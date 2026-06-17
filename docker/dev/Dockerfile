FROM php:8.2-fpm-alpine

# Instalar dependencias del sistema y extensiones de PHP para PostgreSQL
RUN apk add --no-cache \
    postgresql-dev \
    nginx \
    supervisor \
    && docker-php-ext-install pdo_pgsql

# Instalar Compose
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar el directorio de trabajo
WORKDIR /var/www/html

# Copiar los archivos de configuracion de Nginx y Supervisor (los creamos luego)
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Exponer el puerto 8000
EXPOSE 8000

# Comando para iniciar Nginx y PHP-FPM
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]