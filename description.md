# Проект FitFriends

## Подготовка к запуску проекта

1. Установите необходимые пакеты. Для этого из папки проекта запустите команду `npm install`.
2. В папке `./apps/backend/prisma` создайте файл `.env` и заполните переменными окружения. Пример переменных окружения приведен в файле `.env-example`.
3. В папке `./environments` создайте файлы: `.backend.env`. Заполните созданные файлы переменными окружения. Примеры находятся в файлах `*.env-example`.
4. Создайте типы для Prisma. Для этого из папки проекта запустите команду `nx run backend:db-generate`.
5. Создейте контейнеры Docker. Для этого:
    * из папки `./backend` запустите команду `docker-compose up -d`;

### Описание переменных окружения env
В .backend.env должны находиться следующие переменные:
  * `JWT_AT_SECRET` - секрет Access Token;
  * `JWT_AT_EXPIRES_IN` - срок действия Access Token;
  * `JWT_RT_SECRET` -  - секрет Refresh Token;
  * `JWT_RT_EXPIRES_IN` - срок действия Refresh Token;

## Работа проекта

### Запуск приложений

Для запуска приложений запустите следующую команду в терминале:

`nx run-many --target=serve --projects=frontend,backend`
