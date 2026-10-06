import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function createUserRecord(
  username: string,
  name: string,
  password: string,
) {
  const passwordHash = await bcrypt.hash(password, 10)
  const [user] = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning()
  return user
}
