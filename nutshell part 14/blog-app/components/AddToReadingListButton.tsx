"use client"

import { addToReadingListAction } from "@/lib/actions/blogs"

type AddToReadingListButtonProps = {
  blogId: number
}

export function AddToReadingListButton({ blogId }: AddToReadingListButtonProps) {
  return (
    <button
      type="button"
      data-testid="add-to-reading-list-button"
      onClick={() => addToReadingListAction(blogId)}
      className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
    >
      Add to reading list
    </button>
  )
}
