"use client"

import { useActionState } from "react"
import { registerAction, type RegisterState } from "@/lib/actions/auth"

const initialState: RegisterState = {}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState)

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
        {state.errors?.username ? (
          <p data-testid="username-error" className="mt-1 text-sm text-red-600">
            {state.errors.username}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="name" className="block font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
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
      <div>
        <label htmlFor="passwordConfirm" className="block font-medium">
          Confirm Password
        </label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          className="mt-1 w-full rounded border px-3 py-2"
          required
        />
        {state.errors?.passwordConfirm ? (
          <p
            data-testid="passwordConfirm-error"
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.passwordConfirm}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        data-testid="register-button"
        className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  )
}
