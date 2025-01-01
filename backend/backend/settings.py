"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path

import os



# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-*1t&%o69nk()*qvf9$+vkpbs_oihexo3k5ea7wbhqlj*3!29d9'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# CORS_ALLOW_ALL_ORIGINS = True

ALLOWED_HOSTS = ['ispm-backend.onrender.com', 'localhost', '127.0.0.1']

# CORS_ALLOW_ALL_ORIGINS = True 


from datetime import timedelta


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes = 5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days = 1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True, # gkkg
    "UPDATE_LAST_LOGIN": False,

    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": "",
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,

    "AUTH_HEADER_TYPES": ("JWT",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    "JTI_CLAIM": "jti",

    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=1),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=40),

    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}


CORS_ALLOW_ALL_ORIGINS = True

# Примеры дополнительных настроек
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'Accept',
    'Authorization',
    'Content-Type',
]

CORS_MAX_AGE = 3600  # Время в секундах
CORS_ALLOW_CREDENTIALS = True  # Разрешить отправку куки через CORS

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        # 'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        # 'LOCATION': f"redis://{os.getenv('REDIS_HOST', 'redis')}:{os.getenv('REDIS_PORT', 6379)}/1",
        'LOCATION': "redis://red-ctnvl7lumphs73cad9kg:6379",
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}




# Чтобы избежать повторного выполнения тяжелых операций при каждом запросе
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'

# Application definition

INSTALLED_APPS = [
    
    "customAdmin.apps.CustomadminConfig",
    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django_filters',
    
    # 'django_elasticsearch_dsl',
    # 'django_elasticsearch_dsl_drf',
    
 
    "rest_framework",

    "corsheaders",

    "main",
    "table",
    "user",
    "search",
    "download"
]
#http://localhost:9200/_cat/indices?v
# localhost:9200/tablemodel/_search?pretty
# docker-compose exec web python manage.py search_index --create
# ELASTICSEARCH_DSL = {
#     'default': {
#         "hosts": ["http://localhost:9200", "http://elasticsearch:9200", "https://ispm-elasticsearch.onrender.com"]

#         # 'hosts': [os.getenv('ELASTICSEARCH_HOST')],  # Используем переменную окружения
#         # 'http_auth': (os.getenv('ELASTICSEARCH_USER'), os.getenv('ELASTICSEARCH_PASSWORD')),  # Также через env
#         # 'verify_certs': True,
#         # 'headers': {
#         #     "Content-Type": "application/json"
#         # },
#     },
# }
# https://6a172969dc8b444ba61d1363d0bbd018.us-central1.gcp.cloud.es.io:443
# essu_WmpCSVNrVmFVVUpDTTNOVFlURm5jVUo1VVVnNk9VcDNkRlY0YnpSUk4wdFRlSEJLUVdWdWRIbHdadz09AAAAAGtN5yY=

# 'https://ispm-elasticsearch-d60661.es.us-east-1.aws.elastic.cloud:443'
# dmhPYkVaUUJQNW5yTGZfX2FFZlk6ekUtSFJSTmJRY0c3bi1TSEI0UFZwZw==
# essu_WmpCSVNrVmFVVUpDTTNOVFlURm5jVUo1VVVnNk9VcDNkRlY0YnpSUk4wdFRlSEJLUVdWdWRIbHdadz09AAAAAGtN5yY=
# AUTH_USER_MODEL = "user.UserModel"

MEDIA_URL = "/download/media/"
MEDIA_ROOT = BASE_DIR / "download/media"

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    # 'PAGE_SIZE': 2,

    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        'rest_framework.permissions.IsAuthenticated',
    ],

    "DEFAULT_AUTHENTICATION_CLASSES": [
        # 'rest_framework.authentication.SessionAuthentication',
        "rest_framework_simplejwt.authentication.JWTAuthentication"
    ],
    
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Добавьте перед CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    
    


]



ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'table_l9rs',
        'USER': 'admin',
        'PASSWORD': 'VSqFFlMi4Mb3OA2p6K3xy4l13NHhRiAl',
        'HOST': 'dpg-ctoo965svqrc73ba74d0-a.oregon-postgres.render.com',
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://ispm123.netlify.app"
   
]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:5173",
    "https://ispm123.netlify.app"
]

CSRF_TRUSTED_ORIGINS = [
    'https://ispm-backend.onrender.com',
]

