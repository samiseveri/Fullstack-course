import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes, useVoteAnecdote } from './useAnecdotes'

const App = () => {
  const result = useAnecdotes()
  const voteMutation = useVoteAnecdote()

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  if (result.isPending) {
    return <div>loading...</div>
  }

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
