import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Next.js / Playwright already load .env.local into process.env.
// Avoid dotenv here — it uses process.cwd and breaks Edge middleware.

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const client = postgres(process.env.DATABASE_URL, { prepare: false })

export const db = drizzle(client, { schema })
