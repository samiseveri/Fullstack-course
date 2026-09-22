import { create } from 'zustand'

const baseUrl = 'http://localhost:3001/anecdotes'

let notificationTimer

const showNotification = (set, message) => {
  clearTimeout(notificationTimer)
  set({ notification: message })
  notificationTimer = setTimeout(() => set({ notification: '' }), 5000)
}

export const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  notification: '',
  actions: {
    initialize: async () => {
      const response = await fetch(baseUrl)
      const anecdotes = await response.json()
      set({ anecdotes })
    },
    setFilter: (filter) => set({ filter }),
    create: async (content) => {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 }),
      })
      const created = await response.json()
      set((state) => ({ anecdotes: state.anecdotes.concat(created) }))
    },
    vote: async (anecdote) => {
      const updated = { ...anecdote, votes: anecdote.votes + 1 }
      const response = await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      const saved = await response.json()
      set((state) => ({
        anecdotes: state.anecdotes.map((item) => (item.id === saved.id ? saved : item)),
      }))
      showNotification(set, `you voted '${saved.content}'`)
    },
    remove: async (anecdote) => {
      await fetch(`${baseUrl}/${anecdote.id}`, { method: 'DELETE' })
      set((state) => ({
        anecdotes: state.anecdotes.filter((item) => item.id !== anecdote.id),
      }))
    },
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)

export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useNotification = () => useAnecdoteStore((state) => state.notification)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
