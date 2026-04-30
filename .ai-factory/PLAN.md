# i18n Infrastructure — Implementation Plan

**Created:** 2026-04-30
**Mode:** Fast

---

## Settings

- **Testing:** yes
- **Logging:** standard
- **Docs:** no

---

## Roadmap Linkage

- **Milestone:** "i18n Infrastructure"
- **Rationale:** Installs next-intl, sets up locale routing/middleware, and creates translation files — directly implements this milestone.

---

## Environment

- **Framework:** Next.js 16 (App Router)
- **i18n Library:** next-intl (to be installed)
- **Locales:** `ru` (default), `en`
- **URL structure:** `/ru/...`, `/en/...`

---

## Tasks

### Phase 1: Install & Configuration

**1.1 Install next-intl** ✅
- Run: `npm install next-intl`
- Verify installed version and compatibility with Next.js 16

**1.2 Create `i18n/routing.ts`** ✅
- Use `defineRouting` from `next-intl/routing`
- Config: `locales: ['ru', 'en']`, `defaultLocale: 'ru'`
- Export `createNavigation` helpers: `Link`, `redirect`, `usePathname`, `useRouter`

**1.3 Create `i18n/request.ts`** ✅
- Use `getRequestConfig` from `next-intl/server`
- Load `messages/{locale}.json` dynamically
- Fallback to `'ru'` if locale is invalid

**1.4 Create `middleware.ts`** ✅
- Use routing config from `i18n/routing.ts` to create middleware
- Matcher excludes: `_next/static`, `_next/image`, `favicon.ico`, `api/*`

> **Commit checkpoint after 1.4:**
> `feat(i18n): add next-intl config, routing, and middleware`

---

### Phase 2: Translation Files

**2.1 Create `messages/ru.json` and `messages/en.json`** ✅
- Keys structure:
  ```
  common.cta.contactUs
  common.cta.viewCatalog
  common.loading
  common.error
  nav.about / nav.catalog / nav.solutions / nav.services / nav.contacts
  home.hero.title / home.hero.subtitle / home.hero.description
  home.products.title
  home.services.title
  metadata.defaultTitle
  metadata.description
  ```

> **Commit checkpoint after 2.1:**
> `feat(i18n): add translation files (ru/en)`

---

### Phase 3: App Router Integration

**3.1 Create `app/[locale]/layout.tsx`** ✅
- File: `app/[locale]/layout.tsx` (new)
- Set `html lang` from locale param
- Wrap children with `NextIntlClientProvider` (pass `messages` from server via `getMessages()`)
- Validate locale via `LOCALES`, call `notFound()` if invalid

**3.2 Update `app/[locale]/page.tsx`** ✅
- File: `app/[locale]/page.tsx` (modify)
- Use `getTranslations('home')` from `next-intl/server`
- Replace placeholder `<p>{locale}</p>` with translated content

**3.3 Update `app/page.tsx`** ✅
- File: `app/page.tsx` (modify)
- Replace current content with `redirect('/ru')` from `next/navigation`
- Remove metadata export (moved to locale layout)

**3.4 Update `app/layout.tsx`** ✅
- File: `app/layout.tsx` (modify)
- Remove static `lang="en"` from `<html>` tag (locale layout handles it)
- Remove `metadata` export with `generatePageMetadata` (moved to locale layout)
- Keep: font loading, `Viewport` export, `globals.css`, `WebVitalsReporter`

> **Commit checkpoint after 3.4:**
> `feat(i18n): integrate app router with locale layout and translations`

---

### Phase 4: Tests

**4.1 Set up Vitest** ✅
- Install: `vitest`, `@vitejs/plugin-react` as devDependencies
- Create `vitest.config.ts` with react plugin
- Add `"test": "vitest"` script to `package.json`

**4.2 Write tests for `lib/i18n.ts`** ✅
- File: `lib/__tests__/i18n.test.ts` (new)
- Tests:
  1. `pickTranslation` — returns matching locale
  2. `pickTranslation` — falls back to `ru` when locale not found
  3. `pickTranslation` — returns `undefined` for empty array
  4. `pickTranslation` — custom fallbackLocale works

> **Commit checkpoint after 4.2:**
> `test(i18n): add vitest setup and i18n utility tests`

---

## File Locations

| File | Action |
|------|--------|
| `i18n/routing.ts` | Create |
| `i18n/request.ts` | Create |
| `middleware.ts` | Create |
| `messages/ru.json` | Create |
| `messages/en.json` | Create |
| `app/[locale]/layout.tsx` | Create |
| `app/[locale]/page.tsx` | Modify |
| `app/page.tsx` | Modify |
| `app/layout.tsx` | Modify |
| `lib/__tests__/i18n.test.ts` | Create |

---

## Next Steps

Run `/aif-implement` to execute this plan.
