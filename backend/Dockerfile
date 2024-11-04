# Используем базовый образ Python
FROM python:3.10-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

COPY requirements.txt .

# Копируем файлы проекта в контейнер
COPY . .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Применяем миграции
RUN python manage.py migrate

# Открываем порт для работы
EXPOSE 8000

# Запускаем сервер
# CMD ["bash", "-c", "sleep 10 && python manage.py search_index --create && python manage.py runserver 0.0.0.0:8000"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
