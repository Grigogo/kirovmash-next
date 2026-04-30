# Project Base Rules

> Auto-detected conventions from codebase analysis. Edit as needed.

## Naming Conventions

- Files: `kebab-case` (e.g., `product-card.tsx`, `auth-config.ts`)
- Components: `PascalCase` (e.g., `ProductCard`, `AdminLayout`)
- Variables/functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

## TypeScript

- Strict mode enabled, no `any`. Use `unknown` + type guards when type is uncertain.
- Prisma types imported from `@prisma/client`
- Use `type` for component props, `interface` only for extension cases

## Component Architecture

- Server Components by default
- `'use client'` only when needed: state, effects, event handlers, browser APIs
- One component per file, no index.ts barrel files in component folders

## Styling

- Tailwind CSS only, no CSS modules or styled-components
- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Use shadcn CSS variables (`bg-primary`, `text-muted-foreground`), no hardcoded hex

## Data Layer

- Read data directly in Server Components via Prisma (`lib/db.ts`)
- Mutations: **only** through Server Actions in `actions/` folder
- Each Server Action validates input with Zod schema from `lib/validators/`
- After mutation: use `revalidatePath()` or `revalidateTag()`, no manual client refetch

## Forms

- React Hook Form + Zod resolver only
- Use shadcn Form components (`components/ui/form.tsx`)

## Authentication

- Admin routes protected via `middleware.ts` on `/admin/*`
- Session check via `auth()` from Auth.js, never directly via cookies
- Server Actions that modify admin data must check user role before execution

## Slugs

- All public entities (Category, Product, Service) have `slug` for URL
- Slug generated from `name` via `slugify` utility in `lib/utils.ts`
- Uniqueness checked in Server Action

## i18n

- Languages: `ru` (default), `en`
- URL structure: `/ru/...`, `/en/...`
- Translations in `messages/ru.json`, `messages/en.json`
- No hardcoded text — use `getTranslations` (Server) or `useTranslations` (Client)
- Content in DB: translation tables (`*Translation`), fallback to ru if missing

## Project Structure

- `app/` — Next.js App Router routes
- `components/ui/` — shadcn generated components
- `components/public/` — public site components
- `components/admin/` — admin components
- `lib/` — utilities, config, validators
- `actions/` — Server Actions by entity
- `prisma/` — schema and seed
- `messages/` — i18n translation files

## Navigation Requirements

### Main Menu
- **Exclude:** "Проектировщику" — remove from main navigation
- Menu items: О КОМПАНИЯ, ПРОДУКЦИЯ, ОТРАСЛЕВЫЕ РЕШЕНИЯ, УСЛУГИ, КОНТАКТЫ
- Each menu item may have dropdown submenu

### Sidebar Navigation
- **Required on:** `/catalog/*` (product pages) and `/catalog/uslugi*` (services pages)
- **Always visible** — displayed on left side of page
- Contains categories from product catalog and services
- Must match the structure from konmash.ru:
  - Ленточные конвейеры
  - Узлы, комплектующие
  - Комплектующие для ленточных конвейеров
  - Комплектующие для цепных конвейеров
  - Комплектующие для норий и элеваторов
  - Винтовые конвейеры (шнек)
  - Скребковые цепные конвейеры
  - Нории
  - Услуги
  - Элеваторы
  - Пластинчатые конвейеры
  - Питатели
  - Крутонаклонные ленточные конвейеры
  - Стакеры
  - Документы