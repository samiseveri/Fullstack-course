"use server"

import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { db } from "@/db"
import { blogs, readingListItems } from "@/db/schema"

export async function createBlogAction(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const title = String(formData.get("title") ?? "")
  const author = String(formData.get("author") ?? "")
  const url = String(formData.get("url") ?? "")

  await db.insert(blogs).values({
    title,
    author,
    url,
    userId: Number(session.user.id),
  })

  revalidatePath("/blogs")
  redirect("/blogs?notification=blog-created")
}

export async function addToReadingListAction(blogId: number) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = Number(session.user.id)

  const [existing] = await db
    .select()
    .from(readingListItems)
    .where(
      and(
        eq(readingListItems.userId, userId),
        eq(readingListItems.blogId, blogId),
      ),
    )
    .limit(1)

  if (existing) {
    return
  }

  await db.insert(readingListItems).values({
    userId,
    blogId,
    read: false,
  })

  revalidatePath("/me")
  revalidatePath(`/blogs/${blogId}`)
}

export async function markAsReadAction(readingListItemId: number) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  await db
    .update(readingListItems)
    .set({ read: true })
    .where(eq(readingListItems.id, readingListItemId))

  revalidatePath("/me")
}
