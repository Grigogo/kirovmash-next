@AGENTS.md

# Conveyor Site — правила проекта

Сайт компании по производству и обслуживанию конвейерного оборудования: публичная часть с каталогом товаров и услуг + админ-панель для управления контентом и заявками.

## Стек

- **Next.js 15** (App Router, Server Components по умолчанию)
- **TypeScript** (strict mode)
- **Tailwind CSS** + **shadcn/ui** для UI
- **Prisma** + **PostgreSQL** для данных
- **Auth.js v5** (NextAuth) для авторизации админки
- **Zod** для валидации
- **React Hook Form** для форм в админке

## Структура проекта
app/
├── (public)/              # публичная часть сайта
│   ├── layout.tsx         # шапка/футер публички
│   ├── page.tsx           # главная
│   ├── catalog/
│   │   ├── page.tsx
│   │   └── [category]/
│   │       ├── page.tsx
│   │       └── [product]/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx
│   └── contacts/page.tsx
├── admin/                 # админка, защищена middleware
│   ├── layout.tsx         # сайдбар админки
│   ├── page.tsx           # дашборд
│   ├── products/
│   ├── categories/
│   ├── services/
│   ├── leads/
│   └── login/page.tsx
└── api/                   # минимально, только если нельзя через Server Actionscomponents/
├── ui/                    # shadcn-компоненты (генерируются CLI)
├── public/                # компоненты публичной части
└── admin/                 # компоненты админкиlib/
├── db.ts                  # Prisma client (singleton)
├── auth.ts                # конфигурация Auth.js
├── validators/            # Zod-схемы (по сущности на файл)
└── utils.ts               # утилиты (cn() от shadcn и пр.)prisma/
├── schema.prisma
└── seed.ts                # начальные данные для разработкиactions/                   # Server Actions, по файлу на сущность
├── products.ts
├── categories.ts
├── services.ts
└── leads.ts

Отлично. Тогда вот тебе полный CLAUDE.md под наш проект. Замени им содержимое текущего файла полностью.
Текст для CLAUDE.md
markdown@AGENTS.md

# Conveyor Site — правила проекта

Сайт компании по производству и обслуживанию конвейерного оборудования: публичная часть с каталогом товаров и услуг + админ-панель для управления контентом и заявками.

## Стек

- **Next.js 15** (App Router, Server Components по умолчанию)
- **TypeScript** (strict mode)
- **Tailwind CSS** + **shadcn/ui** для UI
- **Prisma** + **PostgreSQL** для данных
- **Auth.js v5** (NextAuth) для авторизации админки
- **Zod** для валидации
- **React Hook Form** для форм в админке

## Структура проекта

```
app/
├── (public)/              # публичная часть сайта
│   ├── layout.tsx         # шапка/футер публички
│   ├── page.tsx           # главная
│   ├── catalog/
│   │   ├── page.tsx
│   │   └── [category]/
│   │       ├── page.tsx
│   │       └── [product]/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx
│   └── contacts/page.tsx
├── admin/                 # админка, защищена middleware
│   ├── layout.tsx         # сайдбар админки
│   ├── page.tsx           # дашборд
│   ├── products/
│   ├── categories/
│   ├── services/
│   ├── leads/
│   └── login/page.tsx
└── api/                   # минимально, только если нельзя через Server Actions

components/
├── ui/                    # shadcn-компоненты (генерируются CLI)
├── public/                # компоненты публичной части
└── admin/                 # компоненты админки

lib/
├── db.ts                  # Prisma client (singleton)
├── auth.ts                # конфигурация Auth.js
├── validators/            # Zod-схемы (по сущности на файл)
└── utils.ts               # утилиты (cn() от shadcn и пр.)

prisma/
├── schema.prisma
└── seed.ts                # начальные данные для разработки

actions/                   # Server Actions, по файлу на сущность
├── products.ts
├── categories.ts
├── services.ts
└── leads.ts
```

## Доменная модель

Сущности: `Category`, `Product`, `Service`, `Lead`, `User`.

- **Category** — категории товаров (`name`, `slug`, `description`, изображение)
- **Product** — товар (`name`, `slug`, `description`, `images[]`, `specs` JSON, `price` nullable, `priceOnRequest` bool, `inStock` bool, `categoryId`, `published` bool)
- **Service** — услуга (`name`, `slug`, `description`, `images[]`, `priceFrom` nullable, `published` bool) — отдельная сущность, не подтип товара
- **Lead** — заявка с публичной части (`name`, `phone`, `email` nullable, `message`, `productId` nullable, `serviceId` nullable, `status`: NEW/IN_PROGRESS/DONE/REJECTED, `createdAt`)
- **User** — пользователь админки (`email`, `passwordHash`, `role`: ADMIN/EDITOR)

Все сущности имеют `id` (cuid), `createdAt`, `updatedAt`.

## Конвенции кода

### TypeScript
- Strict mode, никаких `any`. Если тип неизвестен — `unknown` + сужение через type guards.
- Типы Prisma импортируем из `@prisma/client`.
- Для props компонентов используй `type`, не `interface`, кроме случаев расширения.

### Компоненты
- Server Components по умолчанию. `'use client'` — только когда реально нужен (state, эффекты, обработчики событий, браузерные API).
- Файлы в `kebab-case` (`product-card.tsx`), компоненты в `PascalCase`.
- Один компонент = один файл. Без index.ts barrel-файлов в папках компонентов.

### Стили
- Только Tailwind. Никаких CSS-модулей и styled-components.
- Утилиту `cn()` (из `lib/utils.ts`) использовать для условных классов.
- Цвета и токены — через переменные shadcn (`bg-primary`, `text-muted-foreground`), не хардкодить hex.

### Данные и мутации
- Чтение данных — прямо в Server Components через Prisma (`lib/db.ts`).
- Мутации (создание/редактирование/удаление) — **только через Server Actions** в папке `actions/`. Никаких API routes для CRUD.
- Каждая Server Action валидирует вход через Zod-схему из `lib/validators/`.
- После мутации — `revalidatePath()` или `revalidateTag()`, не делать ручной refetch на клиенте.

### Формы
- Только React Hook Form + Zod resolver.
- Используй компоненты Form из shadcn (`components/ui/form.tsx`).

### Авторизация
- Админка защищена через `middleware.ts` на уровне роута `/admin/*`.
- Сессия проверяется через `auth()` из Auth.js, не через cookies напрямую.
- В Server Actions, меняющих данные админки, проверять роль перед выполнением.

### Slugs
- Все публичные сущности (Category, Product, Service) имеют `slug` для URL.
- Slug генерируется из `name` через утилиту `slugify` (lib/utils.ts), уникальность проверяется в Server Action.

## Чего не делать

- Не использовать `axios` — только нативный `fetch`.
- Не создавать API routes (`app/api/*`) для того, что можно сделать через Server Actions. API routes только для вебхуков и публичных эндпоинтов, если такие появятся.
- Не использовать `useEffect` для загрузки данных — данные грузим в Server Components.
- Не хранить sensitive-данные в client-компонентах. Если что-то пришло с сервера — оно уже отфильтровано.
- Не коммитить `.env`. Все секреты — в `.env.local`, в репозитории — только `.env.example`.
- Не редактировать сгенерированные файлы Prisma в `node_modules`.
- Не использовать deprecated API Next.js — сверяйся с локальной документацией в `node_modules/next/dist/docs/` перед написанием серверных API (см. AGENTS.md).

## Работа с базой данных

- Локальная БД — Postgres в Docker (см. `docker-compose.yml`, который мы создадим).
- Миграции через `npx prisma migrate dev --name <описание>`.
- После изменения `schema.prisma` — обязательно `npx prisma generate`.
- Для разработки есть `prisma/seed.ts`, наполняет БД тестовыми данными (несколько категорий, товаров, услуг).

## Команды проекта

- `npm run dev` — dev-сервер
- `npm run build` — продакшн-билд
- `npm run lint` — ESLint
- `npx prisma studio` — GUI для БД
- `npx prisma migrate dev` — применить миграции
- `npm run db:seed` — наполнить БД тестовыми данными (после настройки)

## Стиль работы агента

- Перед изменением нескольких файлов — сначала покажи план в чате, дождись подтверждения.
- Каждый логический блок изменений = отдельный коммит с понятным сообщением (формат: `feat: ...`, `fix: ...`, `chore: ...`, `refactor: ...`).
- Если задача требует установки новых пакетов — сначала перечисли их и объясни зачем.
- Если в коде встречается противоречие с этими правилами (например, при рефакторинге старого) — укажи на это явно.
- Незнакомые/сомнительные библиотеки — не использовать без обсуждения. Предпочитай то, что уже в стеке.
