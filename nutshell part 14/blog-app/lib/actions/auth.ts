"use server"

import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { signIn } from "@/auth"
import { createUserRecord } from "@/lib/users"

export type RegisterState = {
  errors?: {
    username?: string
    passwordConfirm?: string
    general?: string
  }
}

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const username = String(formData.get("username") ?? "")
  const name = String(formData.get("name") ?? "")
  const password = String(formData.get("password") ?? "")
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "")

  if (username.length < 4) {
    return { errors: { username: "Username must be at least 4 characters" } }
  }

  if (password !== passwordConfirm) {
    return { errors: { passwordConfirm: "Passwords do not match" } }
  }

  try {
    await createUserRecord(username, name, password)
  } catch {
    return { errors: { general: "Could not create user" } }
  }

  redirect("/login")
}

export type LoginState = {
  error?: string
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      return { error: "Invalid username or password" }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid username or password" }
    }
    throw error
  }

  redirect("/?notification=logged-in")
}

export async function logoutAction() {
  const { signOut } = await import("@/auth")
  await signOut({ redirectTo: "/" })
}
