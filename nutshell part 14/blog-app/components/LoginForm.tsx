"use client"

import { useActionState } from "react"
import { loginAction, type LoginState } from "@/lib/actions/auth"

const initialState: LoginState = {}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState)

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4">
      <div>
        <label htmlFor="username" className="block font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="mt-1 w-full rounded border px-3 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-1 w-full rounded border px-3 py-2"
          required
        />
      </div>
      {state.error ? (
        <p data-testid="error-message" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        data-testid="login-button"
        className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  )
}
