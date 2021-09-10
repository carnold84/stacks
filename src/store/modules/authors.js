export default {
  namespaced: true,
  state: {
    authors: {
      allIds: [],
      byId: {},
    },
    authorBook: [],
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
