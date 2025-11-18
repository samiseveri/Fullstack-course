#!/bin/bash

# ===============================
# FULLSTACK OPEN PART 6 SETUP
# Creates part6 folder with all projects ready
# ===============================

echo "⚠️ WARNING: This will delete your existing part6 folder"
read -p "Are you sure you want to continue? (y/N) " confirm
if [[ $confirm != "y" ]]; then
  echo "Aborted."
  exit 1
fi

# Delete old folder
rm -rf part6
mkdir part6
cd part6

# -------------------------------
# 1️⃣ Unicafe Redux (6.1–6.2)
# -------------------------------
npx create-react-app unicafe-redux
cd unicafe-redux
npm install redux react-redux

# Create reducer.js
cat << 'EOF' > src/reducer.js
const initialState = { good:0, ok:0, bad:0 }

const counterReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'GOOD': return { ...state, good: state.good + 1 }
    case 'OK': return { ...state, ok: state.ok + 1 }
    case 'BAD': return { ...state, bad: state.bad + 1 }
    case 'ZERO': return initialState
    default: return state
  }
}

export default counterReducer
EOF

# Create store.js
cat << 'EOF' > src/store.js
import { legacy_createStore as createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer)
export default store
EOF

# Update index.js with Provider
cat << 'EOF' > src/index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
EOF

# Update App.js
cat << 'EOF' > src/App.js
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const good = useSelector(state => state.good)
  const ok   = useSelector(state => state.ok)
  const bad  = useSelector(state => state.bad)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset</button>

      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>ok: {ok}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

export default App
EOF

cd ..

# -------------------------------
# 2️⃣ Redux Anecdotes (6.3–6.24)
# -------------------------------
npx create-react-app redux-anecdotes
cd redux-anecdotes
npm install redux react-redux @reduxjs/toolkit axios

# Create folder structure
mkdir -p src/components src/reducers src/services

# Anecdote reducer
cat << 'EOF' > src/reducers/anecdoteReducer.js
const initialState = []

const anecdoteReducer = (state=initialState, action) => {
  switch(action.type) {
    default: return state
  }
}

export default anecdoteReducer
EOF

# Filter reducer
cat << 'EOF' > src/reducers/filterReducer.js
const filterReducer = (state='', action) => {
  switch(action.type){
    case 'SET_FILTER': return action.payload
    default: return state
  }
}

export const setFilter = value => ({ type: 'SET_FILTER', payload: value })
export default filterReducer
EOF

# Notification reducer
cat << 'EOF' > src/reducers/notificationReducer.js
const initialState = ''

const notificationReducer = (state=initialState, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION': return action.payload
    default: return state
  }
}

export const setNotification = message => ({ type:'SET_NOTIFICATION', payload:message })
export default notificationReducer
EOF

# Store
cat << 'EOF' > src/store.js
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store
EOF

# Services
cat << 'EOF' > src/services/anecdotes.js
import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createAnecdote = async content => {
  const res = await axios.post(baseUrl, { content, votes:0 })
  return res.data
}

export const voteAnecdote = async anecdote => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 }
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, updated)
  return res.data
}
EOF

# Components (empty starter)
touch src/components/AnecdoteList.js
touch src/components/AnecdoteForm.js
touch src/components/Notification.js
touch src/components/Filter.js

# App.js
cat << 'EOF' > src/App.js
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
EOF

# index.js with Provider
cat << 'EOF' > src/index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
EOF

echo "🎉 Part 6 fully set up! You can now run 'npm start' in each project folder."
