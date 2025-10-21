const express = require('express')
const router = express.Router()

let notes = [
  { id: 1, content: 'HTML is easy', important: true },
  { id: 2, content: 'Browser can execute only JavaScript', important: false },
  { id: 3, content: 'GET and POST are important methods', important: true }
]

router.get('/', (req, res) => {
  res.json(notes)
})

router.post('/', (req, res) => {
  const note = req.body
  notes = notes.concat(note)
  res.json(note)
})

module.exports = router
