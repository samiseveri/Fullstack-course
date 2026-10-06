import { createUserRecord } from "@/lib/users"

export async function POST(request: Request) {
  const body = (await request.json()) as {
    username?: string
    name?: string
    password?: string
  }

  const { username, name, password } = body
  if (!username || !name || !password) {
    return Response.json({ error: "Missing fields" }, { status: 400 })
  }

  try {
    const user = await createUserRecord(username, name, password)
    return Response.json({
      id: user.id,
      username: user.username,
      name: user.name,
    })
  } catch {
    return Response.json({ error: "Could not create user" }, { status: 400 })
  }
}
