// tests/note_api.test.js
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)           // <- Korjattu: api on nyt määritelty
const Note = require('../models/note') // <- Korjattu: Note on nyt tuotu

beforeEach(async () => {
  await Note.deleteMany({})
  const initialNote = new Note({ content: 'Initial test note', important: false })
  await initialNote.save()
})

describe('GET /api/notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('POST /api/notes', () => {
  test('POST /api/notes adds a new note', async () => {
    const newNote = { content: 'New note', important: true }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await Note.find({})
    expect(notesAtEnd).toHaveLength(2)
    expect(notesAtEnd.map(n => n.content)).toContain('New note')
  })

  test('POST without content returns 400', async () => {
    const newNote = { important: true }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
  })
})

describe('PUT /api/notes/:id', () => {
  test('PUT /api/notes/:id updates content', async () => {
    const notesAtStart = await Note.find({})
    const noteToUpdate = notesAtStart[0]
    const updatedNote = { content: 'Updated content', important: true }

    const response = await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send(updatedNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.content).toBe('Updated content')
    expect(response.body.important).toBe(true)
  })

  test('PUT with invalid ID returns 404', async () => {
    const invalidId = '612345678901234567890123'
    const updatedNote = { content: 'Should fail', important: true }
    await api.put(`/api/notes/${invalidId}`).send(updatedNote).expect(404)
  })
})

describe('DELETE /api/notes/:id', () => {
  test('DELETE with invalid ID returns 404', async () => {
    const invalidId = '612345678901234567890123'
    await api.delete(`/api/notes/${invalidId}`).expect(404)
  })
})

afterAll(async () => {
  await mongoose.connection.close() // <- Muista sulkea MongoDB-yhteys
})
