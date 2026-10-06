"use client"

import { generateApiTokenAction } from "@/lib/actions/token"

export function GenerateTokenButton() {
  return (
    <form action={generateApiTokenAction}>
      <button
        type="submit"
        data-testid="generate-token-button"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Generate token
      </button>
    </form>
  )
}
