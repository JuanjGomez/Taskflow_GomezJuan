# Usamos PHP 8.2 con extensiones para Laravel
FROM php:8.2-fpm-alpine

# Instalamos dependencias del sistema
RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    postgresql-dev

# Instalamos extensiones de PHP
RUN docker-php-ext-install \
    pdo_pgsql \
    zip \
    gd

# Instalamos Composer (gestor de dependencias de PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuramos el directorio de trabajo
WORKDIR /var/www/html

# Copiamos los archivos del proyecto
COPY . .

# Instalamos dependecias de Laravel
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Configuramos permisos
RUN chwon -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Exponemos el puerto 8000
EXPOSE 8000

# Comando para iniciar Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000
