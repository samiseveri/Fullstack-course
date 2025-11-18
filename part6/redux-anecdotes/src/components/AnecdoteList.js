import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteById } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const handleVote = (anecdote) => {
    dispatch(voteAnecdoteById(anecdote))
  }

  const filtered = filter
    ? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    : anecdotes

  return (
    <div>
      {filtered.map(a =>
        <div key={a.id}>
          {a.content} — votes {a.votes}
          <button onClick={() => handleVote(a)}>vote</button>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
