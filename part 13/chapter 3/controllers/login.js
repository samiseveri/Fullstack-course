const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { User } = require('../models')
const { SECRET } = require('../util/config')

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.body.username }
  })

  if (!user) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET
  )

  res.json({ token, username: user.username, name: user.name })
})

module.exports = router
