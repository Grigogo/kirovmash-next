# Services Section — Implementation Plan

**Branch:** feature/services-section
**Created:** 2026-05-06
**Mode:** Full

---

## Settings

- **Testing:** yes
- **Logging:** verbose
- **Docs:** no

---

## Roadmap Linkage

- **Milestone:** "Services Section"
- **Rationale:** Directly implements services listing and detail pages with Prisma reads and locale translation.

---

## Environment

- **Framework:** Next.js 16 (App Router)
- **i18n:** next-intl v4, locales: ru (default), en
- **UI:** Tailwind CSS v4 + shadcn/ui (base-nova style, neutral + orange primary)
- **ORM:** Prisma 6 + PostgreSQL
- **Route:** `app/[locale]/(public)/services/`

---

## Tasks

### Phase 1: i18n Keys

**1.1 Add services i18n keys** ✅ — `#10`
- Add to BOTH `messages/ru.json` and `messages/en.json`:
  - `services.title`, `services.description`, `services.noServices`
  - `services.service.priceFrom`, `services.service.priceOnRequest`, `services.service.requestButton`, `services.service.backToServices`

---

### Phase 2: Components

**2.1 Create ServiceCard component** ✅ — `#11`
- File: `components/public/service-card.tsx` (create, Server Component)
- Props: `name`, `slug`, `description?`, `image?`, `priceFrom?`, `priceFromLabel`, `priceOnRequestLabel`
- `Link` from `@/i18n/routing` → `/services/{slug}`
- `next/image` for image with placeholder fallback
- Price display: priceFrom or "price on request"
- Blocked by: #10

> **Commit checkpoint after 2.1:**
> `feat(services): add ServiceCard component and i18n keys`

---

### Phase 3: Pages

**3.1 Create services listing page** — `#12`
- File: `app/[locale]/(public)/services/page.tsx` (create, Server Component)
- Fetches published services with locale translations
- Grid of `<ServiceCard>` (3-2-1 responsive)
- `generateStaticParams` + `generateMetadata`
- Blocked by: #10, #11

**3.2 Create service detail page** — `#13`
- File: `app/[locale]/(public)/services/[slug]/page.tsx` (create, Server Component)
- Fetches service by slug with translations
- `notFound()` if not found or not published
- Layout: image left + info right (priceFrom, description, CTA)
- Breadcrumbs: Services → service name
- `generateMetadata`
- Blocked by: #10, #12

> **Commit checkpoint after 3.2:**
> `feat(services): add services listing and detail pages`

---

### Phase 4: Tests

**4.1 Write tests for services utility** — `#14`
- File: `lib/__tests__/services.test.ts` (create)
- 4 tests: `pickTranslation` with ServiceTranslation, fallback, empty array, custom fallback
- Run `npm test` — all tests pass
- Blocked by: #12, #13

> **Commit checkpoint after 4.1:**
> `test(services): add services utility tests`

---

## File Locations

| File | Action |
|------|--------|
| `messages/ru.json` | Modify (add services keys) |
| `messages/en.json` | Modify (add services keys) |
| `components/public/service-card.tsx` | Create |
| `app/[locale]/(public)/services/page.tsx` | Create |
| `app/[locale]/(public)/services/[slug]/page.tsx` | Create |
| `lib/__tests__/services.test.ts` | Create |

---

## Commit Plan

| After task | Commit message |
|-----------|----------------|
| #11 | `feat(services): add ServiceCard component and i18n keys` |
| #13 | `feat(services): add services listing and detail pages` |
| #14 | `test(services): add services utility tests` |
