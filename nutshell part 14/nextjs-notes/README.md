# Notes app (Full Stack Open Part 14)

Next.js App Router notes application with **Prisma** and **SQLite** (no cloud database required).

## Setup

```bash
npm ci
cp .env.example .env   # if .env is missing
npm run db:push
```

## Development

```bash
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Features implemented

- Server Components for listing notes
- Client form with Server Actions (`createNote`, `toggleImportant`, `deleteNote`)
- Dynamic route `/notes/[id]`
- SQLite via Prisma (`prisma/dev.db`)
