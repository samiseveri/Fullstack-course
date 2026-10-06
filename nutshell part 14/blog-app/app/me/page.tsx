import { eq } from "drizzle-orm"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { GenerateTokenButton } from "@/components/GenerateTokenButton"
import { MarkReadButton } from "@/components/MarkReadButton"
import { db } from "@/db"
import { blogs, readingListItems, users } from "@/db/schema"

export default async function MePage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const userId = Number(session.user.id)

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)

  const readingList = await db
    .select({
      itemId: readingListItems.id,
      read: readingListItems.read,
      title: blogs.title,
      blogId: blogs.id,
    })
    .from(readingListItems)
    .innerJoin(blogs, eq(readingListItems.blogId, blogs.id))
    .where(eq(readingListItems.userId, userId))

  const unreadItems = readingList.filter((item) => !item.read)
  const readItems = readingList.filter((item) => item.read)
  const hasReadingList = readingList.length > 0

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section data-testid="user-profile" className="rounded border bg-white p-4">
        <h1 className="mb-4 text-2xl font-bold">Profile</h1>
        <p data-testid="user-name">Name: {user?.name}</p>
        <p data-testid="user-username">Username: {user?.username}</p>
      </section>

      <section data-testid="reading-list-section" className="space-y-4">
        <h2 className="text-xl font-semibold">Reading list</h2>
        {!hasReadingList ? (
          <p data-testid="empty-reading-list">Reading list is empty</p>
        ) : null}

        <div data-testid="unread-section" className="space-y-2">
          <h3 className="font-medium">Unread</h3>
          {unreadItems.length === 0 ? (
            <p data-testid="no-unread-blogs">No unread blogs</p>
          ) : (
            unreadItems.map((item) => (
              <div key={item.itemId} className="flex items-center gap-3 rounded border bg-white p-3">
                <Link href={`/blogs/${item.blogId}`} className="text-blue-600 hover:underline">
                  {item.title}
                </Link>
                <MarkReadButton readingListItemId={item.itemId} />
              </div>
            ))
          )}
        </div>

        {readItems.length > 0 ? (
          <div data-testid="read-section" className="space-y-2">
            <h3 className="font-medium">Read</h3>
            {readItems.map((item) => (
              <div key={item.itemId} className="rounded border bg-white p-3">
                <Link href={`/blogs/${item.blogId}`} className="text-blue-600 hover:underline">
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section data-testid="api-token-section" className="rounded border bg-white p-4">
        <h2 className="mb-3 text-xl font-semibold">API token</h2>
        <GenerateTokenButton initialToken={user?.apiToken} />
      </section>
    </div>
  )
}
