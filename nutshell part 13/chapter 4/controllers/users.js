const router = require('express').Router()
const { User, Blog } = require('../models')

const formatReadings = (user) => {
  const json = user.toJSON()
  json.readings = (json.readings || []).map(blog => {
    const through = blog.reading_list || blog.ReadingList || blog.readingList || {}
    return {
      id: blog.id,
      url: blog.url,
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      year: blog.year ?? null,
      reading_list: {
        id: through.id,
        read: through.read
      }
    }
  })
  return json
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
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
  const through = {
    attributes: ['id', 'read']
  }

  if (req.query.read === 'true' || req.query.read === 'false') {
    through.where = { read: req.query.read === 'true' }
  }

  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
      through,
      required: false
    }
  })

  if (!user) {
    return res.status(404).end()
  }

  res.json(formatReadings(user))
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
