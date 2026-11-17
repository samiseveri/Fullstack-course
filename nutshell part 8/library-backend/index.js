const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { useServer } = require('graphql-ws/use/ws')
const express = require('express')
const http = require('http')
const cors = require('cors')
const { WebSocketServer } = require('ws')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const PORT = Number(process.env.PORT) || 4000

mongoose.set('strictQuery', false)

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()
const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})

const serverCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
    },
  ],
})

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.startsWith('Bearer ')) {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
  return {}
}

const start = async () => {
  await server.start()

  app.get('/', (_req, res) => {
    res.status(200).send('library-backend')
  })

  app.use(cors())
  app.use(express.json())
  app.use(expressMiddleware(server, { context }))

  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`)
    console.log(`Subscriptions ready at ws://localhost:${PORT}/graphql`)
  })
}

start()
