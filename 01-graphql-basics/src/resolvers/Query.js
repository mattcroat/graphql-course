const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users
    }

    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts
    }

    return db.posts.filter(
      post =>
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
    )
  },
  comments(parent, args, { db }, info) {
    return db.comments
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
}

export { Query as default }
