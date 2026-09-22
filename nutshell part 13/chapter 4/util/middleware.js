const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Blog, Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }

  try {
    const decoded = jwt.verify(authorization.substring(7), SECRET)
    const session = await Session.findByPk(decoded.sessionId)
    if (!session) {
      return res.status(401).json({ error: 'session expired' })
    }

    const user = await User.findByPk(decoded.id)
    if (!user || user.disabled) {
      return res.status(401).json({ error: 'user disabled' })
    }

    req.decodedToken = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'token invalid' })
  }
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    return res.status(404).end()
  }
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    const messages = error.errors?.map(e => e.message) || [error.message]
    return res.status(400).json({ error: messages })
  }

  next(error)
}

module.exports = { tokenExtractor, blogFinder, errorHandler }
