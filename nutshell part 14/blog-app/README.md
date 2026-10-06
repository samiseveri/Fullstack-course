# Blog app (Full Stack Open part 14)

Next.js App Router blog application with Drizzle ORM, PostgreSQL (Neon), and NextAuth credentials.

## Setup

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.
2. Push schema: `npm run db:push`
3. Run dev server: `npm run dev`
4. E2E tests: `npm run test:e2e` (requires Playwright browsers: `npx playwright install`)

Tests and GitHub Actions workflow are copied from [fullstack-hy2020/next-js-tests](https://github.com/fullstack-hy2020/next-js-tests).
