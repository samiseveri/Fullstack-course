const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { tokenExtractor, blogFinder } = require('../util/middleware')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    const keyword = `%${req.query.search}%`
    where[Op.or] = [
      { title: { [Op.iLike]: keyword } },
      { author: { [Op.iLike]: keyword } }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'name', 'username']
    },
    where,
    order: [['likes', 'DESC']]
  })

  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const blog = await Blog.create({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    year: req.body.year,
    userId: req.decodedToken.id
  })
  res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog.userId !== req.decodedToken.id) {
    return res.status(403).json({ error: 'only the creator can delete a blog' })
  }

  await req.blog.destroy()
  res.status(204).end()
})

module.exports = router
