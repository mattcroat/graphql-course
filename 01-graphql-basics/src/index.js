import { GraphQLServer } from 'graphql-yoga'

// Scalar types inside GraphQL include String, Boolean, Int, Float, ID

// type definitions (schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`

// resolvers
const resolvers = {
  Query: {
    title() {
      return 'Straight Outta Compton'
    },
    price() {
      return 24.98
    },
    releaseYear() {
      return 1988
    },
    rating() {
      return 4.5
    },
    inStock() {
      return true
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('The server is up!')
})
