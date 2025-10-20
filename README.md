MoonBio — стартовый шаблон личной страницы с анимациями на Next.js

Сделано на Next.js 15, React 19, Tailwind CSS v4 и Framer Motion. В комплекте темы (светлая/тёмная), анимированные секции, карточки и схема контента для биографии.

## Скрипты

- dev: локальный запуск в режиме разработки
- build: сборка проекта
- start: запуск продакшн-сервера
- lint: проверка кода ESLint

## Быстрый старт

1) Установите зависимости:

```bash
npm install
```

2) Запустите локально:

```bash
npm run dev
```

3) Откройте http://localhost:3000.

## Как настроить свою страницу

- Измените файл `src/content/bio.ts` — имя, роль, описание, соцсети, таймлайн и навыки.
- Компоненты:
  - `src/components/Avatar.tsx` — аватар с инициалами и анимацией
  - `src/components/ThemeToggle.tsx` — переключатель темы (localStorage + системная тема)
  - `src/components/ui/FadeIn.tsx` — универсальная анимация появления
  - `src/components/ui/Card.tsx` — карточка
  - `src/components/ui/Section.tsx` — заголовок секции + отступы
- Главная страница собирает блоки из `bio.ts` в `src/app/page.tsx`.

## Настройка внешнего вида

- Базовые токены и тема — в `src/app/globals.css` (Tailwind v4 + CSS переменные).
- Шапка/подвал/метаданные — в `src/app/layout.tsx`.

## Деплой

- Vercel: подключите репозиторий и деплойте по умолчанию.
- Другие хостинги Node.js: `npm run build` и затем `npm start`.

## Лицензия

MIT
# MoonBio
