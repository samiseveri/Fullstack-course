"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export function BlogFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (query.trim()) {
      params.set("q", query.trim())
    } else {
      params.delete("q")
    }
    router.push(`/blogs?${params.toString()}`)
  }

  return (
    <div className="mb-4 flex gap-2">
      <input
        data-testid="filter-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="flex-1 rounded border px-3 py-2"
        placeholder="Filter blogs"
      />
      <button
        type="button"
        data-testid="search-button"
        onClick={handleSearch}
        className="rounded bg-gray-800 px-4 py-2 text-white"
      >
        Search
      </button>
    </div>
  )
}
