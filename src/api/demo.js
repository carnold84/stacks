import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'stacks_app';

const demoData = {
  books: [
    {
      bookNumber: 1,
      id: 'book-1',
      seriesId: 'series-1',
      title: 'Leviathan Wakes',
    },
    {
      bookNumber: 2,
      id: 'book-2',
      seriesId: 'series-1',
      title: "Caliban's War",
    },
    {
      bookNumber: 1,
      id: 'book-3',
      seriesId: 'series-2',
      title: "Pandora's Star",
    },
    {
      bookNumber: 2,
      id: 'book-4',
      seriesId: 'series-2',
      title: 'Judas Unchained',
    },
    {
      bookNumber: 1,
      id: 'book-5',
      seriesId: 'series-3',
      title: 'Vicious',
    },
    {
      id: 'book-6',
      title: 'The Pelican Brief',
    },
  ],
  authors: [
    {
      id: 'author-1',
      firstName: 'V.E.',
      lastName: 'Schwab',
    },
    {
      id: 'author-2',
      firstName: 'James S.A.',
      lastName: 'Corey',
    },
    {
      id: 'author-3',
      firstName: 'Peter F.',
      lastName: 'Hamilton',
    },
    {
      id: 'author-4',
      firstName: 'John',
      lastName: 'Grisham',
    },
  ],
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
  series: [
    {
      id: 'series-1',
      title: 'The Expanse',
    },
    {
      id: 'series-2',
      title: 'Commonwealth Saga',
    },
    {
      id: 'series-3',
      title: 'Villains',
    },
  ],
};

const getNowUTC = () => {
  return new Date().toLocaleString();
};

const getState = async () => {
  const response = await localStorage.getItem(STORAGE_KEY);

  return response ? JSON.parse(response) : demoData;
};

const setState = async (state) => {
  return await localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const request = (callback) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await callback();

        resolve(response);
      } catch (err) {
        reject(err);
      }
    }, 500);
  });
};

const api = {
  authors: {
    create: async (data) => {
      return await request(async () => {
        const date = getNowUTC();

        const nextAuthor = {
          ...data,
          created: date,
          id: uuidv4(),
          updated: date,
        };

        const state = await getState();

        state.authors.push(nextAuthor);

        await setState(state);

        return nextAuthor;
      });
    },
    delete: async (id) => {
      return await request(async () => {
        const state = await getState();
        let deletedAuthor;

        state.authors = state.authors.filter((author) => {
          if (author.id !== id) {
            return true;
          } else {
            deletedAuthor = author;
            return false;
          }
        });

        await setState(state);

        return {
          data: deletedAuthor,
        };
      });
    },
    getAll: async () => {
      return await request(async () => {
        const state = await getState();

        return state.authors;
      });
    },
    getById: async (id) => {
      return await request(async () => {
        const state = await getState();

        return state.authors.filter((author) => {
          return author.id === id;
        })[0];
      });
    },
    update: async (data) => {
      return await request(async () => {
        const state = await getState();
        let updatedAuthor;

        state.authors = state.authors.map((author) => {
          if (author.id === data.id) {
            updatedAuthor = {
              ...author,
              ...data,
              updated: getNowUTC(),
            };
            return updatedAuthor;
          }

          return author;
        });

        await setState(state);

        return {
          data: updatedAuthor,
        };
      });
    },
  },
  books: {
    create: async (data) => {
      return await request(async () => {
        const date = getNowUTC();

        const nextBook = {
          authorIds: data?.authors.map(({ id }) => id),
          bookNumber: data?.bookNumber,
          created: date,
          id: uuidv4(),
          seriesId: data?.series?.id,
          title: data.title,
          updated: date,
        };

        const state = await getState();

        state.books.push(nextBook);

        await setState(state);

        return nextBook;
      });
    },
    delete: async (id) => {
      return await request(async () => {
        const state = await getState();
        let deletedBook;

        state.books = state.books.filter((book) => {
          if (book.id !== id) {
            return true;
          } else {
            deletedBook = book;
            return false;
          }
        });

        await setState(state);

        return deletedBook;
      });
    },
    getAll: async () => {
      return await request(async () => {
        const state = await getState();

        return state.books;
      });
    },
    getById: async (id) => {
      return await request(async () => {
        const state = await getState();

        return state.books.filter((book) => {
          return book.id === id;
        })[0];
      });
    },
    update: async (data) => {
      return await request(async () => {
        const state = await getState();
        let updatedBook;

        state.books = state.books.map((book) => {
          if (book.id === data.id) {
            updatedBook = {
              ...book,
              ...data,
              updated: getNowUTC(),
            };
            return updatedBook;
          }

          return book;
        });

        await setState(state);

        return {
          data: updatedBook,
        };
      });
    },
  },
  series: {
    create: async (data) => {
      return await request(async () => {
        const date = getNowUTC();

        const nextSeries = {
          ...data,
          created: date,
          id: uuidv4(),
          updated: date,
        };

        const state = await getState();

        state.series.push(nextSeries);

        await setState(state);

        return nextSeries;
      });
    },
    delete: async (id) => {
      return await request(async () => {
        const state = await getState();
        let deletedSeries;

        state.series = state.series.filter((series) => {
          if (series.id !== id) {
            return true;
          } else {
            deletedSeries = series;
            return false;
          }
        });

        await setState(state);

        return {
          data: deletedSeries,
        };
      });
    },
    getAll: async () => {
      return await request(async () => {
        const state = await getState();

        return state.series;
      });
    },
    getById: async (id) => {
      return await request(async () => {
        const state = await getState();

        return state.series.filter((series) => {
          return series.id === id;
        })[0];
      });
    },
    update: async (data) => {
      return await request(async () => {
        const state = await getState();
        let updatedSeries;

        state.series = state.series.map((series) => {
          if (series.id === data.id) {
            updatedSeries = {
              ...series,
              ...data,
              updated: getNowUTC(),
            };
            return updatedSeries;
          }

          return series;
        });

        await setState(state);

        return {
          data: updatedSeries,
        };
      });
    },
  },
  users: {
    async getUser() {
      return await request(async () => {
        const state = await getState();

        return {
          data: state.user,
        };
      });
    },
    async signIn({ email, password }) {
      return await request(async () => {
        const state = await getState();

        if (email === 'demo@user.com' && password === 'password') {
          state.user = {
            email: 'demo@user.com',
            id: '1',
            name: 'Demo User',
          };
          await setState(state);

          return {
            data: state.user,
          };
        } else {
          return {
            error: 'Sign in failed.',
          };
        }
      });
    },
    async signOut() {
      return await request(async () => {
        const state = await getState();

        state.user = undefined;
        await setState(state);
      });
    },
  },
};

export default api;
