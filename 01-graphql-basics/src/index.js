import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

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
    id: '1',
    title: '10 Reasons Why I Love Bananas',
    body: 'It might shock you to learn but...',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: '7 Reasons Why Plantains Are a Super Food',
    body: 'The relative of the humble banana is...',
    published: false,
    author: '1',
  },
  {
    id: '3',
    title: 'Frozen Banana Smoothie',
    body: 'A great treat for any hot summer...',
    published: false,
    author: '2',
  },
]

const comments = [
  {
    id: '1',
    text: 'First',
    author: '1',
    post: '1',
  },
  {
    id: '2',
    text: 'Great post 👍',
    author: '2',
    post: '1',
  },
  {
    id: '3',
    text: 'Have not read it yet but you are wrong.',
    author: '3',
    post: '2',
  },
  {
    id: '4',
    text: 'This is fire 🔥',
    author: '1',
    post: '3',
  },
]

// type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID!): Comment!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!,
    text: String!
    author: User!
    post: Post!
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
    comments(parent, args, ctx, info) {
      return comments
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.email)

      if (emailTaken) {
        throw new Error('Email taken 💩')
      }

      const user = {
        id: uuidv4(),
        ...args,
      }

      users.push(user)

      return user
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author)

      if (!userExists) {
        throw new Error('User not found 💩')
      }

      const post = {
        id: uuidv4(),
        ...args,
      }

      posts.push(post)

      return post
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author)
      const postExists = posts.some(post => post.id === args.post && post.published)

      if (!userExists || !postExists) {
        throw new Error('Unable to find user or post 💩')
      }

      const comment = {
        id: uuidv4(),
        ...args,
      }

      comments.push(comment)

      return comment
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id)
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post)
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id)
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
