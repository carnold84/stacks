import { createStore } from 'vuex';
import authors from '@/store/modules/authors';
import books from '@/store/modules/books';
import modals from '@/store/modules/modals';
import panels from '@/store/modules/panels';
import series from '@/store/modules/series';

export default createStore({
  strict: true,
  actions: {
    async loadData({ dispatch }) {
      await Promise.all([dispatch('books/load')]);
    },
  },
  modules: {
    authors,
    books,
    modals,
    panels,
    series,
  },
});
