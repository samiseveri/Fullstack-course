"use client"

import { markAsReadAction } from "@/lib/actions/blogs"

type MarkReadButtonProps = {
  readingListItemId: number
}

export function MarkReadButton({ readingListItemId }: MarkReadButtonProps) {
  return (
    <button
      type="button"
      data-testid={`mark-read-${readingListItemId}`}
      onClick={() => markAsReadAction(readingListItemId)}
      className="rounded bg-gray-800 px-2 py-1 text-sm text-white"
    >
      Mark as read
    </button>
  )
}
