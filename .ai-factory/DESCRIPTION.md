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
- **i18n:** next-intl (ru + en)
- **Icons:** lucide-react

## Architecture

### Project Structure

```
app/                    # Next.js App Router
├── (public)/           # Public site pages
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

Project is in early development stage. Basic Next.js setup exists with:
- Core dependencies installed
- Docker Compose for PostgreSQL
- Basic i18n and DB utilities in lib/

To be implemented based on CLAUDE.md:
- Full app route structure (public pages, admin)
- Prisma schema with translations
- Server Actions for CRUD operations
- Admin authentication and protection
- Complete i18n setup with translations

## Next Steps

1. Create Prisma schema with translation tables
2. Set up app route structure per CLAUDE.md
3. Implement Server Actions for entities
4. Build admin panel with authentication
5. Add public site pages with i18n