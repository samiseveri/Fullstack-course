// controllers/notes.js
const notesRouter = require('express').Router()
const Note = require('../models/note')

// GET /api/notes - haetaan kaikki muistiinpanot
notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({})
    res.json(notes)
  } catch (error) {
    next(error)
  }
})

// POST /api/notes - luodaan uusi muistiinpano
notesRouter.post('/', async (req, res, next) => {
  const { content, important = false } = req.body

  if (!content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content,
    important,
    date: new Date(),
  })

  try {
    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/notes/:id - poistetaan muistiinpano
notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// PUT /api/notes/:id - muokataan muistiinpanoa
notesRouter.put('/:id', async (req, res, next) => {
  const { content, important } = req.body

  const updatedNote = {
    content,
    important,
  }

  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      updatedNote,
      { new: true, runValidators: true, context: 'query' }
    )
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
