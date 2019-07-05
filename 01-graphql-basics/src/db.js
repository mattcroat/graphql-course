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

const db = {
  users,
  posts,
  comments,
}

export { db as default }
