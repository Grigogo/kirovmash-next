# Conveyor Site — Project Specification

## Overview

Corporate website for a conveyor equipment manufacturing and service company: public-facing catalog and services + admin panel for content and lead management.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components by default)
- **Language:** TypeScript (strict mode)
- **UI:** Tailwind CSS v4 + shadcn/ui
- **Database:** PostgreSQL 16 (via Docker)
- **ORM:** Prisma 6
- **Authentication:** Auth.js v5 (NextAuth)
- **Validation:** Zod
- **Forms:** React Hook Form + Zod resolver
- **i18n:** next-intl v4 (ru + en)
- **Icons:** lucide-react
- **Testing:** Vitest 3.x (unit tests for lib/ utilities)

## Architecture

### Project Structure

```
app/                    # Next.js App Router
├── [locale]/           # Locale-scoped routes (ru/en)
│   ├── layout.tsx      # Locale layout: html lang, NextIntlClientProvider
│   └── page.tsx        # Home page with i18n
├── (public)/           # Public site pages (to be moved under [locale])
├── admin/              # Admin panel (protected by middleware)
├── api/                # API routes (minimal, webhooks only)
lib/
├── db.ts               # Prisma client (singleton)
├── auth.ts             # Auth.js configuration
├── validators/         # Zod schemas
└── utils.ts            # Utilities (cn() from shadcn)
components/
├── ui/                 # shadcn/ui components
├── public/             # Public site components
└── admin/              # Admin components
actions/                # Server Actions (mutations)
prisma/
├── schema.prisma       # Database schema
└── seed.ts             # Seed data
messages/               # i18n translations (ru.json, en.json)
```

### Database Entities

- **Category** — product categories (name, slug, description, image)
- **Product** — products with specs, pricing, images, translations
- **Service** — services offered (separate from products)
- **Lead** — contact form submissions with status tracking
- **User** — admin users with role (ADMIN/EDITOR)

### Key Patterns

- **Data fetching:** Direct in Server Components via Prisma
- **Mutations:** Server Actions only, validated with Zod
- **Forms:** React Hook Form + shadcn Form components
- **i18n:** URL-based (locale prefix), translations in separate tables

### Navigation (based on konmash.ru)

**Main Menu (Header):**
- О КОМПАНИЯ — with dropdown submenu
- ПРОДУКЦИЯ — with dropdown submenu
- ОТРАСЛЕВЫЕ РЕШЕНИЯ — with dropdown submenu
- УСЛУГИ
- КОНТАКТЫ
- **EXCLUDED:** Проектировщику — do not include in menu

**Sidebar Navigation:**
- Always visible on left side for routes `/catalog/*` and `/catalog/uslugi*`
- Contains product categories and services list
- Categories: Ленточные конвейеры, Узлы/комплектующие, Винтовые конвейеры, Скребковые цепные конвейеры, Нории, Элеваторы, Пластинчатые конвейеры, Питатели, Крутонаклонные, Стакеры, Услуги, Документы

### Homepage Blocks (konmash.ru structure)

1. **Header** — top bar with logo, phone, contacts, "Заказать звонок" button
2. **Main Menu** — navigation bar with dropdowns
3. **Hero Slider** — main banner with company value proposition
4. **Product Tiles** — grid of product category cards (Ленточные конвейеры, Узлы/комплектующие, Винтовые конвейеры, Скребковые цепные конвейеры, Нории, Элеваторы, Пластинчатые конвейеры, Питатели, Крутонаклонные, Стакеры)
5. **Industry Solutions** — section with industry-specific solutions (Золотодобыча, Нерудная промышленность, Химические предприятия, Топливная энергетика, АПК, Лесная и ЦБК, Производство строительных материалов, Сахарная промышленность, Порты и терминалы, Пылегазоотчистка, ГМК, Угольная промышленность)
6. **Projects Section** — implemented projects showcase (realized projects with images and descriptions)
7. **Certificates Block** — company certifications and awards
8. **Company Info** — about section with regional offices
9. **Map** — company location map
10. **Contact Form** — feedback form with email subscription
11. **Footer** — links, contacts, social media

## Current Status

Foundation is complete. Implemented:
- Core dependencies, Docker Compose for PostgreSQL
- Prisma schema with translation tables (all entities)
- i18n infrastructure: next-intl v4, locale routing/middleware, ru.json + en.json
- SEO infrastructure: metadata helper, sitemap, robots, image optimization, WebVitals
- Vitest setup with unit tests for lib/i18n.ts

To be implemented:
- Public site layout (header, footer, navigation)
- Product catalog pages
- Services section
- Static pages (About, Contacts)
- Admin panel (authentication, CRUD)
- Lead capture (contact form)

## Next Steps

1. **Public Site Layout** — header, footer, navigation with i18n
2. **Product Catalog** — category listing and product detail pages
3. **Admin Authentication** — Auth.js setup