#!/bin/bash

echo "🚀 Настройка системы аутентификации MoonBio..."

# Проверка наличия .env файла
if [ ! -f .env ]; then
    echo "❌ Файл .env не найден!"
    echo "📝 Создайте файл .env с переменными окружения:"
    echo ""
    echo "DATABASE_URL=\"postgresql://username:password@localhost:5432/moonbio?schema=public\""
    echo "JWT_SECRET=\"your-super-secret-jwt-key-change-this-in-production\""
    echo "NEXTAUTH_URL=\"http://localhost:3000\""
    echo "NEXTAUTH_SECRET=\"your-nextauth-secret-key\""
    echo ""
    exit 1
fi

echo "✅ Файл .env найден"

# Генерация Prisma Client
echo "🔧 Генерация Prisma Client..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma Client сгенерирован"
else
    echo "❌ Ошибка генерации Prisma Client"
    exit 1
fi

# Создание миграций
echo "📊 Создание миграций базы данных..."
npx prisma migrate dev --name init

if [ $? -eq 0 ]; then
    echo "✅ Миграции созданы и применены"
else
    echo "❌ Ошибка создания миграций"
    exit 1
fi

echo ""
echo "🎉 Настройка завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Убедитесь, что PostgreSQL запущен"
echo "2. Проверьте подключение к базе данных в .env"
echo "3. Запустите проект: npm run dev"
echo ""
echo "🔗 Доступные страницы:"
echo "- Регистрация: http://localhost:3000/auth/reg"
echo "- Авторизация: http://localhost:3000/auth/log"
echo "- Главная: http://localhost:3000"
echo ""
