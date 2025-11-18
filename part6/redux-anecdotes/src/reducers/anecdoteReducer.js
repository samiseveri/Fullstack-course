import { createSlice } from '@reduxjs/toolkit'
import { getAll, createAnecdote, voteAnecdote } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id === updated.id ? updated : a)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

// Thunks
export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createNewAnecdote = content => async dispatch => {
  const newAnecdote = await createAnecdote(content)
  dispatch(appendAnecdote(newAnecdote))
}

export const voteAnecdoteById = anecdote => async dispatch => {
  const updated = await voteAnecdote(anecdote)
  dispatch(updateAnecdote(updated))
}

export default anecdoteSlice.reducer
