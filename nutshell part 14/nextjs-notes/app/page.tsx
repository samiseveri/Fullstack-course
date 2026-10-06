import NoteForm from '@/components/NoteForm'
import NoteList from '@/components/NoteList'

const Home = () => {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10">
      <header>
        <h1 className="text-3xl font-semibold text-zinc-900">Notes</h1>
        <p className="mt-2 text-zinc-600">
          Full Stack Open Part 14 — Next.js App Router with server actions.
        </p>
      </header>
      <NoteForm />
      <section>
        <h2 className="mb-4 text-lg font-medium text-zinc-800">All notes</h2>
        <NoteList />
      </section>
    </main>
  )
}

export default Home
