import Link from "next/link"
import { db } from "@/db"
import { users } from "@/db/schema"

export default async function UsersPage() {
  const allUsers = await db.select().from(users)

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <ul className="space-y-2">
        {allUsers.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`} className="text-blue-600 hover:underline">
              {user.name} ({user.username})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
