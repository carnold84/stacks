export default {
  namespaced: true,
  state: {
    authors: {
      allIds: ['author-1', 'author-2', 'author-3', 'author-4'],
      byId: {
        'author-1': {
          id: 'author-1',
          firstName: 'V.E.',
          lastName: 'Schwab',
        },
        'author-2': {
          id: 'author-2',
          firstName: 'James S.A.',
          lastName: 'Corey',
        },
        'author-3': {
          id: 'author-3',
          firstName: 'Peter F.',
          lastName: 'Hamilton',
        },
        'author-4': {
          id: 'author-4',
          firstName: 'John',
          lastName: 'Grisham',
        },
      },
    },
    authorBook: [
      {
        id: 'author-book-1',
        bookId: 'book-1',
        authorId: 'author-2',
      },
      {
        id: 'author-book-2',
        bookId: 'book-2',
        authorId: 'author-2',
      },
      {
        id: 'author-book-3',
        bookId: 'book-3',
        authorId: 'author-3',
      },
      {
        id: 'author-book-4',
        bookId: 'book-4',
        authorId: 'author-3',
      },
      {
        id: 'author-book-5',
        bookId: 'book-5',
        authorId: 'author-1',
      },
      {
        id: 'author-book-6',
        bookId: 'book-6',
        authorId: 'author-4',
      },
    ],
  },
  getters: {
    getAll(state) {
      return state.authors.allIds.map((id) => {
        return state.authors.byId[id];
      });
    },
    getByBookId: (state) => (id) => {
      const authors = [];
      state.authorBook.forEach(({ authorId, bookId }) => {
        if (bookId === id) {
          const author = state.authors.byId[authorId];
          authors.push(author);
        }
      });

      return authors;
    },
    getById: (state) => (id) => {
      return state.authors.byId[id];
    },
  },
  mutations: {},
  actions: {},
};
