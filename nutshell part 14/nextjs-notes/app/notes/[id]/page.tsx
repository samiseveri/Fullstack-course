import Link from 'next/link'
import { notFound } from 'next/navigation'

import { deleteNote, toggleImportant } from '@/app/actions/notes'
import { prisma } from '@/lib/prisma'

type NotePageProps = {
  params: Promise<{ id: string }>
}

const NotePage = async ({ params }: NotePageProps) => {
  const { id } = await params
  const note = await prisma.note.findUnique({ where: { id } })

  if (!note) {
    notFound()
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
        ← Back to notes
      </Link>
      <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">{note.content}</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Created {note.createdAt.toLocaleString()}
        </p>
        {note.important ? (
          <p className="mt-2 text-sm font-semibold uppercase text-amber-700">
            Important
          </p>
        ) : null}
        <div className="mt-6 flex gap-3">
          <form action={toggleImportant.bind(null, note.id)}>
            <button
              type="submit"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50"
            >
              {note.important ? 'Unmark important' : 'Mark important'}
            </button>
          </form>
          <form action={deleteNote.bind(null, note.id)}>
            <button
              type="submit"
              className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-500"
            >
              Delete
            </button>
          </form>
        </div>
      </article>
    </main>
  )
}

export default NotePage
