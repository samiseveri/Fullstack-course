const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


//post osuus
test('POST /api/notes adds a new note', async () => {
  const newNote = { content: 'New note', important: true }
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await Note.find({})
  expect(notesAtEnd).toHaveLength(2) // Initial + uusi
  expect(notesAtEnd.map(n => n.content)).toContain('New note')
})

//put osuus
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



app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

