import { GraphQLServer } from 'graphql-yoga'

// type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`

// resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!'
    },
    name() {
      return 'Matt Croat'
    },
    location() {
      return 'Croatia'
    },
    bio() {
      return 'Web developer from Croatia'
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
