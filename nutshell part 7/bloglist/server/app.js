import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Blog from './models/blog.js'
import User from './models/user.js'

const app = express()

app.use(cors())
app.use(express.json())

const asyncHandler = (fn) => (request, response, next) => {
  Promise.resolve(fn(request, response, next)).catch(next)
}

const userFromToken = async (request) => {
  const authorization = request.get('authorization')
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null
  }

  const token = authorization.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.SECRET)
  return User.findById(decoded.id)
}

app.post('/api/testing/reset', asyncHandler(async (_request, response) => {
  if (process.env.NODE_ENV !== 'test') {
    return response.status(404).end()
  }

  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
}))

app.post('/api/users', asyncHandler(async (request, response) => {
  const { username, name, password } = request.body
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, name, passwordHash })
  const saved = await user.save()
  response.status(201).json(saved)
}))

app.post('/api/login', asyncHandler(async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  const passwordCorrect = user && await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
  )

  response.json({
    token,
    username: user.username,
    name: user.name,
    id: user._id.toString(),
  })
}))

app.get('/api/blogs', asyncHandler(async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
}))

app.post('/api/blogs', asyncHandler(async (request, response) => {
  const user = await userFromToken(request)
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ?? 0,
    comments: [],
    user: user._id,
  })

  const saved = await blog.save()
  user.blogs = user.blogs.concat(saved._id)
  await user.save()

  const populated = await Blog.findById(saved._id).populate('user', { username: 1, name: 1 })
  response.status(201).json(populated)
}))

app.put('/api/blogs/:id', asyncHandler(async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = request.body.likes
  await blog.save()

  const populated = await blog.populate('user', { username: 1, name: 1 })
  response.json(populated)
}))

app.delete('/api/blogs/:id', asyncHandler(async (request, response) => {
  const user = await userFromToken(request)
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (!user || blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  await blog.deleteOne()
  response.status(204).end()
}))

app.post('/api/blogs/:id/comments', asyncHandler(async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  blog.comments = blog.comments.concat(request.body.comment)
  await blog.save()

  const populated = await Blog.findById(blog._id).populate('user', { username: 1, name: 1 })
  response.status(201).json(populated)
}))

app.get('/api/users', asyncHandler(async (_request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
}))

app.get('/api/users/:id', asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', { title: 1, author: 1, url: 1 })
  if (!user) {
    return response.status(404).end()
  }
  response.json(user)
}))

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../client/dist')
app.use(express.static(dist))
app.get('/{*splat}', (request, response, next) => {
  if (request.path.startsWith('/api')) {
    return next()
  }
  response.sendFile(path.join(dist, 'index.html'), (error) => {
    if (error) next()
  })
})

export default app
