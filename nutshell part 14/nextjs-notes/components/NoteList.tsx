import Link from 'next/link'

import { toggleImportant } from '@/app/actions/notes'
import { prisma } from '@/lib/prisma'

const NoteList = async () => {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' },
  })

  if (notes.length === 0) {
    return <p className="text-zinc-600">No notes yet.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {notes.map((note) => (
        <li
          key={note.id}
          className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link
                href={`/notes/${note.id}`}
                className="font-medium text-zinc-900 hover:underline"
              >
                {note.content}
              </Link>
              {note.important ? (
                <span className="ml-2 text-xs font-semibold uppercase text-amber-700">
                  important
                </span>
              ) : null}
            </div>
            <form action={toggleImportant.bind(null, note.id)}>
              <button
                type="submit"
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                {note.important ? 'Unmark' : 'Mark important'}
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NoteList
