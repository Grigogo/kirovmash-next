# Admin Authentication — Implementation Plan

**Branch:** feature/admin-auth
**Created:** 2026-05-06
**Mode:** Full

---

## Settings

- **Testing:** yes
- **Logging:** verbose
- **Docs:** no

---

## Roadmap Linkage

- **Milestone:** "Admin Authentication"
- **Rationale:** Installs Auth.js v5, configures Credentials provider with bcrypt + Prisma lookup, creates login page and middleware that protects all /[locale]/admin/* routes.

---

## Environment

- **Framework:** Next.js 16 (App Router)
- **Auth:** Auth.js v5 (next-auth), JWT sessions, Credentials provider
- **Password hashing:** bcryptjs
- **i18n:** next-intl v4 (must chain with auth middleware)
- **ORM:** Prisma 6 + PostgreSQL
- **Route:** `app/[locale]/admin/login/`

---

## Tasks

### Phase 1: Packages & Core Config

**1.1 Install auth packages** ✅ — `#22`
- `npm install next-auth bcryptjs @types/bcryptjs`
- No PrismaAdapter — custom User model uses JWT sessions

**1.2 Create lib/auth.ts** ✅ — `#23`
- File: `lib/auth.ts` (create)
- `NextAuth({ providers: [Credentials({authorize})], session: { strategy: 'jwt' }, callbacks: {jwt, session} })`
- `authorize`: parse with loginSchema → db.user.findUnique → bcrypt.compare → return `{id, email, role}`
- Verbose logging: authorize entry + result (no password logged)
- Blocked by: #22

**1.3 Create lib/validators/user.ts** ✅ — `#24`
- File: `lib/validators/user.ts` (create)
- `loginSchema`: email (string().email()), password (string().min(1))
- Export `LoginInput` type
- Blocked by: #22

**1.4 Create middleware.ts** ✅ — `#25`
- File: `middleware.ts` (create at project root)
- Chains `auth()` from `lib/auth.ts` with `createMiddleware(routing)` from next-intl
- Redirects unauthenticated requests on `/(ru|en)/admin/*` (except login) to `/${locale}/admin/login`
- Verbose logging: path + auth status
- Blocked by: #23

> **Commit checkpoint after 1.4:**
> `feat(auth): configure Auth.js, credentials provider, and middleware`

---

### Phase 2: UI & Pages

**2.1 Create admin layout and LoginForm component** — `#26`
- `app/[locale]/admin/layout.tsx` (create, Server Component, minimal — no header/footer)
- `components/admin/login-form.tsx` (create, `'use client'`)
  - React Hook Form + zodResolver(loginSchema)
  - Fields: email, password; calls `loginAction` on submit
  - Shows server error on failure
- Blocked by: #23, #24

**2.2 Create admin login page** — `#27`
- File: `app/[locale]/admin/login/page.tsx` (create, Server Component)
- `generateStaticParams` + `generateMetadata`
- If session already exists → redirect to `/${locale}/admin`
- Centered card layout with LoginForm
- Add `admin.login.*` i18n keys to `messages/ru.json` + `messages/en.json`
- Blocked by: #25, #26

**2.3 Create actions/auth.ts** — `#28`
- File: `actions/auth.ts` (create)
- `loginAction(data)`: calls `signIn('credentials', {..., redirect: false})` → returns `{ error? }`
- `logoutAction()`: calls `signOut({ redirectTo: '/ru/admin/login' })`
- Verbose logging: email on entry, error details on failure
- Blocked by: #23

**2.4 Add admin user to prisma/seed.ts** — `#29`
- File: `prisma/seed.ts` (modify)
- Upsert user: `admin@kirovmash.ru` / `admin123` (hashed with bcrypt, rounds: 10)
- Log seeded credentials to console
- Blocked by: #22

> **Commit checkpoint after 2.4:**
> `feat(auth): add admin login page, login form, and seed admin user`

---

### Phase 3: Tests

**3.1 Write tests for loginSchema** — `#30`
- File: `lib/__tests__/auth.test.ts` (create)
- 5 tests via `loginSchema.safeParse()`:
  1. valid email + password → success
  2. missing email → failure
  3. invalid email format → failure
  4. missing password → failure
  5. empty password → failure
- Run `npm test` — all pass
- Blocked by: #24

> **Commit checkpoint after 3.1:**
> `test(auth): add login schema tests`

---

## File Locations

| File | Action |
|------|--------|
| `lib/auth.ts` | Create |
| `lib/validators/user.ts` | Create |
| `middleware.ts` | Create |
| `app/[locale]/admin/layout.tsx` | Create |
| `app/[locale]/admin/login/page.tsx` | Create |
| `components/admin/login-form.tsx` | Create |
| `actions/auth.ts` | Create |
| `prisma/seed.ts` | Modify |
| `messages/ru.json` | Modify (add admin.login.*) |
| `messages/en.json` | Modify (add admin.login.*) |
| `lib/__tests__/auth.test.ts` | Create |

---

## Commit Plan

| After task | Commit message |
|-----------|----------------|
| #25 | `feat(auth): configure Auth.js, credentials provider, and middleware` |
| #29 | `feat(auth): add admin login page, login form, and seed admin user` |
| #30 | `test(auth): add login schema tests` |
