import api from '@/api';

export default {
  namespaced: true,
  state: {
    books: {
      allIds: [],
      byId: {},
    },
  },
  getters: {
    getAll(state, getters, rootState, rootGetters) {
      return state.books.allIds.map((id) => {
        const book = {
          ...state.books.byId[id],
        };
        const series = rootGetters['series/getById'](book.seriesId);
        delete book.seriesId;
        const authors = rootGetters['authors/getByBookId'](id);

        return {
          ...book,
          authors,
          series,
        };
      });
    },
  },
  actions: {
    async add({ commit }, payload) {
      const book = await api.books.create(payload);

      commit('add', book);
    },
    async delete({ commit }, payload) {
      const deletedBook = await api.books.delete(payload);

      commit('delete', deletedBook.id);
    },
    async load({ commit }) {
      const books = await api.books.getAll();

      books.forEach((element) => {
        commit('add', element);
      });
    },
  },
  mutations: {
    add(state, book) {
      state.books.allIds.push(book.id);
      state.books.byId[book.id] = book;
    },
    delete(state, id) {
      state.books.allIds.splice(state.books.allIds.indexOf(id), 1);
      delete state.books.byId[id];
    },
  },
};
