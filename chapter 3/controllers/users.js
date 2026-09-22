const router = require('express').Router()
const { User, Blog } = require('../models')

const blogAttributes = {
  exclude: ['userId']
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: blogAttributes
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    name: req.body.name
  })
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      attributes: blogAttributes
    }
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (!user) {
    return res.status(404).end()
  }

  user.name = req.body.name
  await user.save()
  res.json(user)
})

module.exports = router
