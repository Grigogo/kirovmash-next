# SEO & Performance — Implementation Plan

**Created:** 2026-04-30  
**Mode:** Fast

---

## Environment

- **Framework:** Next.js 16 (App Router)
- **i18n:** next-intl (ru, en)

---

## Tasks

### Phase 1: Dynamic Metadata

**1.1 Update Root Layout Metadata** ✅
- File: `app/layout.tsx`
- Replace static metadata with dynamic i18n-aware metadata
- Add Open Graph tags (title, description, images, locale, type)
- Add twitter card meta tags
- Add canonical URL

**1.2 Add Dynamic Metadata to Home Page** ✅
- File: `app/page.tsx`
- Export `generateMetadata` function
- Use next-intl for localized titles/descriptions

**1.3 Create Locale-Specific Metadata Helper** ✅
- File: `lib/seo.ts` (new)
- Helper function to generate metadata per page
- Reusable for all pages

---

### Phase 2: Sitemap & Robots

**2.1 Create Sitemap** ✅
- File: `app/sitemap.ts` (new)
- Use Next.js built-in sitemap API
- Include all static routes (home, about, contacts, etc.)
- Include dynamic routes from database (categories, products)
- Support multiple locales (ru, en)

**2.2 Create Robots.txt** ✅
- File: `app/robots.ts` (new)
- Generate robots.txt with correct directives
- Sitemap reference
- Allow crawling

---

### Phase 3: Static Generation

**3.1 Identify Static Routes** ✅
- List pages that can be statically generated:
  - Home page
  - About pages
  - Contact page
  - Static content pages

**3.2 Implement generateStaticParams** ✅
- File: `app/[locale]/page.tsx` or route groups
- Add `generateStaticParams` function
- Return static paths for each locale

---

### Phase 4: Image Optimization

**4.1 Audit next/image Usage** ✅
- Check all Image components
- Ensure proper `sizes` attribute
- Add `priority` for LCP images
- Use appropriate formats (avif, webp)

**4.2 Configure Image Optimization** ✅
- File: `next.config.ts`
- Add `images` config with remote patterns if needed
- Configure formats priority

---

### Phase 5: Core Web Vitals

**5.1 Optimize LCP (Largest Contentful Paint)** ✅
- Add `priority` to hero images
- Preload critical fonts
- Remove CLS (Cumulative Layout Shift)
- Add width/height to all images
- Reserve space for dynamic content

**5.2 Optimize FID/INP (First Input Delay / Interaction to Next Paint)** ✅
- Code splitting with dynamic imports
- Defer non-critical JS
- Use Server Components by default

**5.3 Add Performance Monitoring** ✅
- Add web-vitals package
- Log Core Web Vitals in development

---

## File Locations

| File | Action |
|------|--------|
| `app/layout.tsx` | Modify |
| `app/page.tsx` | Modify |
| `app/sitemap.ts` | Create |
| `app/robots.ts` | Create |
| `lib/seo.ts` | Create |
| `next.config.ts` | Modify |

---

## Next Steps

Run `/aif-implement` to execute this plan.