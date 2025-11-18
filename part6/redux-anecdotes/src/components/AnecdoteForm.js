import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(content.trim() === '') return
    dispatch(createNewAnecdote(content))
    dispatch(setNotification(`You added: "${content}"`))
    setContent('')
    setTimeout(() => dispatch(setNotification('')), 5000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm
