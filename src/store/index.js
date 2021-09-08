import { createStore } from 'vuex';
import authors from '@/store/modules/authors';
import books from '@/store/modules/books';
import series from '@/store/modules/series';

export default createStore({
  strict: true,
  modules: {
    authors,
    books,
    series,
  },
});
