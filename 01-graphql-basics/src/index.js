import { GraphQLServer } from 'graphql-yoga'

// Scalar types inside GraphQL include String, Boolean, Int, Float, ID

// type definitions (schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '1234',
        name: 'Matt',
        email: 'matt@example.com',
      }
    },
    post() {
      return {
        id: '1234',
        title: 'Why I Love Bananas',
        body: '',
        published: false,
      }
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
