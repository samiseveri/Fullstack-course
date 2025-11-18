import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes.map(a =>
        <div key={a.id}>
          {a.content} — votes {a.votes}
          <button onClick={() => handleVote(a.id)}>vote</button>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
