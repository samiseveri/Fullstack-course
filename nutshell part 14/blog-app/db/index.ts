import dotenv from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

if (process.env.CI) {
  dotenv.config({ path: ".env.test" })
} else {
  const envFile =
    process.env.NODE_ENV === "test" ? ".env.test" : ".env.local"
  dotenv.config({ path: envFile })
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const client = postgres(process.env.DATABASE_URL, { prepare: false })

export const db = drizzle(client, { schema })
