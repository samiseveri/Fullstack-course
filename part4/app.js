// app.js
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const url = process.env.NODE_ENV === 'test'
  ? 'mongodb://localhost:27017/noteAppTest'
  : 'mongodb://localhost:27017/noteApp'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())

// Logger middleware
app.use((req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
})

// Routes
app.use('/api/notes', notesRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
