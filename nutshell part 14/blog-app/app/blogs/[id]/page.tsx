import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { AddToReadingListButton } from "@/components/AddToReadingListButton"
import { db } from "@/db"
import { blogs } from "@/db/schema"

type BlogDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params
  const blogId = Number(id)
  if (Number.isNaN(blogId)) {
    notFound()
  }

  const [blog] = await db.select().from(blogs).where(eq(blogs.id, blogId)).limit(1)
  if (!blog) {
    notFound()
  }

  const session = await auth()

  return (
    <div data-testid="blog-detail" className="mx-auto max-w-3xl space-y-4">
      <h1 data-testid="blog-title" className="text-3xl font-bold">
        {blog.title}
      </h1>
      <p data-testid="blog-author" className="text-lg text-gray-700">
        {blog.author}
      </p>
      <a href={blog.url} className="text-blue-600 hover:underline">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      {session?.user ? <AddToReadingListButton blogId={blog.id} /> : null}
    </div>
  )
}
