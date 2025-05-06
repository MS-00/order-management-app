FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    libicu-dev \
    libpq-dev \
    libonig-dev \
    && docker-php-ext-install intl pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . /var/www/html

RUN composer install --no-interaction --optimize-autoloader

# Enable Apache mod_rewrite module
RUN a2enmod rewrite

EXPOSE 80

RUN sed -i 's!/var/www/html!/var/www/html/public!g' \
    /etc/apache2/sites-available/000-default.conf
