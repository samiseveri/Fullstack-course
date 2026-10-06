import { sql } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingListItems, users } from "@/db/schema"

export async function DELETE() {
  await db.delete(readingListItems)
  await db.delete(blogs)
  await db.delete(users)
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('users', 'id'), 1, false)`,
  )
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('blogs', 'id'), 1, false)`,
  )
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('reading_list_items', 'id'), 1, false)`,
  )

  return new Response(null, { status: 204 })
}
