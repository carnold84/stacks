import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'stacks_app';

const demoData = {
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
  series: {
    allIds: ['series-1', 'series-2', 'series-3'],
    byId: {
      'series-1': {
        id: 'series-1',
        title: 'The Expanse',
      },
      'series-2': {
        id: 'series-2',
        title: 'Commonwealth Saga',
      },
      'series-3': {
        id: 'series-3',
        title: 'Villains',
      },
    },
  },
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
  books: {
    create: async (data) => {
      return await request(async () => {
        const date = getNowUTC();
        console.log(date);

        const nextBook = {
          authorIds: data?.authors.map(({ id }) => id),
          created: date,
          id: uuidv4(),
          seriesId: data?.series.id,
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

        return {
          data: deletedBook,
        };
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
        let updatedTask;

        state.books = state.books.map((book) => {
          if (book.id === data.id) {
            updatedTask = {
              ...book,
              ...data,
              updated: getNowUTC(),
            };
            return updatedTask;
          }

          return book;
        });

        await setState(state);

        return {
          data: updatedTask,
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
