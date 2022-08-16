const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql
} = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'lippalakki'

const MONGODB_URI =
  'mongodb+srv://fullstack:czjesg8p@cluster0.ivem5.mongodb.net/?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    getAuthor(name: String): Author!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editBirthyear(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

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

    allAuthors: async () => await Author.find({}),
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
  Author: {
    bookCount: async (root, args) => {
      const books = await Book.find({})
      return books.filter((b) => String(b.author) === root.id).length
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
          if (author.name.length < 4) {
            throw new UserInputError(
              'author name has to be atleast 2 characters long'
            )
          }
          author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      const book = new Book({ ...args, author: author })
      if (book.title.length < 2) {
        throw new UserInputError(
          'book name has to be atleast 2 characters long'
        )
      }

      try {
        book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    //console.log(auth)
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
