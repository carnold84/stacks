import api from '@/api';

const addBook = ({ book, commit, dispatch }) => {
  if (book.authors?.length > 0) {
    book.authors.forEach((author) => {
      dispatch('authors/create', author, { root: true });
      commit('addAuthorBook', {
        authorId: author.id,
        bookId: book.id,
      });
    });
    delete book.authors;
  }

  if (book.series) {
    dispatch('series/create', book.series, { root: true });
    book.seriesId = book.series.id;
    delete book.series;
  }

  commit('add', book);
};

export default {
  namespaced: true,
  state: {
    authorBook: [],
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
        console.log(book);
        const authors = [];
        state.authorBook.forEach(({ authorId, bookId }) => {
          if (bookId === book.id) {
            authors.push(rootGetters['authors/getById'](authorId));
          }
        });
        const series = rootGetters['series/getById'](book.seriesId);

        delete book.authorIds;
        delete book.seriesId;

        return {
          ...book,
          authors,
          series,
        };
      });
    },
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      const book = await api.books.create(payload);

      console.log(JSON.stringify(book, null, 2));

      addBook({ book, commit, dispatch });
    },
    async delete({ commit }, payload) {
      const deletedBook = await api.books.delete(payload);

      commit('delete', deletedBook.id);
    },
    async load({ commit, dispatch }) {
      const books = await api.books.getAll();

      console.log(JSON.stringify(books, null, 2));

      books.forEach((book) => {
        addBook({ book, commit, dispatch });
      });
    },
  },
  mutations: {
    add(state, book) {
      state.books.allIds.push(book.id);
      state.books.byId[book.id] = book;
    },
    addAuthorBook(state, { authorId, bookId }) {
      state.authorBook.push({
        authorId,
        bookId,
      });
    },
    delete(state, id) {
      state.books.allIds.splice(state.books.allIds.indexOf(id), 1);
      delete state.books.byId[id];
    },
  },
};
