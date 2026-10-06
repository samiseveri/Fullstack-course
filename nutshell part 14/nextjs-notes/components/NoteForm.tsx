'use client'

import { useRef } from 'react'

import { createNote } from '@/app/actions/notes'

const NoteForm = () => {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createNote(formData)
        formRef.current?.reset()
      }}
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <label htmlFor="content" className="text-sm font-medium text-zinc-700">
        New note
      </label>
      <textarea
        id="content"
        name="content"
        rows={3}
        required
        className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
        placeholder="Write a note..."
      />
      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input type="checkbox" name="important" />
        Important
      </label>
      <button
        type="submit"
        className="self-start rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Save
      </button>
    </form>
  )
}

export default NoteForm
