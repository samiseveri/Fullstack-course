"use client"

import { useState, useTransition } from "react"
import { generateApiTokenAction } from "@/lib/actions/token"

type Props = {
  initialToken?: string | null
}

export function GenerateTokenButton({ initialToken = null }: Props) {
  const [token, setToken] = useState<string | null>(initialToken)
  const [pending, startTransition] = useTransition()

  return (
    <div className="space-y-3">
      {token ? (
        <div data-testid="token-display">
          <code
            data-testid="api-token"
            className="block break-all rounded bg-gray-100 p-2"
          >
            {token}
          </code>
        </div>
      ) : (
        <p data-testid="no-token-message">No API token generated yet</p>
      )}
      <button
        type="button"
        data-testid="generate-token-button"
        disabled={pending}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        onClick={() => {
          startTransition(async () => {
            const next = await generateApiTokenAction()
            setToken(next)
          })
        }}
      >
        {pending ? "Generating…" : "Generate token"}
      </button>
    </div>
  )
}
