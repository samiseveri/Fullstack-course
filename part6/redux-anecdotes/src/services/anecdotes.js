import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createAnecdote = async (content) => {
  const res = await axios.post(baseUrl, { content, votes: 0 })
  return res.data
}

export const voteAnecdote = async (anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 }
  const res = await axios.put(\`\${baseUrl}/\${anecdote.id}\`, updated)
  return res.data
}
