"use server"

import crypto from "crypto"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function generateApiTokenAction() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const token = crypto.randomBytes(32).toString("hex")

  await db
    .update(users)
    .set({ apiToken: token })
    .where(eq(users.id, Number(session.user.id)))

  revalidatePath("/me")
}
