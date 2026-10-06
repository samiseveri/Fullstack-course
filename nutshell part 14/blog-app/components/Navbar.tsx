import Link from "next/link"
import { auth } from "@/auth"
import { logoutAction } from "@/lib/actions/auth"

export async function Navbar() {
  const session = await auth()

  return (
    <nav className="border-b bg-white px-4 py-3">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-4">
        <Link href="/" className="font-semibold">
          home
        </Link>
        <Link href="/blogs">blogs</Link>
        <Link href="/users">users</Link>
        {session?.user ? (
          <>
            <Link href="/me">me</Link>
            <Link href="/blogs/new">new blog</Link>
            <form action={logoutAction} className="ml-auto">
              <button
                type="submit"
                className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
              >
                logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="ml-auto">
              login
            </Link>
            <Link href="/register">register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
