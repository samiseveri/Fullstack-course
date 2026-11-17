import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const addBookToCache = (cache, addedBook) => {
  const includeBook = (existing) => {
    if (!existing) {
      return existing
    }
    if (existing.allBooks.some((book) => book.id === addedBook.id)) {
      return existing
    }
    return { allBooks: existing.allBooks.concat(addedBook) }
  }

  cache.updateQuery({ query: ALL_BOOKS }, includeBook)
  addedBook.genres.forEach((genre) => {
    cache.updateQuery(
      { query: ALL_BOOKS, variables: { genre } },
      includeBook,
    )
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client: apolloClient }) => {
      const addedBook = data.data?.bookAdded
      if (!addedBook) {
        return
      }
      window.alert(`${addedBook.title} added`)
      addBookToCache(apolloClient.cache, addedBook)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} />
      <LoginForm
        show={page === 'login'}
        setToken={async (value) => {
          setToken(value)
          await client.resetStore()
          setPage('authors')
        }}
      />
    </div>
  )
}

export default App
