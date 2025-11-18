const initialState = [
  { id: '1', content: 'If it hurts, do it more often', votes: 0 },
  { id: '2', content: 'Adding manpower to a late software project makes it later', votes: 0 },
  { id: '3', content: 'The first 90 percent of the code accounts for the first 90 percent of the development time', votes: 0 },
  { id: '4', content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 }
]

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type){
    case 'VOTE':
      return state.map(a =>
        a.id === action.payload.id ? { ...a, votes: a.votes + 1 } : a
      )
    case 'ADD':
      return [...state, action.payload]
    default:
      return state
  }
}

export const voteAnecdote = (id) => ({
  type: 'VOTE',
  payload: { id }
})

export const addAnecdote = (content) => ({
  type: 'ADD',
  payload: { id: (Math.random()*100000).toFixed(0), content, votes: 0 }
})

export default anecdoteReducer
