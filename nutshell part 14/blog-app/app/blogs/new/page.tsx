import { createBlogAction } from "@/lib/actions/blogs"

export default function NewBlogPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-bold">Create a new blog</h1>
      <form action={createBlogAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block font-medium">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="url" className="block font-medium">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            className="mt-1 w-full rounded border px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  )
}
