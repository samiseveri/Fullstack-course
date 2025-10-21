// controllers/notes.js
const notesRouter = require('express').Router()
const Note = require('../models/note')

// DELETE /api/notes/:id - poistetaan muistiinpano
notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if (!deletedNote) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
