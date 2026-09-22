import { beforeEach, expect, test, vi } from 'vitest'
import { useAnecdoteStore } from './store'

const seed = [
  { content: 'alpha', id: '1', votes: 1 },
  { content: 'beta', id: '2', votes: 0 },
]

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: seed.map((anecdote) => ({ ...anecdote })),
    filter: '',
    notification: '',
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

test('voting increases the selected anecdote vote count', async () => {
  const anecdote = useAnecdoteStore.getState().anecdotes.find((item) => item.id === '1')
  await useAnecdoteStore.getState().actions.vote(anecdote)

  const updated = useAnecdoteStore.getState().anecdotes.find((item) => item.id === '1')
  expect(updated.votes).toBe(2)
})

test('creating an anecdote adds it to the store', async () => {
  await useAnecdoteStore.getState().actions.create('a new anecdote')

  const contents = useAnecdoteStore.getState().anecdotes.map((anecdote) => anecdote.content)
  expect(contents).toContain('a new anecdote')
})
