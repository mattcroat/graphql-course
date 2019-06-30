import { GraphQLServer } from 'graphql-yoga'

// Scalar types inside GraphQL include String, Boolean, Int, Float, ID

// demo user data
const users = [
  {
    id: '1',
    name: 'Matt',
    email: 'matt@example.com',
    age: 27,
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
  },
]

const posts = [
  {
    id: 1,
    title: '10 Reasons Why I Love Bananas',
    body: 'It might shock you to learn but...',
    published: true,
    author: '1',
  },
  {
    id: 2,
    title: '7 Reasons Why Plantains Are a Super Food',
    body: 'The relative of the humble banana is...',
    published: false,
    author: '1',
  },
  {
    id: 3,
    title: 'Frozen Banana Smoothie',
    body: 'A great treat for any hot summer...',
    published: false,
    author: '2',
  },
]

// type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    author: User!
  }
`

// resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter(
        post =>
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
      )
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
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
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
