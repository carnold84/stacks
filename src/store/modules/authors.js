//import api from '@/api';

export default {
  namespaced: true,
  state: {
    authors: {
      allIds: [],
      byId: {},
    },
  },
  getters: {
    getAll(state) {
      return state.authors.allIds.map((id) => {
        return state.authors.byId[id];
      });
    },
    getById: (state) => (id) => {
      return state.authors.byId[id];
    },
  },
  actions: {
    create({ commit }, author) {
      commit('add', author);
    },
  },
  mutations: {
    add(state, author) {
      if (!state.authors.allIds.includes(author.id)) {
        state.authors.allIds.push(author.id);
        state.authors.byId[author.id] = author;
      }
    },
  },
};
