import { beforeEach, expect, it, vi } from 'vitest'
import { useAnecdoteStore } from './store'

const seed = [
  { content: 'alpha', id: '1', votes: 1 },
  { content: 'beta', id: '2', votes: 0 },
]

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: seed.map((anecdote) => ({ ...anecdote })),
    filter: '',
  })

  vi.stubGlobal('fetch', vi.fn(async (url, options = {}) => {
    if (options.method === 'POST') {
      const body = JSON.parse(options.body)
      return { ok: true, json: async () => ({ ...body, id: '99' }) }
    }

    if (options.method === 'PUT') {
      return { ok: true, json: async () => JSON.parse(options.body) }
    }

    return { ok: true, json: async () => ({}) }
  }))
})

it('initializes the state with the anecdotes returned by the backend', async () => {
  const backendAnecdotes = [
    { content: 'from the server', id: '7', votes: 3 },
  ]

  vi.stubGlobal('fetch', vi.fn(async () => ({
    ok: true,
    json: async () => backendAnecdotes,
  })))

  await useAnecdoteStore.getState().actions.initialize()

  expect(useAnecdoteStore.getState().anecdotes).toEqual(backendAnecdotes)
})

it('voting increases the number of votes for an anecdote', async () => {
  const anecdote = useAnecdoteStore.getState().anecdotes.find((item) => item.id === '1')
  await useAnecdoteStore.getState().actions.vote(anecdote)

  const updated = useAnecdoteStore.getState().anecdotes.find((item) => item.id === '1')
  expect(updated.votes).toBe(2)
})

it('creating an anecdote adds it to the store', async () => {
  await useAnecdoteStore.getState().actions.create('a new anecdote')

  const contents = useAnecdoteStore.getState().anecdotes.map((anecdote) => anecdote.content)
  expect(contents).toContain('a new anecdote')
})
