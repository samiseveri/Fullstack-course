import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => setNewNote(event.target.value)

  const addNote = (event) => {
    event.preventDefault()
    createNote({ content: newNote, important: false })
    setNewNote('')
  }

  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleChange}
        placeholder="write new note"
      />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm
