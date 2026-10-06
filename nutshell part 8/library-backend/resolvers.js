const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      const filter = {}
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filter.author = author._id
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (_root, _args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      if (typeof root.bookCount === 'number') {
        return root.bookCount
      }
      return Book.countDocuments({ author: root._id })
    },
  },
  Mutation: {
    addBook: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      if (args.title.length < 5) {
        throw new GraphQLError('title is too short', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.title },
        })
      }

      if (args.author.length < 4) {
        throw new GraphQLError('author name is too short', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.author },
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('saving author failed', {
            extensions: { code: 'BAD_USER_INPUT', error },
          })
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('saving book failed', {
          extensions: { code: 'BAD_USER_INPUT', error },
        })
      }

      return book.populate('author')
    },
    editAuthor: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: async (_root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('creating user failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.username, error },
        })
      }

      return user
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
      }
    },
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('reset only available in test mode')
      }
      await Book.deleteMany({})
      await Author.deleteMany({})
      await User.deleteMany({})
      return true
    },
  },
}

module.exports = resolvers
