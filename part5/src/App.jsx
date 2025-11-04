import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  // 🔹 Load user and notes if token exists
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
      noteService.getAll().then(initialNotes => setNotes(initialNotes))
    }
  }, [])

  // 🔹 Handle login
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      event.target.username.value = ''
      event.target.password.value = ''
      noteService.getAll().then(initialNotes => setNotes(initialNotes))
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  // 🔹 Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setNotes([])
  }

  // 🔹 Create note
  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const returnedNote = await noteService.create(noteObject)
    setNotes(notes.concat(returnedNote))
  }

  // 🔹 Toggle note importance
  const toggleImportanceOf = async (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    try {
      const returnedNote = await noteService.update(id, changedNote)
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    } catch (error) {
      setErrorMessage(`Note '${note.content}' was already removed from server`)
      setTimeout(() => setErrorMessage(null), 5000)
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  // 🔹 Login form
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input name="username" />
      </div>
      <div>
        password <input name="password" type="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // 🔹 Notes list
  const noteList = () => (
    <>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
      <ul>
        {notes.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </>
  )

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {noteList()}
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
