# Инструкции по настройке системы аутентификации

## 1. Настройка базы данных

### Установка PostgreSQL
```bash
# macOS (с Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Windows
# Скачайте и установите PostgreSQL с официального сайта
```

### Создание базы данных
```sql
-- Подключитесь к PostgreSQL как суперпользователь
sudo -u postgres psql

-- Создайте базу данных и пользователя
CREATE DATABASE moonbio;
CREATE USER moonbio_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE moonbio TO moonbio_user;
\q
```

### Настройка переменных окружения
Создайте файл `.env` в корне проекта:
```env
DATABASE_URL="postgresql://moonbio_user:your_password@localhost:5432/moonbio?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"
```

## 2. Инициализация базы данных

```bash
# Генерация Prisma Client
npx prisma generate

# Создание миграций
npx prisma migrate dev --name init

# Применение миграций к базе данных
npx prisma db push
```

## 3. Запуск проекта

```bash
npm run dev
```

## 4. API Endpoints

### Регистрация
- **POST** `/api/auth/register`
- **Body**: `{ email, username, name, password }`

### Авторизация
- **POST** `/api/auth/login`
- **Body**: `{ email, password }`

### Получение информации о пользователе
- **GET** `/api/auth/me`
- **Headers**: Cookie с auth-token

### Выход
- **POST** `/api/auth/logout`

## 5. Защищенные роуты

Middleware автоматически защищает следующие роуты:
- `/profile/*`
- `/settings/*`
- `/market`

Неавторизованные пользователи перенаправляются на `/auth/log`

## 6. Функции системы

✅ **Регистрация пользователей** с валидацией
✅ **Авторизация** с JWT токенами
✅ **Защита роутов** через middleware
✅ **Управление сессиями** в базе данных
✅ **Хеширование паролей** с bcrypt
✅ **Автоматическое перенаправление** неавторизованных пользователей
✅ **Интеграция с фронтендом** через хуки

## 7. Структура базы данных

### Таблица `users`
- `id` - уникальный идентификатор
- `email` - email пользователя (уникальный)
- `username` - имя пользователя (уникальное)
- `name` - отображаемое имя
- `password` - хешированный пароль
- `bio` - биография пользователя
- `avatar` - путь к аватару
- `createdAt` - дата создания
- `updatedAt` - дата обновления

### Таблица `sessions`
- `id` - уникальный идентификатор сессии
- `userId` - ID пользователя
- `token` - JWT токен (уникальный)
- `expiresAt` - время истечения сессии
- `createdAt` - дата создания сессии
