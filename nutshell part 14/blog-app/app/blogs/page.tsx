import Link from "next/link"
import { ilike } from "drizzle-orm"
import { Suspense } from "react"
import { BlogFilter } from "@/components/BlogFilter"
import { NotificationBanner } from "@/components/NotificationBanner"
import { db } from "@/db"
import { blogs } from "@/db/schema"

type BlogsPageProps = {
  searchParams: Promise<{ q?: string; notification?: string }>
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const params = await searchParams
  const query = params.q?.trim()

  const allBlogs = query
    ? await db.select().from(blogs).where(ilike(blogs.title, `%${query}%`))
    : await db.select().from(blogs)

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-bold">Blogs</h1>
      <NotificationBanner show={params.notification === "blog-created"} />
      <Suspense fallback={null}>
        <BlogFilter />
      </Suspense>
      <div data-testid="blogs-list" className="space-y-3">
        {allBlogs.map((blog) => (
          <div key={blog.id} className="rounded border bg-white p-4">
            <Link href={`/blogs/${blog.id}`} className="text-lg font-semibold text-blue-700 hover:underline">
              {blog.title}
            </Link>
            <p className="text-sm text-gray-600">{blog.author}</p>
            <p className="text-sm text-gray-600">{blog.likes} likes</p>
          </div>
        ))}
      </div>
    </div>
  )
}
