const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { User, Session } = require('../models')
const { SECRET } = require('../util/config')

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.body.username }
  })

  if (!user || user.disabled) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const session = await Session.create({ userId: user.id })
  const token = jwt.sign(
    { id: user.id, username: user.username, sessionId: session.id },
    SECRET
  )

  res.json({ token, username: user.username, name: user.name })
})

module.exports = router
