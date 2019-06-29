import { GraphQLServer } from 'graphql-yoga'

// Scalar types inside GraphQL include String, Boolean, Int, Float, ID

// type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(a: Float!, b: Float!): Float!
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
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}`
      } else {
        return 'Hello!'
      }
    },
    add(parent, args, ctx, info) {
      if (args.a && args.b) {
        return args.a + args.b
      }
    },
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
