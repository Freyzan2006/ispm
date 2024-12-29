# # Используем базовый образ Python
# FROM python:3.10-slim

# # Устанавливаем рабочую директорию внутри контейнера
# WORKDIR /app

# COPY requirements.txt .

# # Копируем файлы проекта в контейнер
# COPY . .

# # Устанавливаем зависимости
# RUN pip install --no-cache-dir -r requirements.txt

# # RUN pip install --upgrade elasticsearch-dsl elasticsearch

# # Устанавливаем переменные окружения
# ENV ELASTICSEARCH_HOST=https://ispm-elasticsearch-7896988364.us-east-1.bonsaisearch.net
# ENV ELASTICSEARCH_USER=wl3iyxe98o
# ENV ELASTICSEARCH_PASSWORD=ywath53oi1

# # Применяем миграции
# RUN python manage.py migrate

# # Открываем порт для работы
# EXPOSE 8000

# # Запускаем сервер
# # CMD ["bash", "-c", "sleep 10 && python manage.py search_index --create && python manage.py runserver 0.0.0.0:8000"]

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]





# Используем базовый образ Python
FROM python:3.10-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем только файл зависимостей, чтобы ускорить кэширование слоев
COPY requirements.txt ./

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальные файлы проекта в контейнер
COPY . .

# Устанавливаем переменные окружения для подключения к Elasticsearch
# ENV ELASTICSEARCH_HOST=https://ispm-elasticsearch-7896988364.us-east-1.bonsaisearch.net
# ENV ELASTICSEARCH_USER=wl3iyxe98o
# ENV ELASTICSEARCH_PASSWORD=ywath53oi1

# Применяем миграции
# Лучше запускать миграции не на этапе сборки, а в момент старта контейнера
# RUN python manage.py migrate

# Открываем порт для работы
EXPOSE 8000

# Команда для старта приложения с применением миграций
# Запуск миграций и сервера в одном CMD, чтобы контейнер корректно работал
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]