import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => setAnecdotes(anecdotes))
  }, [])

  const addAnecdote = async (anecdote) => {
    const created = await anecdoteService.createNew(anecdote)
    setAnecdotes(anecdotes.concat(created))
  }

  const deleteAnecdote = async (id) => {
    await anecdoteService.remove(id)
    setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== id))
  }

  return { anecdotes, addAnecdote, deleteAnecdote }
}
