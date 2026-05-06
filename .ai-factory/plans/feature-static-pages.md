# Static Pages — Implementation Plan

**Branch:** feature/static-pages
**Created:** 2026-05-06
**Mode:** Full

---

## Settings

- **Testing:** yes
- **Logging:** verbose
- **Docs:** no

---

## Roadmap Linkage

- **Milestones:** "Static Pages" + "Lead Capture"
- **Rationale:** About and Contacts pages close the "Static Pages" milestone; the contact form with Server Action + Lead DB record closes "Lead Capture".

---

## Environment

- **Framework:** Next.js 16 (App Router)
- **i18n:** next-intl v4, locales: ru (default), en
- **UI:** Tailwind CSS v4 + shadcn/ui (base-nova style, neutral + orange primary)
- **ORM:** Prisma 6 + PostgreSQL
- **Forms:** React Hook Form + Zod resolver (Client Component)
- **Mutations:** Server Actions in `actions/leads.ts`
- **Validation:** Zod schema in `lib/validators/lead.ts`
- **Routes:** `app/[locale]/(public)/about/`, `app/[locale]/(public)/contacts/`

---

## Tasks

### Phase 1: i18n Keys

**1.1 Add i18n keys for about and contacts** ✅ — `#15`
- Add to BOTH `messages/ru.json` and `messages/en.json`:
  - `about.title`, `about.description`, `about.mission.title`, `about.mission.text`, `about.values.title`, `about.team.title`
  - `contacts.title`, `contacts.description`, `contacts.address`, `contacts.phone`, `contacts.email`
  - `contacts.form.name`, `contacts.form.namePlaceholder`, `contacts.form.nameRequired`
  - `contacts.form.phone`, `contacts.form.phonePlaceholder`, `contacts.form.phoneRequired`
  - `contacts.form.email`, `contacts.form.emailPlaceholder`
  - `contacts.form.message`, `contacts.form.messagePlaceholder`
  - `contacts.form.submit`, `contacts.form.submitting`, `contacts.form.success`, `contacts.form.error`

---

### Phase 2: Lead Capture Infrastructure

**2.1 Create Lead Zod validator** ✅ — `#16`
- File: `lib/validators/lead.ts` (create; also create `lib/validators/` dir)
- `createLeadSchema`: name (min 2), phone (min 7), email (email, optional), message (optional)
- Export `CreateLeadInput` type
- Blocked by: #15

**2.2 Create `createLead` Server Action** ✅ — `#17`
- File: `actions/leads.ts` (create; also create `actions/` dir)
- `'use server'`
- `createLead(data: unknown): Promise<{ success: boolean; error?: string }>`
- Validates with `createLeadSchema`, creates `db.lead`, returns result
- Verbose logging: entry, created id, error
- Blocked by: #15, #16

> **Commit checkpoint after 2.2:**
> `feat(leads): add lead validator and create-lead server action`

---

### Phase 3: Components

**3.1 Create ContactForm client component** ✅ — `#18`
- File: `components/public/contact-form.tsx` (`'use client'`)
- Props: translated label strings (name, phone, email, message, submit, submitting, success, error labels)
- React Hook Form + `zodResolver(createLeadSchema)`
- Fields: name (required), phone (required), email (optional), message (optional textarea)
- `useTransition` → call `createLead` → success/error state
- Disabled while `isPending`
- Verbose logging: submit event + result
- Blocked by: #16, #17

---

### Phase 4: Pages

**4.1 Create About page** ✅ — `#19`
- File: `app/[locale]/(public)/about/page.tsx` (create, Server Component)
- `generateStaticParams` + `generateMetadata`
- Static content from i18n keys: title, description, mission, values
- Verbose logging: `console.debug('[about/page] locale:', safeLocale)`
- Blocked by: #15

**4.2 Create Contacts page** ✅ — `#20`
- File: `app/[locale]/(public)/contacts/page.tsx` (create, Server Component)
- `generateStaticParams` + `generateMetadata`
- Two-column layout on lg: contact details left, `<ContactForm>` right
- Passes all translated labels as props to `<ContactForm>`
- Verbose logging: `console.debug('[contacts/page] locale:', safeLocale)`
- Blocked by: #15, #18

> **Commit checkpoint after 4.2:**
> `feat(static-pages): add About and Contacts pages with contact form`

---

### Phase 5: Tests

**5.1 Write tests for lead validator** — `#21`
- File: `lib/__tests__/lead.test.ts` (create)
- 5 tests via `createLeadSchema.safeParse()`:
  1. valid full input → success
  2. valid minimal input (name + phone only) → success
  3. missing name → failure
  4. missing phone → failure
  5. invalid email format → failure
- Run `npm test` — all pass
- Blocked by: #16

> **Commit checkpoint after 5.1:**
> `test(leads): add lead validator tests`

---

## File Locations

| File | Action |
|------|--------|
| `messages/ru.json` | Modify (add about + contacts keys) |
| `messages/en.json` | Modify (add about + contacts keys) |
| `lib/validators/lead.ts` | Create |
| `actions/leads.ts` | Create |
| `components/public/contact-form.tsx` | Create |
| `app/[locale]/(public)/about/page.tsx` | Create |
| `app/[locale]/(public)/contacts/page.tsx` | Create |
| `lib/__tests__/lead.test.ts` | Create |

---

## Commit Plan

| After task | Commit message |
|-----------|----------------|
| #17 | `feat(leads): add lead validator and create-lead server action` |
| #20 | `feat(static-pages): add About and Contacts pages with contact form` |
| #21 | `test(leads): add lead validator tests` |
