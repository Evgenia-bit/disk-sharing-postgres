# Сервис по обмену DVD дисками

## Описание

Есть коллекция дисков у каждого участника. Диски можно брать и отдавать.
Разработанный сервис предоставляет возможность для учета дисков у
собственников, передачи дисков другим пользователям, наличия свободных дисков.

В системе три сущности:

* Disk (DVD-диск),
* User ,
* TakenItem (связка User-Disk).

В приложении предполагается пять экранов:

* авторизация,
* список собственных дисков у каждого пользователя,
* список свободных дисков (у всех пользователей невзятые),
* список дисков, взятых пользователем;
* список дисков, взятых у пользователя (с указанием, кто взял).

Диск можно взять и отдать (без денежных расчётов).


## Запуск

### Через Docker

```
docker-compose up
```

### Обычный

```
npm install
npm run prefill 
npm run start
```
### Технологии

* node.js
* express
* PostgreSQL


Аналогичный сервис на MongoDB доступен по ссылке: https://github.com/Evgenia-bit/disk-sharing-mongo
