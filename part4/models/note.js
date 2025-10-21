// models/note.js
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  important: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Note', noteSchema)
