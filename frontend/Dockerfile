# Используем базовый образ Node.js для сборки
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Используем образ Nginx для хостинга
FROM nginx:stable-alpine

# Устанавливаем рабочую директорию для Nginx
WORKDIR /usr/share/nginx/html

# Удаляем стандартные файлы Nginx
RUN rm -rf ./*

# Копируем собранное приложение из предыдущего этапа
COPY --from=builder /app/dist .

# Копируем кастомный Nginx конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]