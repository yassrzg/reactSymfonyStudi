FROM php:8.2-fpm
RUN groupmod -g 1000 www-data && usermod -u 1000 www-data
COPY php.ini /usr/local/etc/php/conf.d/docker-php-config.ini
#apt install
RUN apt-get update \
    && apt-get install -y git zlib1g-dev libicu-dev zip libzip-dev zip libxml2-dev wget libpq-dev libpng-dev libxslt-dev
RUN docker-php-ext-install intl opcache pdo \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

RUN docker-php-ext-install gd
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install soap
RUN docker-php-ext-install xsl

RUN docker-php-ext-configure \
    zip \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


USER www-data

WORKDIR /var/www/symfony