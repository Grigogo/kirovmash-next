# Product Catalog — Implementation Plan

**Branch:** feature/product-catalog
**Created:** 2026-05-06
**Mode:** Full

---

## Settings

- **Testing:** yes
- **Logging:** verbose
- **Docs:** no

---

## Roadmap Linkage

- **Milestone:** "Product Catalog"
- **Rationale:** Directly implements category listing, product grid, and product detail pages with Prisma reads, locale translation, and sidebar navigation.

---

## Environment

- **Framework:** Next.js 16 (App Router)
- **i18n:** next-intl v4, locales: ru (default), en
- **UI:** Tailwind CSS v4 + shadcn/ui (base-nova style, neutral + orange primary)
- **ORM:** Prisma 6 + PostgreSQL
- **Pattern:** Server Components by default, `pickTranslation` from `lib/i18n.ts` for locale fallback

---

## Tasks

### Phase 1: i18n Keys

**1.1 Add catalog i18n keys to messages files** ✅ — `#1`
- Add to BOTH `messages/ru.json` and `messages/en.json`:
  - `catalog.title`, `catalog.description`, `catalog.noCategories`
  - `catalog.category.noProducts`, `catalog.category.allProducts`
  - `catalog.product.price`, `catalog.product.priceOnRequest`, `catalog.product.inStock`,
    `catalog.product.outOfStock`, `catalog.product.specs`, `catalog.product.requestButton`,
    `catalog.product.backToCategory`, `catalog.product.images`
- Files: `messages/ru.json` (modify), `messages/en.json` (modify)

---

### Phase 2: Components

**2.1 Create CategoryCard component** ✅ — `#2`
- File: `components/public/category-card.tsx` (create, Server Component)
- Props: `name`, `slug`, `description?`, `image?`, `productCount?`
- `Link` from `@/i18n/routing` → `/catalog/{slug}`
- `next/image` for category image with placeholder fallback
- Industrial orange accent on hover
- Blocked by: none

**2.2 Create ProductCard component** ✅ — `#3`
- File: `components/public/product-card.tsx` (create, Server Component)
- Props: `name`, `slug`, `categorySlug`, `image?`, `price?`, `priceOnRequest`, `inStock`, `locale`
- `Link` from `@/i18n/routing` → `/catalog/{categorySlug}/{slug}`
- Shows price or "price on request" badge
- In-stock / out-of-stock indicator
- Blocked by: none

**2.3 Create CatalogSidebar component** ✅ — `#4`
- File: `components/public/catalog-sidebar.tsx` (create, Server Component)
- Props: `categories: Array<{ slug: string; name: string }>`, `activeCategorySlug?`
- Vertical list of category links with active highlighting
- "All categories" link at top → `/catalog`
- `Link` from `@/i18n/routing`
- Blocked by: none

> **Commit checkpoint after 2.3:**
> `feat(catalog): add CategoryCard, ProductCard, and CatalogSidebar components`

---

### Phase 3: Catalog Layout

**3.1 Create catalog layout with sidebar** ✅ — `#5`
- File: `app/[locale]/(public)/catalog/layout.tsx` (create, Server Component)
- Fetches all categories with locale translations from Prisma
- Renders `<CatalogSidebar>` + `<main className="flex-1">{children}</main>`
- `setRequestLocale(locale)` at top
- Log: `console.debug('[catalog/layout] fetching categories, locale:', locale)`
- Blocked by: #4

---

### Phase 4: Pages

**4.1 Create catalog landing page** ✅ — `#6`
- File: `app/[locale]/(public)/catalog/page.tsx` (create, Server Component)
- Fetches published categories with product counts
- Grid of `<CategoryCard>` (3-2-1 responsive columns)
- `generateMetadata` via `lib/seo.ts` patterns
- Log: `console.debug('[catalog/page] locale:', locale, 'count:', count)`
- Blocked by: #1, #2

**4.2 Create category page** ✅ — `#7`
- File: `app/[locale]/(public)/catalog/[category]/page.tsx` (create, Server Component)
- Fetches category + published products with translations
- `notFound()` if category not found
- Grid of `<ProductCard>` (3-2-1 responsive)
- Breadcrumbs: Catalog → Category name
- `generateStaticParams` + `generateMetadata`
- Log: `console.debug('[catalog/[category]/page] slug:', slug, 'products:', count)`
- Blocked by: #1, #3, #5

**4.3 Create product detail page** ✅ — `#8`
- File: `app/[locale]/(public)/catalog/[category]/[product]/page.tsx` (create, Server Component)
- Fetches product + category with translations
- `notFound()` if not found or category mismatch
- Layout: image gallery left, info right (price/priceOnRequest, inStock, description, specs table, CTA)
- specs rendered as key/value table from JSON
- `generateStaticParams` + `generateMetadata`
- Log: `console.debug('[catalog/[category]/[product]/page] slug:', slug, 'locale:', locale)`
- Blocked by: #1, #6

> **Commit checkpoint after 4.3:**
> `feat(catalog): add catalog landing, category, and product detail pages`

---

### Phase 5: Tests

**5.1 Write tests for catalog utility helpers** ✅ — `#9`
- File: `lib/__tests__/catalog.test.ts` (create)
- 4+ tests: `pickTranslation` with CategoryTranslation + ProductTranslation, fallback to 'ru', empty array
- Any new utility functions from implementation
- Run `npm test` — all tests must pass
- Blocked by: #7, #8

> **Commit checkpoint after 5.1:**
> `test(catalog): add catalog utility tests`

---

## File Locations

| File | Action |
|------|--------|
| `messages/ru.json` | Modify (add catalog keys) |
| `messages/en.json` | Modify (add catalog keys) |
| `components/public/category-card.tsx` | Create |
| `components/public/product-card.tsx` | Create |
| `components/public/catalog-sidebar.tsx` | Create |
| `app/[locale]/(public)/catalog/layout.tsx` | Create |
| `app/[locale]/(public)/catalog/page.tsx` | Create |
| `app/[locale]/(public)/catalog/[category]/page.tsx` | Create |
| `app/[locale]/(public)/catalog/[category]/[product]/page.tsx` | Create |
| `lib/__tests__/catalog.test.ts` | Create |

---

## Commit Plan

| After task | Commit message |
|-----------|----------------|
| #4 | `feat(catalog): add CategoryCard, ProductCard, and CatalogSidebar components` |
| #8 | `feat(catalog): add catalog landing, category, and product detail pages` |
| #9 | `test(catalog): add catalog utility tests` |
