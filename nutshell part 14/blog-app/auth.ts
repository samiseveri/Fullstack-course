import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { eq } from "drizzle-orm"
import { authConfig } from "@/auth.config"
import { db } from "@/db"
import { users } from "@/db/schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const username = credentials?.username
        const password = credentials?.password
        if (typeof username !== "string" || typeof password !== "string") {
          return null
        }

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1)

        if (!user) {
          return null
        }

        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) {
          return null
        }

        return {
          id: String(user.id),
          name: user.name,
          username: user.username,
        }
      },
    }),
  ],
})
