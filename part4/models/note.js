// models/note.js
const mongoose = require('mongoose')

// Määritellään schema
const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  important: { type: Boolean, default: false }
})

// Viedään malli
module.exports = mongoose.model('Note', noteSchema)
