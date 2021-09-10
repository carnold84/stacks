import api from '@/api';

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
  actions: {
    async load({ commit }) {
      const authors = await api.authors.getAll();

      authors.forEach((element) => {
        commit('add', element);
      });
    },
  },
  mutations: {
    add(state, author) {
      state.authors.allIds.push(author.id);
      state.authors.byId[author.id] = author;
    },
  },
};
