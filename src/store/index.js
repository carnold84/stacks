import { createStore } from 'vuex';
import authors from '@/store/modules/authors';
import books from '@/store/modules/books';
import modals from '@/store/modules/modals';
import series from '@/store/modules/series';

export default createStore({
  strict: true,
  actions: {
    async loadData({ dispatch }) {
      await Promise.all([
        dispatch('books/load'),
        dispatch('authors/load'),
        dispatch('series/load'),
      ]);
    },
  },
  modules: {
    authors,
    books,
    modals,
    series,
  },
});
