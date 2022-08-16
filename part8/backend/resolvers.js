const { UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'lippalakki'

const resolvers = {
  Query: {
    bookCount: async () => {
      const result = await Book.find({})
      return result.length
    },
    authorCount: async () => {
      const result = await Author.find({})
      return result.length
    },

    allAuthors: async () => {
      const books = await Book.find({}).populate('author')

      const authors = books.reduce((authors, book) => {
        return authors.find(({ name }) => name === book.author?.name)
          ? authors
          : [...authors, book.author]
      }, [])
      console.log(authors)
      return authors.map((author) => ({
        name: author.name,
        born: author.born,
        id: author.id,
        bookCount: books.filter((book) => book.author?.name === author.name)
          .length
      }))
    },
    getAuthor: async (root, args) => {
      return await Author.findOne({ name: args.name })
    },
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (args.author && !args.genre) {
        return Book.find({ author: { $in: author.id } }).populate('author')
      }
      if (args.genre && !args.author)
        return Book.find({ genres: { $in: args.genre } }).populate('author')

      if (args.genre && args.author) {
        const booksByAuthor = Book.find({
          author: { $in: author.id }
        }).populate('author')
        return booksByAuthor.find({ genre: { $in: args.genre } })
      }
      return await Book.find({}).populate('author')
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        try {
          author = new Author({ name: args.author })
          if (author.name.length < 5) {
            throw new UserInputError(
              'author name has to be atleast 4 characters long'
            )
          }
          author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      const book = new Book({ ...args, author: author })
      if (book.title.length < 3) {
        throw new UserInputError(
          'book name has to be atleast 2 characters long'
        )
      }

      try {
        book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editBirthyear: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.born
      await author.save()
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
