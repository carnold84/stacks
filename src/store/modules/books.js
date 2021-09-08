export default {
  namespaced: true,
  state: {
    books: {
      allIds: ['book-1', 'book-2', 'book-3', 'book-4', 'book-5', 'book-6'],
      byId: {
        'book-1': {
          bookNumber: 1,
          id: 'book-1',
          seriesId: 'series-1',
          title: 'Leviathan Wakes',
        },
        'book-2': {
          bookNumber: 2,
          id: 'book-2',
          seriesId: 'series-1',
          title: "Caliban's War",
        },
        'book-3': {
          bookNumber: 1,
          id: 'book-3',
          seriesId: 'series-2',
          title: "Pandora's Star",
        },
        'book-4': {
          bookNumber: 2,
          id: 'book-4',
          seriesId: 'series-2',
          title: 'Judas Unchained',
        },
        'book-5': {
          bookNumber: 1,
          id: 'book-5',
          seriesId: 'series-3',
          title: 'Vicious',
        },
        'book-6': {
          id: 'book-6',
          title: 'The Pelican Brief',
        },
      },
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
  mutations: {
    delete(state, id) {
      state.books.allIds.splice(state.books.allIds.indexOf(id), 1);
    },
  },
  actions: {
    delete({ commit }, payload) {
      commit('delete', payload);
    },
  },
};
