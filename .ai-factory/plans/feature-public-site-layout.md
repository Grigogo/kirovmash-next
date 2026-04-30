# Public Site Layout — Implementation Plan

**Branch:** feature/public-site-layout
**Created:** 2026-04-30
**Mode:** Full

---

## Settings

- **Testing:** yes
- **Logging:** verbose
- **Docs:** no

---

## Roadmap Linkage

- **Milestone:** "Public Site Layout"
- **Rationale:** Directly implements the shared header, footer, and navigation that all public pages will use.

---

## Environment

- **Framework:** Next.js 16 (App Router)
- **i18n:** next-intl v4, locales: ru (default), en
- **UI:** Tailwind CSS v4 + shadcn/ui (new-york style, to be initialized)
- **Components dir:** components/public/ for public site components

---

## Tasks

### Phase 1: shadcn/ui Setup

**1.1 Install shadcn/ui and configure orange primary theme** ✅ — `#20`
- Run `npx shadcn@latest init`: style=new-york, base-color=neutral, CSS variables=yes
- Set `--primary: oklch(0.65 0.18 45)` (industrial orange) in globals.css
- File: `app/globals.css` (modify)

**1.2 Add shadcn components: Button, NavigationMenu, Sheet** ✅ — `#21`
- `npx shadcn@latest add button navigation-menu sheet`
- Files created: `components/ui/button.tsx`, `components/ui/navigation-menu.tsx`, `components/ui/sheet.tsx`
- Blocked by: #20

> **Commit checkpoint after 1.2:**
> `feat(ui): init shadcn/ui with new-york style and install base components`

---

### Phase 2: i18n Keys

**2.1 Add layout i18n keys to messages files** ✅ — `#22`
- Add to BOTH `messages/ru.json` and `messages/en.json`:
  - `nav.mobileMenuOpen`, `nav.mobileMenuClose`
  - `footer.copyright`, `footer.tagline`, `footer.phone`, `footer.email`
  - `common.language`

> **Commit checkpoint after 2.1:**
> `feat(i18n): add footer and mobile menu translation keys`

---

### Phase 3: Components

**3.1 Create LocaleSwitcher component** ✅ — `#23`
- File: `components/public/locale-switcher.tsx` (create, `'use client'`)
- Uses `useLocale`, `usePathname`, `Link` from `@/i18n/routing`
- Blocked by: #21, #22

**3.2 Create SiteNav component** ✅ — `#24`
- File: `components/public/site-nav.tsx` (create, `'use client'`)
- 5 nav items with active state highlighting via `usePathname`
- Uses `Link` from `@/i18n/routing`, `useTranslations('nav')`
- Blocked by: #21, #22

**3.3 Create Header component** ✅ — `#25`
- File: `components/public/header.tsx` (create)
- Sticky header: logo + SiteNav + LocaleSwitcher + CTA Button + mobile Sheet
- Blocked by: #23, #24

**3.4 Create Footer component** ✅ — `#26`
- File: `components/public/footer.tsx` (create, Server Component)
- 3-column grid + copyright bar
- Uses `getTranslations` from `next-intl/server`
- Blocked by: #22

> **Commit checkpoint after 3.4:**
> `feat(layout): add public header, navigation, footer, locale switcher`

---

### Phase 4: Layout Integration

**4.1 Create (public) route group layout** ✅ — `#27`
- File: `app/[locale]/(public)/layout.tsx` (create)
- Header + `<main className="flex-1">` + Footer
- Blocked by: #25, #26

**4.2 Move home page into (public) route group** ✅ — `#28`
- Create: `app/[locale]/(public)/page.tsx` (copy from `app/[locale]/page.tsx`)
- Delete: `app/[locale]/page.tsx`
- Blocked by: #27

> **Commit checkpoint after 4.2:**
> `feat(layout): create (public) route group with layout wrapper`

---

### Phase 5: Tests

**5.1 Write tests for navigation utility** ✅ — `#29`
- Create: `lib/navigation.ts` — `getNavItems()` pure function
- Create: `lib/__tests__/navigation.test.ts` — 4 tests
- Run `npm test` — all tests must pass
- Blocked by: #28

> **Commit checkpoint after 5.1:**
> `test(layout): add navigation utility and tests`

---

## File Locations

| File | Action |
|------|--------|
| `app/globals.css` | Modify (add --primary orange) |
| `components/ui/button.tsx` | Create (shadcn) |
| `components/ui/navigation-menu.tsx` | Create (shadcn) |
| `components/ui/sheet.tsx` | Create (shadcn) |
| `messages/ru.json` | Modify (add footer/nav keys) |
| `messages/en.json` | Modify (add footer/nav keys) |
| `components/public/locale-switcher.tsx` | Create |
| `components/public/site-nav.tsx` | Create |
| `components/public/header.tsx` | Create |
| `components/public/footer.tsx` | Create |
| `app/[locale]/(public)/layout.tsx` | Create |
| `app/[locale]/(public)/page.tsx` | Create (moved from [locale]/page.tsx) |
| `app/[locale]/page.tsx` | Delete |
| `lib/navigation.ts` | Create |
| `lib/__tests__/navigation.test.ts` | Create |

---

## Commit Plan

| After task | Commit message |
|-----------|----------------|
| #21 | `feat(ui): init shadcn/ui with new-york style and install base components` |
| #22 | `feat(i18n): add footer and mobile menu translation keys` |
| #26 | `feat(layout): add public header, navigation, footer, locale switcher` |
| #28 | `feat(layout): create (public) route group with layout wrapper` |
| #29 | `test(layout): add navigation utility and tests` |
