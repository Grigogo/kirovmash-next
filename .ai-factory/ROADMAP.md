# Project Roadmap

> Corporate website for conveyor equipment manufacturing and service company: public catalog + admin panel

## Milestones

- [x] **Database Schema** — Prisma schema with translation tables for Category, Product, Service, Lead, User entities
- [x] **i18n Infrastructure** — Set up next-intl routing, middleware, translation files, and utility functions
- [ ] **Public Site Layout** — Build shared layout with header/footer, navigation, and base styling
- [ ] **Product Catalog** — Create public catalog pages with category listing, product grid, and product detail pages
- [ ] **Services Section** — Build services listing and individual service pages
- [ ] **Static Pages** — Implement About and Contacts pages with contact form
- [ ] **Admin Authentication** — Set up Auth.js with credentials provider, session management, and route protection
- [ ] **Admin Dashboard** — Create admin layout with sidebar and main dashboard page
- [ ] **Category Management** — Admin CRUD for categories (list, create, edit, delete)
- [ ] **Product Management** — Admin CRUD for products with rich editor (images, specs, pricing)
- [ ] **Service Management** — Admin CRUD for services
- [ ] **Lead Management** — Admin interface to view and manage contact form submissions
- [ ] **Lead Capture** — Contact form on public site with lead creation and email notification
- [x] **SEO & Performance** — Add metadata, sitemap, optimize images, improve Core Web Vitals

## Completed

| Milestone | Date | Details |
|-----------|------|---------|
| Project Initialization | 2026-04-30 | Next.js 16, TypeScript, Tailwind v4, ESLint |
| Database Setup (Prisma + Docker) | 2026-04-30 | PostgreSQL schema, migrations, seed data |
| i18n Utilities | 2026-04-30 | lib/i18n.ts with Locale type, pickTranslation |
| Database Schema | 2026-04-30 | Full Prisma schema with all entities and translations |
| SEO & Performance | 2026-04-30 | lib/seo.ts, app/sitemap.ts, app/robots.ts, next.config image optimization, WebVitals reporter |
| i18n Infrastructure | 2026-04-30 | next-intl v4, i18n/routing.ts, i18n/request.ts, middleware.ts, messages/ru.json + en.json, app/[locale]/ structure, Vitest setup |

## Implementation Progress

```
Total: 14 milestones
Completed: 6 (43%)
In Progress: 0
Pending: 8 (57%)
```

### Details by Milestone

| # | Milestone | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Database Schema | ✅ Done | prisma/schema.prisma with Category, Product, Service, Lead, User + translations |
| 2 | i18n Infrastructure | ✅ Done | next-intl v4, routing, middleware, ru.json + en.json, app/[locale]/ structure, Vitest |
| 3 | Public Site Layout | ⏳ Not Started | No header, footer, navigation components |
| 4 | Product Catalog | ⏳ Not Started | No catalog pages or product components |
| 5 | Services Section | ⏳ Not Started | No service pages |
| 6 | Static Pages | ⏳ Not Started | No About/Contacts pages |
| 7 | Admin Authentication | ⏳ Not Started | No Auth.js, no login page |
| 8 | Admin Dashboard | ⏳ Not Started | No admin layout or dashboard |
| 9 | Category Management | ⏳ Not Started | No admin CRUD for categories |
| 10 | Product Management | ⏳ Not Started | No admin CRUD for products |
| 11 | Service Management | ⏳ Not Started | No admin CRUD for services |
| 12 | Lead Management | ⏳ Not Started | No admin interface for leads |
| 13 | Lead Capture | ⏳ Not Started | No public contact form |
| 14 | SEO & Performance | ✅ Done | lib/seo.ts, sitemap.ts, robots.ts, image optimization, WebVitals reporter |

## Next Steps

Start with:
1. **i18n Infrastructure** — Install next-intl, set up middleware and routing
2. **Public Site Layout** — Create header, footer, navigation components
3. Continue with catalog pages and further milestones

---

*Last updated: 2026-04-30*